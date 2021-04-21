import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { Icon, ListItem, Input, Header, Text, Divider } from 'react-native-elements';
import { APP_DOMAIN } from '../../util/Constants';
import base64 from 'react-native-base64';
 
export default class VoiceRec extends React.Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
  };
  
  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    let str=''

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      //const chunk = Buffer.from(data, 'base64');
      // const chunk = Buffer.from(data).toString('base64');
    
      str +=   base64.encode(data);
      // console.log('chunk size',  chunk);
      // console.log('chunk size',  base64.encode(data), str);
      this.setState({audioData:str})
      // do something with audio chunk
    });
  }
   toBase64 = file => new Promise((resolve, reject) => {
     console.log("FIKE.",file)
     
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    console.log("FIKE",file)
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
  handleSubmit = async() =>{
    // let file= new File([""], this.state.audioFile)
    // console.log("NNNN0",file)
    alert('SUBMITTT'); 
    // let data = await this.toBase64(file)
    console.log("DATA", this.state.audioData)
    fetch(APP_DOMAIN + "voicerecord", {
        method: "POST",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
            voicenote: this.state.audioData
        })
    })
        .then(res => {
            console.log(res);
        }).catch(err => {
            alert(JSON.stringify(err));
            console.log('Error -', err, err.message);
        });
    }

   
  checkPermission = async () => {
   const p = await Permissions.check('microphone');
   console.log('permission check', p);
   if (p === 'authorized') return;
   return this.requestPermission();
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
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
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
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
        <Icon name='mic-circle-outline' style={styles.icon} type='ionicon' title="Record" size={50} color="#ffffff"  onPress={this.start} title="Record" disabled={recording}/>
          {/* <Button onPress={this.start} title="Record" disabled={recording} /> */}
          {/* <Button onPress={this.stop} title="Stop" disabled={!recording} /> */}
          <Icon name='stop-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2"   onPress={this.stop} title="Stop" disabled={!recording}/>
          {paused ? (
            // <Button onPress={this.play} title="Play" disabled={!audioFile} />
            <Icon name='play-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2"   onPress={this.play} title="Play" disabled={!audioFile}/>
          ) : (
            // <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
            <Icon name='pause-circle-outline' style={styles.icon} type='ionicon' title="Stop" size={50} color="#4E4AE2"   onPress={this.pause} title="Pause" disabled={!audioFile}/>
          )}
        </View>
        <Button onPress={this.handleSubmit} title="Submit"/>
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
      
      },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

// import React from 'react';
// import {
//     View,
//     Button,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity
// } from 'react-native';
// import { Icon, ListItem, Input, Header, Text, Divider } from 'react-native-elements';
// import AudioRecorderPlayer, { 
//   AVEncoderAudioQualityIOSType,
//  AVEncodingOption, 
//  AudioEncoderAndroidType,
//  AudioSet,
//  AudioSourceAndroidType, 
//  } from 'react-native-audio-recorder-player';
//  import AudioRecord from 'react-native-audio-record';

// export default class VoiceRec extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoggingIn: false,
  //     recordSecs: 0,
  //     recordTime: '00:00:00',
  //     currentPositionSec: 0,
  //     currentDurationSec: 0,
  //     playTime: '00:00:00',
  //     duration: '00:00:00',
  //   };
  //   this.audioRecorderPlayer = new AudioRecorderPlayer();
  //   this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  // }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //           {/* <Header>]Vocal</Header> */}
    //           <Text style={styles.Red}>{this.state.recordTime}</Text>
    //           <TouchableOpacity>
    //              <Icon name='mic-circle-outline' mode="contained" style={styles.icon} type='ionicon' size={50} color="#ffffff"  onPress={() => this.onStartRecord()}/>
    //              </TouchableOpacity>
    //              <TouchableOpacity>
    //              <Icon name='stop-circle-outline' mode="outlined" style={styles.icon} type='ionicon'size={50} color="#ffffff"  onPress={() => this.onStopRecord()}/>
    //              </TouchableOpacity>
    //              <Divider />
    //             <Text  style={styles.Red}>{this.state.playTime} / {this.state.duration}</Text>
    //             <TouchableOpacity>
    //              <Icon name='play-circle-outline' mode="contained" style={styles.icon} type='ionicon' size={50} color="#ffffff" onPress={() => this.onStartPlay()}/>
                 
    //              </TouchableOpacity>
    //              <TouchableOpacity>
    //              <Icon name='pause-circle-outline' mode="contained" style={styles.icon} type='ionicon' size={50} color="#ffffff" onPress={() => this.onPausePlay()}/>
    //              </TouchableOpacity>
    //         </View>
    //     )
        
    // }

//     onStartRecord = async () => {
    
//       const path = 'Audio/Music/sound.mp4';
//       const audioSet = {
//         AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//         AudioSourceAndroid: AudioSourceAndroidType.MIC,
//          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//       };
//       console.log('audioSet', audioSet);
//       const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
//       console.log(`urifff: ${uri}`);
    
//       this.audioRecorderPlayer.addRecordBackListener((e) => {
//         this.setState({
//           recordSecs: e.current_position,
//           recordTime: this.audioRecorderPlayer.mmssss(
//             Math.floor(e.current_position),
//           ),
//         });
//       }).catch(error =>{
//       console.log(error);
//       })
//       console.log(`uri: ${uri}`);
//     };

//     onStopRecord = async () => {
//       const result = await this.audioRecorderPlayer.stopRecorder();
//       this.audioRecorderPlayer.removeRecordBackListener();
//       this.setState({
//         recordSecs: 0,
//       });
//       console.log("Result" + result);
//     };

//     onStartPlay = async (e) => {
//       console.log('onStartPlay');
//       const path = 'Audio/Music/sound.mp4'
//       const msg = await this.audioRecorderPlayer.startPlayer(path);
//       this.audioRecorderPlayer.setVolume(1.0);
//       console.log(msg);
//       this.audioRecorderPlayer.addPlayBackListener((e) => {
//         if (e.current_position === e.duration) {
//           console.log('finished');
//           this.audioRecorderPlayer.stopPlayer();
//         }
//         this.setState({
//           currentPositionSec: e.current_position,
//           currentDurationSec: e.duration,
//           playTime: this.audioRecorderPlayer.mmssss(
//             Math.floor(e.current_position),
//           ),
//           duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//         });
//       });
//     };

//     onPausePlay = async (e) => { 
//       await this.audioRecorderPlayer.pausePlayer();
//    };

//    onStopPlay = async (e) => {
//     console.log('onStopPlay');
//     this.audioRecorderPlayer.stopPlayer();
//     this.audioRecorderPlayer.removePlayBackListener();
//   };


// const styles = StyleSheet.create({
//     input: {
//         width: 350,
//         height: 55,
//         color: '#ffffff',
//         margin: 10,
//         padding: 8,
//         color: 'white',
//         borderRadius: 14,
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     Red: {
    
//       // Define your HEX color code here.
//       color: '#F44336',
//       fontSize: 20,
      
//     },
//     icon: {
//       width: 350,
//       height: 80,
//       color: '#ffffff',
//       margin: 10,
//       padding: 8,
//       color: 'white',
//       borderRadius: 14,
//       fontSize: 58,
//       fontWeight: '500',
     
      
//   },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#00004d',
//     }
// })

