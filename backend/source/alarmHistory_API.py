from flask import Blueprint, jsonify
from collections import defaultdict
import sqlite3
from datetime import datetime
import json
import re

# Blueprint 객체 생성
alarm_history_api = Blueprint('alarm_history_api', __name__)

# 데이터베이스 연결 함수
def connect_to_db():
    conn = sqlite3.connect('../../grafana/data/grafana.db')
    conn.row_factory = sqlite3.Row
    return conn

# 데이터 조회 함수
def alarm_history_query_data():
    conn = connect_to_db()
    cur = conn.cursor()
    query = "SELECT * FROM alarm_history;"
    cur.execute(query)
    rows = cur.fetchall()
    data = []
    for row in rows:
        data.append(dict(row))
    conn.close()
    return data

# 데이터 처리 함수
def process_data(data):
    alarm_history_response = defaultdict(list)

    for da in data:
        temp_dic={}
        created_timestamp = datetime.fromtimestamp(da['alert_time']/1000)
        # 날짜 값
        year = str(created_timestamp.year)
        month = str(created_timestamp.month).zfill(2)
        day = str(created_timestamp.day).zfill(2)
        date = f"{year}.{month}.{day}"

        # time 처리
        hours = str(created_timestamp.hour).zfill(2)
        minutes = str(created_timestamp.minute).zfill(2)
        seconds = str(created_timestamp.second).zfill(2)
        time = f"{hours}:{minutes}:{seconds}"
        
        # 알람 룰 명
        alarmTitle = da['rule_title']

        # 알람 메시지
        rule_data_json = json.loads(da['rule_data'])
        pattern = re.compile(r'^[^{]*')
        metricMatch = pattern.match(rule_data_json[0]["model"]["expr"])
        metricText = metricMatch[0] if metricMatch else ''
        referenceValue = rule_data_json[2]["model"]["conditions"][0]["evaluator"]["params"][0]
        conditionType = rule_data_json[2]["model"]["conditions"][0]["evaluator"]["type"]
        conditionText = '규칙이 잘못됨'
        if conditionType == 'lt':
            conditionText = '낮'
        else:
            conditionText = '높'
        alertHistoryMessage = f"Metric {metricText}이 기준값 {referenceValue}보다 {conditionText}습니다."

        # response 값
        temp_dic['Date']=date
        temp_dic['Time']=time
        temp_dic['Message']=alertHistoryMessage
        temp_dic['AlarmTitle']=alarmTitle
        alarm_history_response[date].append(temp_dic)

    return alarm_history_response


# 데이터 엔드포인트
@alarm_history_api.route('/alarmhistory', methods=['GET'])
def get_data():
    data = alarm_history_query_data()
    alarm_history_response = process_data(data)
    return jsonify(alarm_history_response)