import React, { Component } from 'react'
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Profile extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                John Doe
              </Title>
              <Caption style={styles.caption}>@j_doe</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              Kolkata, India
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              +91-900000009
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              john_doe@email.com
            </Text>
          </View>
        </View>

      

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    marginHorizontal: 50
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
})
