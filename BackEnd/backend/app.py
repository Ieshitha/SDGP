from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,Integer,String,Float
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager,jwt_required,create_access_token
import pickle
import speech_recognition as sr
import os
import base64


app = Flask(_name_)


basedir = os.path.abspath(os.path.dirname(_file_))
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
    # print(encodedVoice)
    wav_file = open("voice.wav", "wb")
    decord_file = base64.b64decode(encodedVoice)
    wav_file.write(decord_file)

    train_audio_path = "voice.wav"
    x=[]


    def recognize_multiple(file):
        r = sr.Recognizer()
        with sr.WavFile(file) as source:  # use "test.wav" as the audio source
            audio = r.record(source)  # extract audio data from the file
            print("In Recognize_multiple method")


        try:
            print("Transcription: " + r.recognize_google(audio))  # recognize speech using Google Speech Recognition
            sentence = r.recognize_google(audio)
            tokens = list(sentence.lower().split())
            print(len(tokens))

            vocab, index = {}, 1
            vocab['<pad>'] = 0  # add a padding token
            for token in tokens:
                if token not in vocab:
                    vocab[token] = index
                    index += 1
            vocab_size = len(vocab)
            print(vocab)

            inverse_vocab = {index: token for token, index in vocab.items()}
            print(inverse_vocab)

            example_sequence = [vocab[word] for word in tokens]
            print(example_sequence)

            x.append(example_sequence)
            X = [i + [0] * (240 - len(i)) for i in x]
            return X
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:  # speech is unintelligible
            print("Could not request results from Google Speech Recognition service; {0}".format(e))

    file=train_audio_path
    (filepath, ext) = os.path.splitext(file)  # get the file extension
    file_name = os.path.basename(file)  # get the basename for writing to output file
    print(file_name)  # only interested if extension is '.wav'
    X = recognize_multiple(file)

    with open('text_classifier.pickle', 'rb') as training_model:
        clf = pickle.load(training_model)
        result= clf.predict(X)
        print(result)
    return jsonify(message=result[0])



#database models
class User(db.Model):
    tablename ='Users'
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


if _name_ == '_main_':
    app.run(host='0.0.0.0', port=8080)