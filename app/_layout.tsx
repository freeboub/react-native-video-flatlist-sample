import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';
import { FlatList, View, ViewToken } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface RenderItemType {
  index: number,
  item: string,
}
interface OnItemViewableItemsChangedType {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

const ITEM_HEIGHT = 80 * 3
const ITEM_WIDTH = 48 * 3
const SEPARATOR_WIDTH = 10

const separatorStyle = {height: SEPARATOR_WIDTH, width: SEPARATOR_WIDTH}
const flatListStyle = {paddingTop:100, backgroundColor: 'black', height: ITEM_HEIGHT}

const data = [
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
  'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8',
  'https://live.forstreet.cl/live/livestream.m3u8',
]

const videoStyle = {
  height: ITEM_WIDTH,
  width: ITEM_HEIGHT,
}


export default function RootLayout() {
  const [visibleItems, setVisibleItems] = useState({min: 0, max: 1})
  
  useEffect(() => {
      SplashScreen.hideAsync();
  }, []);

  const renderItem = ({
    item,
    index,
  }: RenderItemType) => {
    // console.log('refresh', index)
    const visible = index >= visibleItems.min && index <= visibleItems.max
    const isPaused = index !== visibleItems.min
    return  <View style={videoStyle}>
      <Video source={visible ? {uri: item}: undefined}
                    style={videoStyle}
                    disableFocus={true} // disable audio focus management
                    paused={isPaused}
                    useTextureView={false}
                    controls={!isPaused}
                    poster={'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'}
                    />
                    </View>
  };

  const onItemViewableItemsChanged = ({
    //changed,
    viewableItems,
  }: OnItemViewableItemsChangedType) => {
    // console.log('changed ', changed, 'viewableItems', viewableItems)
    const minMax = viewableItems.reduce((acc, item) => {
      console.log('acc min', item)
      if (item) {
        if (item.index != null && item.index < acc.min) {
          acc.min = item.index
        }
        if (item.index != null && item.index > acc.max) {
          acc.max = item.index
        }
      }
      return acc
    }, {min: 100000, max: 0})

    // console.log('minMax', minMax)
    if (minMax.min !== 100000) {
      setVisibleItems(minMax)
    }
  }

  const getItemLayout = (_data: any, index: number) => ({length: ITEM_HEIGHT, offset: (ITEM_HEIGHT) * index, index})
  

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 1,
    minimumViewTime: 100,
  }

  const itemSeparator = () => <View style={separatorStyle}/>

  return (
    <FlatList
        renderItem={renderItem}  
        keyExtractor={(_item, index) => index.toString()}
        data={data}
        horizontal={true}
        ItemSeparatorComponent={itemSeparator}
        style={flatListStyle}
        onViewableItemsChanged={onItemViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={3}
        windowSize={5}
        getItemLayout={getItemLayout}
        />
  );
}
