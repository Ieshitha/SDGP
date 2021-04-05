import librosa
import speech_recognition as sr
import os
import numpy as np
from sklearn.model_selection import cross_val_score
from sklearn.datasets import make_blobs
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.tree import DecisionTreeClassifier
# import tensorflow as tf

train_audio_path = "C:/Users/Hashara/Downloads/sdgp_w"


def get_file_paths(dirname):
    file_paths = []
    for root, directories, files in os.walk(dirname):
        for filename in files:
            filepath = os.path.join(root, filename)
            file_paths.append(filepath)
            print("loading files")
    return file_paths


x=[]
a=['PR','PR','PR','PR','PR','PR','PR','PR','PR','PR','PR','PR',
    'WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR','WR']
y=[]

def recognize_multiple(file,indexX):
    r = sr.Recognizer()
    with sr.WavFile(file) as source:  # use "test.wav" as the audio source
        audio = r.record(source)  # extract audio data from the file
        print("In Recognize_multiple method")

        # r = sr.Recognizer()
        # with sr.Microphone() as source:
        #     print("Say something!")
        #     audio = r.listen(source)
    try:
        print("lol")
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
        X=[i+[0]*(333-len(i)) for i in x]
        print([len(i) for i in X])
        # print(a[indexX])
        # print(a[1])
        y.append(a[indexX])
        print(x)
        print(indexX)
        print (len(x))
        print (len(y))

        # print(y[indexX])
        print(y)

        return(x)
    
        
        
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:  # speech is unintelligible
        print("Could not request results from Google Speech Recognition service; {0}".format(e))

    


def main():
    print("njfeiw")
    files = get_file_paths(train_audio_path)
    indexX=0
    for file in files:  # execute for each file
        (filepath, ext) = os.path.splitext(file)  # get the file extension
        file_name = os.path.basename(file)  # get the basename for writing to output file
        print(file_name)  # only interested if extension is '.wav'
        recognize_multiple(file,indexX)
        indexX += 1
          
    



if __name__ == '__main__':
    main()

    


    clf = DecisionTreeClassifier(max_depth=None, min_samples_split=2,
        random_state=0)
    scores = cross_val_score(clf, x, y, cv=5)
    sc=scores.mean()
    print(sc)


    clf = RandomForestClassifier(n_estimators=10, max_depth=None,
        min_samples_split=2, random_state=0)
    scores = cross_val_score(clf, x, y, cv=5)
    sc=scores.mean()
    print(sc)


    clf = ExtraTreesClassifier(n_estimators=10, max_depth=None,
        min_samples_split=2, random_state=0)
    scores = cross_val_score(clf, x, y, cv=5)
    sc=scores.mean()
    print(sc)
    # scores.mean() > 0.999