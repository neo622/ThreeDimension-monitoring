from flask import Blueprint, request, jsonify
import sqlite3
import json
from collections import defaultdict

alarm_api = Blueprint('alarm_api', __name__)

def connect_to_db():
    conn = sqlite3.connect('../../grafana/data/grafana.db')
    conn.row_factory = sqlite3.Row
    return conn

# 알람 대시보드 uid 넣기
@alarm_api.route('/alarm/<alertRuleId>/dashboardId', methods=['PUT'])
def put_alarm_rule_dashboard_uid(alertRuleId):
    dashboardId = request.json.get('selectDashboardUId')
    conn = connect_to_db()
    cursor = conn.cursor()
    print(dashboardId)
    try:
        cursor.execute('UPDATE alert_rule SET dashboard_uid = ? WHERE id = ?', (dashboardId, alertRuleId))
        conn.commit()
        return 'success', 200
    except Exception as e:
        conn.rollback()
        error_message = f"Failed to update alarm rule dashboard UID: {str(e)}"
        return jsonify({"error": error_message}), 500
    finally:
        cursor.close()
        conn.close()
    
# 알람 룰 상태 조회
@alarm_api.route('/alarm/status', methods=['GET'])
def read_alarm_data():
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * from alert_rule')
    alarmRules = cursor.fetchall()
    conn.close()

    dashboard_status_map = defaultdict(lambda: False)

    for rule in alarmRules:
        dashboard_uid = rule['dashboard_uid']
        status = rule['current_status']
        if status == 'Alerting':
            dashboard_status_map[dashboard_uid] = True
    return jsonify(dashboard_status_map)
