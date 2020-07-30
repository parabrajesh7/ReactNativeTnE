import React, { Component } from 'react';

import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
//import { Icon } from 'react-native-elements'
import { sizes, colors } from '../utils/theme';

export default class DrawerListItem extends Component {

  render() {
    const { active } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{
            width: 5,
            height: '100%',
            backgroundColor: active ? colors.pri : colors.white
          }} />
        <View
          {...this.props}
          style={[style.item, active ? style.itemActive : {}]}>
          
          <Icon
            name={this.props.item.icon}
            size={sizes.fontLg + 5}
            color={active ? colors.pri : colors.inactive_item}
            style={[style.icon, active ? style.active : {}]}
          />
          <Text style={[style.label, active ? style.active : style.inActiveText]}>
            {this.props.item.label}
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: sizes.spaceTiny,
    alignItems: 'center',
    paddingStart: 10
  },
  itemActive: {
    backgroundColor: colors.light_blue,
  },
  label: {
    fontFamily: 'Nunito-Regular',
    fontSize: sizes.font_16,
    flex: 1,
    padding: sizes.spaceSm,
    paddingVertical: sizes.spaceSm + 4,
  },
  icon: {
    padding: sizes.spaceSm,
  },
  active: {
    color: colors.pri,
  },
  inActiveText: {
    color: colors.inactive_item,
  },
});