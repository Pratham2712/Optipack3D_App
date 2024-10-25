import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';
// import html from '../three_render.html';
import {WebView} from 'react-native-webview';
// import {readFileSync} from 'fs';
import RNFS from 'react-native-fs';
const VisualizeScreen = () => {
  const htmlfile = require('../assests/three_render.html');
  console.log(htmlfile, 'html');

  const {width} = useWindowDimensions();
  // const [htmlContent, setHtmlContent] = useState(`<div class="button-container">
  //     <button id="resetButton" class="view-button">Reset View</button>
  //     <button id="topViewButton" class="view-button">Top View</button>
  //     <button id="bottomViewButton" class="view-button">Bottom View</button>
  //     <button id="sideViewButton" class="view-button">Side View</button>
  //     <button id="animate" class="animate view-button">
  //       <i class="fa-solid fa-meteor fa-shake"></i> Animate
  //       <i class="fa-solid fa-meteor fa-shake"></i>
  //     </button>
  //     <div class="speeds" id="speeds">
  //       <button data-speed="1000">0.25x</button>
  //       <button data-speed="500">0.5x</button>
  //       <button data-speed="20" style="background-color: #9d4edd; color: white">
  //         1x
  //       </button>
  //       <button data-speed="10">2x</button>
  //       <button data-speed="5">3x</button>
  //     </div>
  //     <div id="gltf-container"></div>
  //   </div>`);
  // const htmlContent = readFileSync('../three_render.html', 'utf8');

  // useEffect(() => {
  //   const loadHTMLFile = async () => {
  //     try {
  //       const path = '../src/three_render.html';
  //       console.log(path, 'path');
  //       console.log(RNFS.MainBundlePath, 'rnfs');
  //       console.log(RNFS.DownloadDirectoryPath, 'rnfs');
  //       console.log(RNFS.ExternalDirectoryPath, 'rnfs');
  //       console.log(RNFS.TemporaryDirectoryPath, 'rnfs');

  //       const fileContent = await RNFS.readFile(path, 'utf8');
  //       setHtmlContent(fileContent);
  //     } catch (error) {
  //       console.error('Failed to load HTML file:', error);
  //     }
  //   };

  //   loadHTMLFile();
  // }, []);
  return (
    <View style={{flex: 1}}>
      <Text>VisualizeScreen</Text>
      {/* <ScrollView>
        <RenderHTML contentWidth={width} source={{html: htmlContent}} />
      </ScrollView> */}

      <WebView
        originWhitelist={['*']}
        source={require('../assests/three_render.html')}
        style={{flex: 1}}
      />
    </View>
  );
};

export default VisualizeScreen;

const styles = StyleSheet.create({});
