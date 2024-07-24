from flask import Blueprint, request, render_template, current_app
from flask_mail import Mail,Message

sms_api = Blueprint('sms_api', __name__, template_folder='../templates')

# 루트 엔드포인트
@sms_api.route('/send/email', methods=['POST'])
def send_email():
    mail=Mail(current_app)
    alert_data = request.json
    if alert_data['status'] == 'firing':
        subject = alert_data['title']
        message = f"알람 제목은 {alert_data['title']} 발생 시간은 {alert_data['alerts'][0]['startsAt']}"
        html_content = render_template('alert_template.html', alert_data=alert_data)
        
        recipients = []
        msg = Message(subject='test mail', recipients=recipients)
        msg.html = html_content
        mail.send(msg)
        print(alert_data)
        return 'Alarm 전송 성공'
    return 'Alarm 아님'