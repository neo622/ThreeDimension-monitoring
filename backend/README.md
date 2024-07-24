<!-- 개발 환경에서 python 가상환경 켜기 -->

python3 -m venv .venv

<!-- 아래 둘 중 os 환경에 따라 다름 -->

source .venv/bin/activate
source .venv/Scripts/activate

<!-- 패키지 설치 -->

pip install -r requirements.txt

<!-- python 실행 -->

cd source
python3 views.py
