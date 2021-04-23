import librosa
import speech_recognition as sr
import os
import numpy as np
import tensorflow as tf

train_audio_path = "C:/Users/Ieshitha Wijetunge/Downloads/Audio/"


def get_file_paths(dirname):
    file_paths = []
    for root, directories, files in os.walk(dirname):
        for filename in files:
            filepath = os.path.join(root, filename)
            file_paths.append(filepath)
            print("loading files")
    return file_paths


def recognize_multiple(file):
    r = sr.Recognizer()
    with sr.WavFile(file) as source:  # use "test.wav" as the audio source
        audio = r.record(source)  # extract audio data from the file
        print("In Recognize_multiple method")

        # r = sr.Recognizer()
        # with sr.Microphone() as source:
        #     print("Say something!")
        #     audio = r.listen(source)
    try:
        #print("lol")
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

        window_size = 2
        positive_skip_grams, _ = tf.keras.preprocessing.sequence.skipgrams(
            example_sequence,
            vocabulary_size=vocab_size,
            window_size=window_size,
            negative_samples=0)
        print(len(positive_skip_grams))

        for target, context in positive_skip_grams[:5]:
            print(f"({target}, {context}): ({inverse_vocab[target]}, {inverse_vocab[context]})")
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:  # speech is unintelligible
        print("Could not request results from Google Speech Recognition service; {0}".format(e))



def main():
    print("njfeiw")
    files = get_file_paths(train_audio_path)
    for file in files:  # execute for each file
        (filepath, ext) = os.path.splitext(file)  # get the file extension
        file_name = os.path.basename(file)  # get the basename for writing to output file
        print(file_name)  # only interested if extension is '.wav'
        recognize_multiple(file)


if __name__ == '__main__':
    main()

# import speech_recognition as sr
# import os
# import numpy as np
# import tensorflow as tf
#
# from tensorflow.keras import Model, Sequential
# from tensorflow.keras.layers import Activation, Dense, Dot, Embedding, Flatten, GlobalAveragePooling1D, Reshape
# from tensorflow.keras.layers.experimental.preprocessing import TextVectorization
#
# SEED = 42
#
# r = sr.Recognizer()
# with sr.AudioFile(
#         "C:/Users/Ieshitha Wijetunge/Downloads/Audio/F_0101_14y8m_1.wav") as source:  # use "test.wav" as the audio source
#     audio = r.record(source)  # extract audio data from the file
#     print("yo")
#     try:
#         print("lol")
#         print("Transcription: " + r.recognize_google(audio))  # recognize speech using Google Speech Recognition
#     except sr.UnknownValueError:
#         print("Google Speech Recognition could not understand audio")
#     except sr.RequestError as e:  # speech is unintelligible
#         print("Could not request results from Google Speech Recognition service; {0}".format(e))
#
# sentence = r.recognize_google(audio)
# tokens = list(sentence.lower().split())
# print(len(tokens))
#
# vocab, index = {}, 1
# vocab['<pad>'] = 0  # add a padding token
# for token in tokens:
#     if token not in vocab:
#         vocab[token] = index
#         index += 1
# vocab_size = len(vocab)
# print(vocab)
#
# inverse_vocab = {index: token for token, index in vocab.items()}
# print(inverse_vocab)
#
# example_sequence = [vocab[word] for word in tokens]
# print(example_sequence)
#
# window_size = 2
# positive_skip_grams, _ = tf.keras.preprocessing.sequence.skipgrams(
#     example_sequence,
#     vocabulary_size=vocab_size,
#     window_size=window_size,
#     negative_samples=0)
# print(len(positive_skip_grams))
#
# for target, context in positive_skip_grams[:5]:
#     print(f"({target}, {context}): ({inverse_vocab[target]}, {inverse_vocab[context]})")
#
# # Get target and context words for one positive skip-gram.
# target_word, context_word = positive_skip_grams[0]
#
# # Set the number of negative samples per positive context.
# num_ns = 4
#
# context_class = tf.reshape(tf.constant(context_word, dtype="int64"), (1, 1))
# negative_sampling_candidates, _, _ = tf.random.log_uniform_candidate_sampler(
#     true_classes=context_class, # class that should be sampled as 'positive'
#     num_true=1, # each positive skip-gram has 1 positive context class
#     num_sampled=num_ns, # number of negative context words to sample
#     unique=True, # all the negative samples should be unique
#     range_max=vocab_size, # pick index of the samples from [0, vocab_size]
#     seed=SEED, # seed for reproducibility
#     name="negative_sampling" # name of this operation
# )
# print(negative_sampling_candidates)
# print([inverse_vocab[index.numpy()] for index in negative_sampling_candidates])
#
# # Add a dimension so you can use concatenation (on the next step).
# negative_sampling_candidates = tf.expand_dims(negative_sampling_candidates, 1)
#
# # Concat positive context word with negative sampled words.
# context = tf.concat([context_class, negative_sampling_candidates], 0)
# 
# # Label first context word as 1 (positive) followed by num_ns 0s (negative).
# label = tf.constant([1] + [0]*num_ns, dtype="int64")
#
# # Reshape target to shape (1,) and context and label to (num_ns+1,).
# target = tf.squeeze(target_word)
# context = tf.squeeze(context)
# label = tf.squeeze(label)
#
# print(f"target_index    : {target}")
# print(f"target_word     : {inverse_vocab[target_word]}")
# print(f"context_indices : {context}")
# print(f"context_words   : {[inverse_vocab[c.numpy()] for c in context]}")
# print(f"label           : {label}")
