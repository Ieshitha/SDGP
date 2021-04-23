/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView
} from 'react-native';
import Recorder from './src/Recorder';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Recorder/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
