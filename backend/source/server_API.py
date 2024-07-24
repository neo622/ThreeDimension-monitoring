from flask import Blueprint, request, jsonify
import sqlite3
import json

server_api = Blueprint('server_api', __name__)


def connect_to_db():
    conn = sqlite3.connect('../../grafana/data/grafana.db')
    conn.row_factory = sqlite3.Row
    return conn

@server_api.route('/racks/<rack_id>/servers', methods=['GET'])
def get_rack_server(rack_id):
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT uid FROM dashboard WHERE rack_id=?", (rack_id,))
    rows = cursor.fetchall()
    conn.close()
    
    if len(rows) != 0:
        conn_rack_server_data = [dict(row) for row in rows]
        return jsonify(conn_rack_server_data), 200
    
    return jsonify([]), 200

@server_api.route('/racks/<rack_id>/servers', methods=['POST'])
def conn_rack_server(rack_id):
    conn = connect_to_db()
    cursor = conn.cursor()       
    new_dashboard_id = request.json.get('newDashboardId')
    cursor.execute("UPDATE dashboard SET rack_id = ? WHERE id = ?", (rack_id, new_dashboard_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Rack에 Server 생성 완료'}), 200


@server_api.route('/servers/info', methods=['GET'])
def get_server_Info():
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM server_Info")
    rows = cursor.fetchall()
    conn.close()
    data = []
    for row in rows:
        dict={
            'id': row[0],
            'serverName': row[1],
            'os': row[2],
            'appApplication': row[3],
            'database': row[4],
            'assetNumber': row[5],
            'dashboardUrl':row[6],
            'rackId':row[7]
        }
        data.append(dict)
    
    return jsonify(data), 200


@server_api.route('/servers/names', methods=['GET'])
def get_server_names():
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT server_name FROM server_Info")
    rows = cursor.fetchall()
    conn.close()
    data = []
    for row in rows:
        data.append(dict(row))
    
    return jsonify(data), 200