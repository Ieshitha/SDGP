from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,Integer,String,Float
import os
import base64
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager,jwt_required,create_access_token
import pickle
#import librosa
#import speech_recognition as sr
import os
#import numpy as np
#import sklearn
#import sklearn.tree.tree
from joblib import load
app = Flask(__name__)
# with open('text_classifier.pickle', 'rb') as training_model:
#     clf = pickle.load(training_model)
#     print(clf.predict([[1]*240]))
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' +os.path.join(basedir,'users.db')
app.config['JWT_SECRET_KEY']='super-secret'


db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)


@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database Created')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database dropped')


@app.cli.command('db_seed')
def db_seed():
    uthpala = User(f_name='uthpala',
                   l_name='bandara',
                   email='lekam@gmail.com',
                   password='uthpala@123')


    chamodya = User(f_name='chamodya',
                   l_name='lekam',
                   email='bandara@gmail.com',
                   password='chamodya@123')

    db.session.add(uthpala)
    db.session.add(chamodya)
    db.session.commit()
    print('Database seeded')


#user Register API
@app.route('/register',methods=['POST'])
def register():
    email = request.json['email']
    test = User.query.filter_by(email=email).first()
    if test:
        return jsonify(message='email already exists')
    else:
        f_name=request.json['f_name']
        l_name=request.json['f_name']
        password=request.json['password']
        user=User(f_name=f_name,l_name=l_name,email=email,password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User Created successfully")


#User Loging API
@app.route('/login',methods=['POST'])
def login():
    if request.is_json:
        email = request.json['email']
        password = request.json['password']
    else:
        email = request.form['email']
        password = request.form['password']

    test = User.query.filter_by(email=email,password=password).first()
    if test:
        access_token = create_access_token(identity=email)
        print(access_token)
        return jsonify(message="login succeeded", access_token=access_token)
        print("login succeeded")
    else:
        return jsonify(message="enter Again"),401

#Voice Record API
@app.route('/voicerecord',methods=['POST'])
def voicerecord():
    encodedVoice = request.json['voicenote']
    #decodedVoice = base64.b64decode(encodedVoice)
    #result = open('voice.wav','wb')
    wav_file = open("temp5.wav", "wb")
    decord_file = base64.b64decode(encodedVoice)
    wav_file.write(decord_file)
    token = [[1, 2, 3, 4, 2, 3, 5, 6, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 3, 12, 28, 29, 30, 31, 3, 32, 33, 34, 35, 35, 36, 2, 3, 11, 37, 38, 37, 37, 39, 40, 41, 41, 42, 43, 37, 44, 45, 33, 46, 3, 47, 43, 37, 48, 2, 49, 50, 37, 44, 51, 52, 53, 53, 54, 55, 37, 56, 57, 37, 57, 58, 59, 60, 61, 62, 63, 3, 11, 64, 65, 66, 60, 60, 13, 31, 67, 68, 69, 37, 70, 71, 72, 31, 73, 74, 2, 75, 72, 31, 76, 77, 43, 77, 3, 78, 79, 33, 80, 33, 81, 82, 12, 12, 12, 83, 84, 85, 86, 87, 43, 88, 28, 60, 89, 90, 91, 3, 92, 3, 93, 2, 3, 94, 95, 61, 96, 37, 97, 31, 67, 98, 3, 99, 2, 3, 100, 2, 3, 101, 88, 28, 102, 89, 35, 103, 104, 105, 43, 106, 107, 108, 2, 109, 110, 37, 111, 112, 107, 113, 114, 114, 115, 116, 107, 117, 118, 107, 119, 33, 3, 120, 121, 107, 122, 43, 107, 123, 124, 37, 56, 125, 126, 33, 3, 127, 43, 128, 2, 129, 112, 130, 131, 132, 3, 133, 3, 134, 2, 3, 135, 12, 136, 3, 137, 130, 138, 71, 139, 140, 3, 110, 140, 3, 141, 2, 3, 142]]
    with open('text_classifier.pickle', 'rb') as training_model:
        clf = pickle.load(training_model)
        result= clf.predict(token)
        print(result)
    return jsonify(message="result")



#Profile API
@app.route('/profile',methods=['GET'])


#Result API
@app.route('/result')


#database models
class User(db.Model):
    _tablename_ ='Users'
    id = Column(Integer,primary_key=True)
    f_name = Column(String)
    l_name =Column(String)
    email = Column(String,unique=True)
    password = Column(String)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','f_name','l_name','email','password')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


if __name__ == '__main__':
    app.run()
