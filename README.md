# SNU MOYEO : ȥ�� �ϸ� ����, �Բ� �ϸ� ����

## Git clone
```
mkdir project
git clone https://github.com/hjcdg1/swpp_cjlk.git .
```

## Backend (Window)
```
# setup virtual environment
cd back
python -m venv env
env\Script\activate

# setup python package libraries
python -m pip install --upgrade pip
python -m pip install --upgrade pip
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install coolsms_python_sdk
pip install Pillow
pip install openpyxl

# setup database
python manage.py makemigrations snu_moyeo
python manage.py migrate

# run backend server
python manage.py runserver
```

## Frontend (Window)
```
# setup javascript package libraries
cd front
npm install (Automatic ����, Yes ����, semantic/ ����)

# run frontend server
npm start
```