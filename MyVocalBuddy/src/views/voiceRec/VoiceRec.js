import React, { Component } from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { Icon, ListItem, Input, Header, Text, Image } from 'react-native-elements';
import { APP_DOMAIN, PR, WR } from '../../util/Constants';
import base64 from 'react-native-base64';
import { readFile } from "react-native-fs";

export default class VoiceRec extends React.Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
    loading: false
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    let str = ''

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      // const chunk = Buffer.from(data).toString('base64');

      // str +=   base64.encode(data);
      // console.log('chunk size',  chunk);
      // console.log('chunk size',  base64.encode(data), str);

      // do something with audio chunk
    });
  }

  getUriToBase64 = async (uri) => {
    const base64String = await readFile(uri, "base64");
    this.setState({ data: base64String })
    return base64String
  }
  handleSubmit = async () => {
    // console.log("sfdfsdf", this.state.data)

    // let file= new File([""], this.state.audioFile)
    // console.log("NNNN0",file)
    alert('Are you sure you want to submit');
    this.setState({ loading: true })
console.log("dsfd",this.state.data)
    fetch(APP_DOMAIN + "voicerecord", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voicenote: this.state.data
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ stutterType: data.message, loading: false })
      })
      .catch(err => {
        alert("Error: Unable to generate the stutter type");
        this.setState({ loading: false, stutterType: "Error: Unable to generate the stutter type" })
        console.log('Error -', err, err.message);
      });
  }


  checkPermission = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
    
    // const p = await Permissions.check('microphone');
    // console.log('permission check', p);
    // if (p === 'authorized') return;
    // return this.requestPermission();
  }


  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', typeof audioFile, audioFile);
    this.getUriToBase64(audioFile)
    this.setState({ audioFile, recording: false });
    this.setState({ audioData: new Sound(audioFile) })
    // toBase64(audioFile))
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        console.log(typeof this.sound, this.sound)
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile, stutterType } = this.state;
    console.log("this.state.stutterType", this.props)
    return (
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator size="large" color="#5FE3DB" />}
        <View style={styles.row}>

          <Icon name='mic-circle-outline' style={styles.icon} type='ionicon' title="Record" size={50} color="#ffffff" onPress={this.start} title="Record" disabled={recording} />
          {/* <Button onPress={this.start} title="Record" disabled={recording} /> */}
          {/* <Button onPress={this.stop} title="Stop" disabled={!recording} /> */}
          <Icon name='stop-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2" onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (

            <Icon name='play-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2" onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (

            <Icon name='pause-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2" onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
        <Button onPress={this.handleSubmit} title="Submit" disabled={this.state.loading} />
        {stutterType && (<View><Separator />
          <Text style={[styles.title1, styles.setColorWhite, styles.setFontSize]}>
            Stutter Type : {stutterType == "WR" ? WR : stutterType == "PR" ? PR : stutterType}
          </Text><Button
            title="Continue"
            color="#396F81"
            onPress={() => this.props.navigation.navigate('Tutorials')}
          /></View>)}
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00004d',
  },
  icon: {
    width: 350,
    height: 80,
    color: ' #4E4AE2',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 58,
    fontWeight: '500',
    color: '#F44336',
    paddingRight: 0

  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  title1: {
    textAlign: 'left',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginBottom: 80,
    marginLeft: 80,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  setColorLBlue: {
    color: '#1FFBEE'
  },
  setColorWhite: {
    color: '#ffffff'
  },
  setFontSize: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    marginBottom: 80,
    marginLeft:80,
     width: 200,
    height: 200, 
    borderRadius: 100,
  },
});
const Separator = () => (
  <View style={styles.separator} />
);
