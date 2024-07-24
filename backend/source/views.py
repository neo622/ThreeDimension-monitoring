from flask import Flask
from flask_cors import CORS
from alarmHistory_API import alarm_history_api
from sms_API import sms_api
from rack_API import rack_api
from alarm_API import alarm_api
from server_API import server_api

app = Flask(__name__)
CORS(app)

# email config 적는곳

# Blueprint 등록
app.register_blueprint(alarm_history_api)
app.register_blueprint(sms_api)
app.register_blueprint(rack_api)
app.register_blueprint(alarm_api)
app.register_blueprint(server_api)

if __name__ == '__main__':
    app.run(debug=True)