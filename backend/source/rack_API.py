from flask import Blueprint, request, jsonify
import sqlite3
import json

rack_api = Blueprint('rack_api', __name__)


def connect_to_db():
    # conn = sqlite3.connect('../../grafana/data/grafana.db')
    conn = sqlite3.connect('./dbforapi.db')
    conn.row_factory = sqlite3.Row
    return conn

# 랙조회
@rack_api.route('/racks', methods=['GET'])
def read_rack_data():
    conn = connect_to_db()
    cursor = conn.cursor()
    # cursor.execute("SELECT * from rack")
    cursor.execute("SELECT r.rack_id, r.rack_type, r.position, s.server_name FROM rack r LEFT JOIN server_info s ON r.rack_id = s.rack_id ORDER BY r.rack_id;")
    racks = cursor.fetchall()
    conn.close()
    rack_list = []
    for row in racks:
        rack_dict = dict(row)
        # position 컬럼의 JSON 문자열을 파싱하여 원래의 JSON 객체로 변환
        rack_dict['position'] = json.loads(rack_dict['position'])
        rack_list.append(rack_dict)

    return jsonify(rack_list), 200

# 랙추가
@rack_api.route('/racks/create', methods=['POST'])
def create_rack_data():
    rack_data = request.json
    rack_info = rack_data.get('rackInfo')

    if rack_info:
        rack_info_json = json.dumps(rack_info)
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO rack (rack_info) VALUES (?)", (rack_info_json,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Rack 생성 완료'}), 200
    else:
        return jsonify({'error': 'rackInfo가 제공되지 않았습니다'}), 400
    
# 랙삭제
@rack_api.route('/racks/<rack_id>/delete', methods=['DELETE'])
def del_rack_data(rack_id):
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM rack WHERE id = ?", (rack_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Rack 삭제 완료'}), 200