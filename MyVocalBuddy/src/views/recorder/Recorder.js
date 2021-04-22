import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
    PermissionsAndroid,
    View,
    Text,
    Button
} from 'react-native';
import React, { Component } from 'react';

export default class Recorder extends Component {

    audioRecorderPlayer;

    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            recordSecs: 0,
            isRecoringFinished: false,
            isPlaying: false
        }
        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }

   

//     toBase64 = file => new Promise((resolve, reject) => {
//         console.log("FIKE.",file)
        
//        const reader = new FileReader(file);
//        reader.readAsDataURL(file);
//        console.log("FIKE",file)
//        reader.onload = () => resolve(reader.result);
//        reader.onerror = error => reject(error);
//    });

//     handleSubmit = async() =>{
//         // let file= new File([""], this.state.audioFile)
//         // console.log("NNNN0",file)
//         alert('SUBMITTT'); 
//         // let data = await this.toBase64(file)
//         console.log("DATA", this.state.audioRecorderPlayer)
//         fetch(APP_DOMAIN + "voicerecord", {
//             method: "POST",
//             headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//             body: JSON.stringify({
//                 voicenote: this.state.audioData
//             })
//         })
//             .then(res => {
//                 console.log(res);
//             }).catch(err => {
//                 alert(JSON.stringify(err));
//                 console.log('Error -', err, err.message);
//             });
//         }
    
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
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Permissions for write access',
                    message: 'Give permission to your storage to write a file',
                    buttonPositive: 'ok',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('permission denied');
                return;
            }
        } catch (err) {
            console.warn(err);
            return;
        }
    }

    onStartRecord = async () => {
        this.checkPermission();
        const result = await this.audioRecorderPlayer.startRecorder(Platform.select({
            android: '/storage/emulated/0/recording_1.mp3',
        }));
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            console.log("Started recording")
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                isRecording: true
            });
            return;
        });
        console.log(result);
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            isRecording: false,
            isRecoringFinished: true
        });
        console.log(result);
    };

    onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await this.audioRecorderPlayer.startPlayer();
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            this.setState({
                isPlaying: true,
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    };

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
        this.setState({
            isPlaying: false,
        });
    };

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
        this.setState({
            isPlaying: false,
        });
    };

    render() {
        return (
            <View style={{ margin: 50 }} >
                <Text style={{ marginVertical: 100, textAlign: 'center', fontSize: 25 }}>Voice Recording App</Text>
                {this.state.isRecording ?
                    <Text style={{ marginVertical: 100, textAlign: 'center', fontSize: 25 }}>{this.state.recordSecs / 1000} sec</Text>
                    : <Text style={{ marginVertical: 100, textAlign: 'center', fontSize: 25 }}>Ready</Text>}

                <View style={{ marginVertical: 5 }} >
                    <Button onPress={this.onStartRecord} title="Record" />
                </View>
                <View style={{ marginVertical: 5 }} >
                    <Button onPress={this.onStopRecord} title="Stop" />
                </View>
                {this.state.isRecoringFinished? 
                <View>
                    {this.state.isPlaying?
                    <View>
                        <Button onPress={this.onPausePlay} title="Pause" />
                        <Button onPress={this.onStopPlay} title="Stop" />
                    </View>:
                    <Button onPress={this.onStartPlay} title="Play" />
                    }
                </View> :
                <View>
                     <Button onPress={this.handleSubmit} title="Submit"/>
                </View>}
            </View>
        )
    }

}