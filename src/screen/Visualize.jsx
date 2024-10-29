// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Dimensions,
// } from 'react-native';
// import {GLView} from 'expo-gl';
// import * as THREE from 'three';
// import {Asset} from 'expo-asset';
// import {Renderer} from 'expo-three';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Tween} from '@tweenjs/tween.js';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
// import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';

// const Visualize = () => {
//   const rendererRef = useRef(null);
//   const sceneRef = useRef(null);
//   const cameraRef = useRef(null);
//   const controlsRef = useRef(null);
//   const [containerDimensions, setContainerDimensions] = useState(null);

//   const aspectWidth = 1;
//   const aspectHeight = 1;
//   const aspectDepth = 2;

//   const setupThreeJS = async gl => {
//     const {width, height} = Dimensions.get('window');

//     const renderer = new Renderer({gl, antialias: true});
//     renderer.setSize(width, height);
//     renderer.setClearColor(0xffffff);
//     rendererRef.current = renderer;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 500000);
//     cameraRef.current = camera;

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controlsRef.current = controls;

//     const rustyTexture = await loadTexture();

//     const containerInfo = await loadContainerDimensions();
//     if (containerInfo) {
//       createSceneObjects(scene, containerInfo, rustyTexture);
//       updateCameraAndControls(containerInfo);
//     }

//     animate();
//   };

//   const loadTexture = async () => {
//     const textureLoader = new THREE.TextureLoader();
//     const asset = Asset.fromModule(require('../assets/rust3.png'));
//     await asset.downloadAsync();
//     return textureLoader.load(asset.localUri);
//   };

//   const loadContainerDimensions = async () => {
//     try {
//       const containerInfo = await getStorageItem('container_inf');
//       const dimensions = {
//         containerWidth: containerInfo.containerWidth,
//         containerHeight: containerInfo.containerHeight,
//         containerDepth: containerInfo.containerLength,
//       };
//       setContainerDimensions(dimensions);
//       return dimensions;
//     } catch (error) {
//       console.error('Error loading container info:', error);
//       return null;
//     }
//   };

//   const createSceneObjects = (scene, dimensions, rustyTexture) => {
//     const {containerWidth, containerHeight, containerDepth} = dimensions;

//     const faces = [
//       {
//         normal: new THREE.Vector3(1, 0, 0),
//         position: new THREE.Vector3(containerWidth, 0, 0),
//       },
//       {
//         normal: new THREE.Vector3(-1, 0, 0),
//         position: new THREE.Vector3(-containerWidth, 0, 0),
//       },
//       {
//         normal: new THREE.Vector3(0, 1, 0),
//         position: new THREE.Vector3(0, containerHeight, 0),
//       },
//       {
//         normal: new THREE.Vector3(0, 0, 1),
//         position: new THREE.Vector3(0, 0, containerDepth),
//       },
//       {
//         normal: new THREE.Vector3(0, 0, -1),
//         position: new THREE.Vector3(0, 0, -containerDepth),
//       },
//     ];

//     const axesHelper = new THREE.AxesHelper(1000);
//     scene.add(axesHelper);

//     const containerGeometry = new THREE.BoxGeometry(
//       containerWidth,
//       containerHeight,
//       containerDepth,
//     );
//     const containerEdges = new THREE.EdgesGeometry(containerGeometry);
//     const containerMaterial = new THREE.LineBasicMaterial({
//       color: 0x000,
//       transparent: true,
//       opacity: 0.5,
//     });
//     const containerWireframe = new THREE.LineSegments(
//       containerEdges,
//       containerMaterial,
//     );
//     containerWireframe.scale.set(aspectWidth, aspectHeight, aspectDepth);
//     containerWireframe.position.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     scene.add(containerWireframe);

//     const plateGeometry = new THREE.BoxGeometry(
//       containerWidth,
//       containerDepth * aspectDepth,
//       200,
//     );
//     const plateMaterial = new THREE.MeshStandardMaterial({
//       side: THREE.DoubleSide,
//       color: 0xd3d3d3d,
//     });
//     const basePlate = new THREE.Mesh(plateGeometry, plateMaterial);
//     basePlate.rotation.x = Math.PI / 2;
//     basePlate.position.set(
//       containerWidth / 2,
//       -100,
//       (containerDepth / 2) * aspectDepth,
//     );
//     scene.add(basePlate);

//     const plateMaterialforSides = new THREE.MeshStandardMaterial({
//       map: rustyTexture,
//       side: THREE.DoubleSide,
//       metalness: 0.9,
//       opacity: 1,
//       color: 0xb87333,
//       emissive: 0x222222,
//     });

//     const plate = new THREE.BoxGeometry(
//       containerWidth,
//       containerHeight * aspectHeight,
//       100,
//     );
//     const makeBasePlate = new THREE.Mesh(plate, plateMaterialforSides);
//     makeBasePlate.position.set(containerWidth / 2, containerHeight / 2, -50);
//     scene.add(makeBasePlate);
//   };

//   const updateCameraAndControls = dimensions => {
//     const {containerWidth, containerHeight, containerDepth} = dimensions;

//     cameraRef.current.position.set(
//       4.9 * containerWidth * aspectWidth,
//       4.9 * containerHeight * aspectHeight,
//       1.2 * containerDepth * aspectDepth,
//     );

//     controlsRef.current.target.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );

//     controlsRef.current.update();
//   };

//   const animate = () => {
//     if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

//     requestAnimationFrame(animate);

//     controlsRef.current?.update();
//     rendererRef.current.render(sceneRef.current, cameraRef.current);
//   };

//   return <GLView style={{flex: 1}} onContextCreate={setupThreeJS} />;
// };

// export default Visualize;

// const styles = StyleSheet.create({});
