import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
const VisualizeScreen = ({route}) => {
  // const [jsCode, setJsCode] = useState();
  const {params} = route.params;
  const baseUrl = 'https://optipack3d.com/freeOutput';

  const queryParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    queryParams.append(key, params[key]);
  });

  queryParams.append('mobileView', true);
  console.log(queryParams);

  // const generateJs = async () => {
  //   try {
  //     const threedPaths = await AsyncStorage.getItem('threed_paths');
  //     const containerInf = await AsyncStorage.getItem('container_inf');
  //     const isLogin = await AsyncStorage.getItem('login');
  //     // Inject the data into the WebView
  //     const code = `
  //       window.threedPath = ${threedPaths};
  //       window.containerInfPath = ${containerInf};
  //       window.isLogin = ${isLogin === 'true'};
  //       ${threeJSCode}
  //     `;
  //     setJsCode(code);
  //   } catch (error) {
  //     console.error('Error generating JS:', error);
  //   }
  // };

  // useEffect(() => {
  //   generateJs();
  // }, []);

  return (
    <View style={{flex: 1}}>
      <Text>VisualizeScreen</Text>
      <WebView
        originWhitelist={['*']}
        source={{uri: `${baseUrl}?${queryParams.toString()}`}}
        style={styles.webview}
        onMessage={event => {
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
    </View>
  );
};

export default VisualizeScreen;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
  },
});

// const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
//           integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
//           crossorigin="anonymous"
//           referrerpolicy="no-referrer" />
//         <title>Getting Started with Three.js</title>
//         <style>
//           body {
//             margin: 0;
//             overflow: hidden;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             background-color: #a0a2a0;
//           }
//           /* ... rest of your CSS styles ... */
//         </style>
//         <script type="importmap">
//           {
//             "imports": {
//               "three": "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js",
//               "jsm/": "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/"
//             }
//           }
//         </script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"></script>
//       </head>
//       <body>
//         <div class="button-container">
//           <button id="resetButton" class="view-button">Reset View</button>
//           <button id="topViewButton" class="view-button">Top View</button>
//           <button id="bottomViewButton" class="view-button">Bottom View</button>
//           <button id="sideViewButton" class="view-button">Side View</button>
//           <button id="animate" class="animate view-button">
//             <i class="fa-solid fa-meteor fa-shake"></i> Animate
//             <i class="fa-solid fa-meteor fa-shake"></i>
//           </button>
//           <div class="speeds" id="speeds">
//             <button data-speed="1000">0.25x</button>
//             <button data-speed="500">0.5x</button>
//             <button data-speed="20" style="background-color: #9d4edd; color: white">1x</button>
//             <button data-speed="10">2x</button>
//             <button data-speed="5">3x</button>
//           </div>
//           <div id="gltf-container"></div>
//         </div>
//         <script type="module">
//           ${threeJSCode}
//         </script>
//       </body>
//     </html>
//   `;
// const threeJSCode = `
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
// import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';
// import {FontLoader} from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/FontLoader.js';
// import {TextGeometry} from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/geometries/TextGeometry.js';
// import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

// document.addEventListener('DOMContentLoaded', () => {
// let isAnimating = false;
// const urlParams = new URLSearchParams(window.location.search);
// const ind = parseInt(urlParams.get('container'), 0);
// const isLogin = urlParams.get('isLogin') === 'true';
// const isLogin = window.isLogin;
// const threedPath = window.threedPath;
// window.alert('insdie');
// const speedButton = document.getElementById('speeds');
// const speedButtons = speedButton.querySelectorAll('button');

// let currentSpeed = 20;
// let animationQueue = [];
// let lastAnimationTime = 0;

// async function getLocalStorageItem(key) {
//   return new Promise((resolve, reject) => {
//     try {
//       if (key === 'threed_paths') {
//         resolve(window.threedPath[ind]);
//       } else if (key === 'container_inf') {
//         resolve(window.containerInfPath[ind]);
//       } else {
//         reject(new Error('Unknown key'));
//       }
//     } catch (error) {
//       reject(new Error('Error accessing window data for key:'));
//     }
//   });
// }

// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
//   preserveDrawingBuffer: true,
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Scene setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

// // Camera setup
// const camera = new THREE.PerspectiveCamera(
//   70,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   500000,
// );
// const orbit = new OrbitControls(camera, renderer.domElement);
// const textureLoader = new THREE.TextureLoader();
// const rustyTexture = textureLoader.load('/rust3.png', function (texture) {
//   // Adjust texture wrapping and repeat as needed
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(1, 1); // Adjust these values to control how the texture is repeated
// });

// let containerWidth;
// let containerHeight;
// let containerDepth;
// function fetchContainerDimensions() {
//   return getLocalStorageItem('container_inf')
//     .then(containerInfo => {
//       containerWidth = containerInfo.containerWidth;
//       containerHeight = containerInfo.containerHeight;
//       containerDepth = containerInfo.containerLength; // Ensure this field name matches your JSON

//       console.log('Container Width (inside fetch):', containerWidth);
//       console.log('Container Height (inside fetch):', containerHeight);
//       console.log('Container Depth (inside fetch):', containerDepth);

//       // Return an object with the dimensions
//       return {containerWidth, containerHeight, containerDepth};
//     })
//     .catch(error => console.error('Error loading container info:', error));
// }
// const aspectWidth = 1; // This is the base aspect (1x)
// const aspectHeight = 1; // Height relative to width
// const aspectDepth = 2;

// fetchContainerDimensions().then(dimensions => {
//   // Your further logic here, using the dimensions
//   const faces = [
//     {
//       normal: new THREE.Vector3(1, 0, 0),
//       position: new THREE.Vector3(containerWidth, 0, 0),
//     }, // Right face
//     {
//       normal: new THREE.Vector3(-1, 0, 0),
//       position: new THREE.Vector3(-containerWidth, 0, 0),
//     }, // Left face
//     {
//       normal: new THREE.Vector3(0, 1, 0),
//       position: new THREE.Vector3(0, containerHeight, 0),
//     }, // Top face
//     {
//       normal: new THREE.Vector3(0, 0, 1),
//       position: new THREE.Vector3(0, 0, containerDepth),
//     }, // Front face
//     {
//       normal: new THREE.Vector3(0, 0, -1),
//       position: new THREE.Vector3(0, 0, -containerDepth),
//     }, // Back face
//   ];

//   orbit.target.set(
//     (containerWidth / 2) * aspectWidth,
//     (containerHeight / 2) * aspectHeight,
//     (containerDepth / 2) * aspectDepth,
//   );
//   orbit.update();

//   camera.position.set(
//     4.9 * containerWidth * aspectWidth,
//     4.9 * containerHeight * aspectHeight,
//     1.2 * containerDepth * aspectDepth,
//   );
//   orbit.update();

//   // Axes helper
//   const axesHelper = new THREE.AxesHelper(1000);
//   scene.add(axesHelper);

//   // Container wireframe
//   const containerGeometry = new THREE.BoxGeometry(
//     containerWidth,
//     containerHeight,
//     containerDepth,
//   );
//   const containerEdges = new THREE.EdgesGeometry(containerGeometry);
//   const containerMaterial = new THREE.LineBasicMaterial({
//     color: 0x000,
//     transparent: true,
//     opacity: 0.5,
//   });
//   const containerWireframe = new THREE.LineSegments(
//     containerEdges,
//     containerMaterial,
//   );

//   const plateGeometry = new THREE.BoxGeometry(
//     containerWidth,
//     containerDepth * aspectDepth,
//     200,
//   );
//   const plateMaterial = new THREE.MeshStandardMaterial({
//     // map:rustyTexture,
//     side: THREE.DoubleSide,
//     // metalness:0.9,
//     color: 0xd3d3d3d,
//   });

//   const plateMaterialforSides = new THREE.MeshStandardMaterial({
//     map: rustyTexture,
//     side: THREE.DoubleSide,
//     metalness: 0.9,
//     opacity: 1,
//     color: 0xb87333,
//     emissive: 0x222222,
//   });

//   const basePlate = new THREE.Mesh(plateGeometry, plateMaterial);

//   // Position the base plate at the bottom of the container
//   basePlate.rotation.x = Math.PI / 2; // Rotate to make it horizontal
//   basePlate.position.set(
//     containerWidth / 2,
//     -100, // Bottom of the container
//     (containerDepth / 2) * aspectDepth,
//   );

//   scene.add(basePlate);

//   // Calculate aspect ratios relative to the container width
//   // Depth relative to width

//   const plate = new THREE.BoxGeometry(
//     containerWidth,
//     containerHeight * aspectHeight,
//     100,
//   );
//   const makeBasePlate = new THREE.Mesh(plate, plateMaterialforSides);
//   makeBasePlate.position.set(containerWidth / 2, containerHeight / 2, -50);
//   scene.add(makeBasePlate);

//   // Apply scaling to the container wireframe to maintain the aspect ratio
//   containerWireframe.scale.set(aspectWidth, aspectHeight, aspectDepth);
//   containerWireframe.position.set(
//     (containerWidth / 2) * aspectWidth,
//     (containerHeight / 2) * aspectHeight,
//     (containerDepth / 2) * aspectDepth,
//   );

//   scene.add(containerWireframe);

//   // Color mapping from names to hex codes
//   const colorMap = {
//     red: 0xff0000,
//     green: 0x00ff00,
//     blue: 0x0000ff,
//     yellow: 0xffff00,
//     purple: 0x800080,
//     orange: 0xffa500,
//     black: 0x000000,
//   };

//   let textMesh; // Declare textMesh globally
//   let yPosition; // Store original y position

//   // Function to create and place small boxes using coordinates from JSON
//   const createSmallBoxesFromCoordinates = boxes => {
//     boxes.forEach(box => {
//       const startX = box.start.x;
//       const startZ = containerDepth - box.start.y;
//       const startY = box.start.z;
//       const endX = box.end.x;
//       const endY = box.end.z;
//       const endZ = containerDepth - box.end.y;
//       const colorName = box.color;

//       // colorName = hexTo0x(colorName)
//       // console.log(startX)
//       const smallBoxWidth = box.dimensions.width;
//       const smallBoxHeight = box.dimensions.height;
//       const smallBoxDepth = box.dimensions.length;
//       const centerX = startX + smallBoxWidth / 2;
//       const centerY = startY + smallBoxHeight / 2;
//       const centerZ = startZ - smallBoxDepth / 2;
//       const smallBoxGeometry = new THREE.BoxGeometry(
//         smallBoxWidth,
//         smallBoxHeight,
//         smallBoxDepth,
//       );
//       const smallBoxMaterial = new THREE.MeshStandardMaterial({
//         // color: parseInt(colorName, 16) || 0xffffff,
//         color: parseInt(colorName, 16) || 0xffffff,
//         transparent: true,
//         opacity: 1,
//         side: THREE.DoubleSide,
//       });

//       const smallBox = new THREE.Mesh(smallBoxGeometry, smallBoxMaterial);
//       // Apply the same aspect ratio scaling to the small boxes
//       smallBox.scale.set(aspectWidth, aspectHeight, aspectDepth);
//       // Adjust position to account for scaling
//       smallBox.position.set(
//         centerX * aspectWidth,
//         centerY * aspectHeight,
//         centerZ * aspectDepth,
//       );
//       scene.add(smallBox);
//       const smallBoxEdges = new THREE.EdgesGeometry(smallBoxGeometry);
//       const smallBoxEdgesMaterial = new THREE.LineBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         opacity: 0.5,
//       });
//       const smallBoxWireframe = new THREE.LineSegments(
//         smallBoxEdges,
//         smallBoxEdgesMaterial,
//       );
//       // smallBox.scale.set(aspectWidth, aspectHeight, aspectDepth);
//       smallBoxWireframe.scale.set(aspectWidth, aspectHeight, aspectDepth);
//       // Adjust position to account for scaling
//       smallBoxWireframe.position.set(
//         centerX * aspectWidth,
//         centerY * aspectHeight,
//         centerZ * aspectDepth,
//       );
//       scene.add(smallBoxWireframe);
//     });
//   };

//   speedButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       console.log('Speed button clicked');
//       console.log('isAnimating:', isAnimating);
//       console.log('isLogin:', isLogin);

//       if (isLogin) {
//         const newSpeed = parseFloat(button.dataset.speed);
//         console.log('Changing speed to:', newSpeed);
//         currentSpeed = newSpeed;
//         updateSpeedButtonStyles(button);

//         if (isAnimating) {
//           // Adjust ongoing animation
//           lastAnimationTime = performance.now();
//         }
//       } else {
//         console.log('Login required');
//         alert('Register or login required');
//       }
//     });
//   });

//   function updateSpeedButtonStyles(selectedButton) {
//     speedButtons.forEach(btn => {
//       btn.style.backgroundColor = 'white';
//       btn.style.color = 'black';
//     });
//     selectedButton.style.backgroundColor = '#9d4edd';
//     selectedButton.style.color = 'white';
//   }

//   const animateSmallBoxes = boxes => {
//     isAnimating = true;
//     animationQueue = [...boxes];
//     lastAnimationTime = performance.now();
//     requestAnimationFrame(animateNextBox);
//   };

//   const animateNextBox = timestamp => {
//     if (!isAnimating) return;

//     const elapsedTime = timestamp - lastAnimationTime;

//     if (elapsedTime >= currentSpeed) {
//       if (animationQueue.length > 0) {
//         const box = animationQueue.shift();
//         createSmallBox(box);
//         lastAnimationTime = timestamp;
//       } else {
//         console.log('Animation completed');
//         isAnimating = false;
//         return;
//       }
//     }

//     requestAnimationFrame(animateNextBox);
//   };

//   const createSmallBox = box => {
//     const startX = box.start.x;
//     const startZ = containerDepth - box.start.y;
//     const startY = box.start.z;

//     const endX = box.end.x;
//     const endY = box.end.z;
//     const endZ = containerDepth - box.end.y;
//     const colorName = box.color;

//     const smallBoxWidth = box.dimensions.width;
//     const smallBoxHeight = box.dimensions.height;
//     const smallBoxDepth = box.dimensions.length;

//     const centerX = startX + smallBoxWidth / 2;
//     const centerY = startY + smallBoxHeight / 2;
//     const centerZ = startZ - smallBoxDepth / 2;

//     const smallBoxGeometry = new THREE.BoxGeometry(
//       smallBoxWidth,
//       smallBoxHeight,
//       smallBoxDepth,
//     );
//     const smallBoxMaterial = new THREE.MeshStandardMaterial({
//       color: parseInt(colorName, 16) || 0xffffff,
//       transparent: true,
//       opacity: 0.9,
//       side: THREE.DoubleSide,
//     });
//     const smallBox = new THREE.Mesh(smallBoxGeometry, smallBoxMaterial);

//     smallBox.scale.set(aspectWidth, aspectHeight, aspectDepth);

//     smallBox.position.set(
//       centerX * aspectWidth,
//       centerY * aspectHeight,
//       centerZ * aspectDepth,
//     );

//     scene.add(smallBox);

//     const smallBoxEdges = new THREE.EdgesGeometry(smallBoxGeometry);
//     const smallBoxEdgesMaterial = new THREE.LineBasicMaterial({
//       color: 0x000000,
//       transparent: true,
//       opacity: 0.5,
//     });
//     const smallBoxWireframe = new THREE.LineSegments(
//       smallBoxEdges,
//       smallBoxEdgesMaterial,
//     );
//     smallBoxWireframe.scale.set(aspectWidth, aspectHeight, aspectDepth);

//     smallBoxWireframe.position.set(
//       centerX * aspectWidth,
//       centerY * aspectHeight,
//       centerZ * aspectDepth,
//     );

//     scene.add(smallBoxWireframe);
//     const start_X = containerWidth + 100; // Start position off to the right
//     const end_X = smallBox.position.x; // Target x position (left side)
//     const start_Y = smallBox.position.y + 150; // Start a bit higher than final position
//     const end_Y = smallBox.position.y; // Final y position (settled down)

//     smallBox.position.set(start_X, start_Y, smallBox.position.z);
//     smallBoxWireframe.position.set(start_X, start_Y, centerZ * aspectDepth);
//     new TWEEN.Tween(smallBox.position)
//       .to(
//         {
//           x: end_X, // Move to the left
//         },
//         2000, // Duration for horizontal movement
//       )
//       .easing(TWEEN.Easing.Quadratic.Out)
//       .onComplete(() => {
//         new TWEEN.Tween(smallBox.position)
//           .to(
//             {
//               y: end_Y, // Settle down to the final y position
//             },
//             1000, // Duration for settling down
//           )
//           .easing(TWEEN.Easing.Bounce.Out) // Use a bounce effect for settling down
//           .start();
//       })
//       .start();
//     new TWEEN.Tween(smallBoxWireframe.position)
//       .to(
//         {
//           x: end_X, // Move to the left (same as small box)
//         },
//         2000, // Duration for horizontal movement
//       )
//       .easing(TWEEN.Easing.Quadratic.Out)
//       .onComplete(() => {
//         new TWEEN.Tween(smallBoxWireframe.position)
//           .to(
//             {
//               y: end_Y, // Settle down to the final y position
//             },
//             1000, // Duration for settling down
//           )
//           .easing(TWEEN.Easing.Bounce.Out) // Use a bounce effect for settling down
//           .start();
//       })
//       .start();
//   };
//   const clearContainer = () => {
//     for (let i = scene.children.length - 1; i >= 0; i--) {
//       const child = scene.children[i];
//       if (
//         child.isPlate ||
//         (child.material && child.material.map === rustyTexture)
//       )
//         continue;
//       if (child.isLinePreserved) continue;
//       if (child === containerWireframe) continue;
//       // Remove only smallBox and smallBoxWireframe based on specific conditions
//       if (
//         (child.isMesh && child.geometry instanceof THREE.BoxGeometry) ||
//         (child.isLineSegments &&
//           child.geometry instanceof THREE.EdgesGeometry)
//       ) {
//         scene.remove(child); // Remove the smallBox or smallBoxWireframe
//       }
//     }
//   };

//   const addHorizontalLine = yPosition => {
//     const lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
//     const lineGeometry = new THREE.BufferGeometry().setFromPoints([
//       new THREE.Vector3(
//         0 * aspectWidth,
//         0 * aspectHeight,
//         yPosition * aspectDepth,
//       ),
//       new THREE.Vector3(
//         containerWidth * aspectWidth,
//         0 * aspectHeight,
//         yPosition * aspectDepth,
//       ),
//     ]);
//     const line = new THREE.Line(lineGeometry, lineMaterial);
//     line.isLinePreserved = true;
//     scene.add(line);
//   };

//   const addVerticalLine = yPosition => {
//     const lineMaterial = new THREE.LineBasicMaterial({
//       color: colorMap['black'],
//     });
//     const lineGeometry = new THREE.BufferGeometry().setFromPoints([
//       new THREE.Vector3(-250 * aspectWidth, 0, 0),
//       new THREE.Vector3(-250 * aspectWidth, 0, yPosition * aspectDepth),
//     ]);
//     const line = new THREE.Line(lineGeometry, lineMaterial);
//     line.isLinePreserved = true;
//     scene.add(line);
//   };

//   const addTextLabel = yPos => {
//     yPosition = yPos; // Store original y position
//     const loader = new FontLoader();
//     loader.load('/three/examples/fonts/optimer_bold.typeface.json', font => {
//       const textGeometry = new TextGeometry(yPos.toString() + 'mm', {
//         font: font,
//         size: 250,
//         depth: 5,
//         curveSegments: 12,
//         bevelEnabled: false,
//       });
//       const textMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
//       textMesh = new THREE.Mesh(textGeometry, textMaterial); // Assign to global textMesh variable

//       textGeometry.computeBoundingBox();
//       textMesh.position.set(
//         -1800 * aspectWidth,
//         -400 * aspectHeight,
//         yPos * aspectDepth,
//       );
//       scene.add(textMesh);
//     });
//   };

//   // Load coordinates from JSON file and create boxes
//   getLocalStorageItem('threed_paths')
//     .then(data => {
//       const boxes = data?.filter(item => item.start && item.end);
//       const lastBoxYItem = data?.find(item => item.last_box_y !== undefined);

//       if (boxes.length > 0) {
//         createSmallBoxesFromCoordinates(boxes);

//         const originalWidth = window.innerWidth;
//         const originalHeight = window.innerHeight;
//         const screenshotWidth = window.innerWidth * window.devicePixelRatio; // High resolution
//         const screenshotHeight = window.innerHeight * window.devicePixelRatio; // High resolution

//         renderer.setSize(screenshotWidth, screenshotHeight);
//         renderer.render(scene, camera); // Render the scene at the new resolution

//         const screenshotDataURL = renderer.domElement.toDataURL('image/png');

//         localStorage.setItem('screenshot', screenshotDataURL);
//         renderer.setSize(originalWidth, originalHeight);
//         renderer.render(scene, camera);
//       }

//       if (lastBoxYItem) {
//         const lastBoxY = lastBoxYItem.last_box_y;
//         addVerticalLine(lastBoxY);
//         addHorizontalLine(lastBoxY);
//         addTextLabel(lastBoxY);
//       }
//     })
//     .catch(error => console.error('Error loading coordinates:', error));

//   const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Adjust the intensity (0.6) as needed
//   scene.add(ambientLight);

//   // Add directional light for dynamic lighting effects
//   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Brighter light for highlights and shadows
//   directionalLight.position.set(1, 1, 1).normalize();
//   scene.add(directionalLight);

//   const resetButton = document.getElementById('resetButton');
//   const topViewButton = document.getElementById('topViewButton');
//   const bottomViewButton = document.getElementById('bottomViewButton');
//   const sideViewButton = document.getElementById('sideViewButton');
//   const screenshot = document.getElementById('screenshot');

//   // Function to reset the view
//   const resetView = () => {
//     console.log('rest');

//     camera.position.set(
//       4.9 * containerWidth * aspectWidth,
//       4.9 * containerHeight * aspectHeight,
//       1.2 * containerDepth * aspectDepth,
//     );
//     orbit.target.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     basePlate.visible = true;

//     if (textMesh) {
//       textMesh.position.set(
//         (containerWidth + 600) * aspectWidth,
//         -400 * aspectHeight,
//         (yPosition + 100) * aspectDepth,
//       ); // Reset text position
//       textMesh.rotation.set(0, 0, 0); // Reset text rotation
//     }

//     // Ensure the labels are facing the camera in the top view
//     scene.traverse(object => {
//       if (object.isMesh && object.geometry.type === 'TextGeometry') {
//         object.rotation.set(0, 0, 0); // Adjust label rotation for top view
//       }
//     });

//     orbit.update();
//   };

//   // Function to set top view
//   const setTopView = () => {
//     camera.position.set(
//       (containerWidth / 2) * aspectWidth,
//       containerHeight * 6 * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     orbit.target.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );

//     basePlate.visible = true;

//     if (textMesh) {
//       textMesh.rotation.x = -Math.PI / 2; // Rotate text by -90 degrees around X-axis
//     }
//     // Ensure the labels are facing the camera in the top view
//     scene.traverse(object => {
//       if (object.isMesh && object.geometry.type === 'TextGeometry') {
//         object.rotation.set(-Math.PI / 2, 0, 0); // Adjust label rotation for top view
//       }
//     });

//     orbit.update();
//   };

//   // Function to set bottom view
//   const setBottomView = () => {
//     camera.position.set(
//       (containerWidth / 2) * aspectWidth,
//       -6 * containerHeight * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     orbit.target.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     basePlate.visible = false;
//     if (textMesh) {
//       textMesh.rotation.x = Math.PI / 2; // Rotate text by 90 degrees around X-axis
//     }

//     scene.traverse(object => {
//       if (object.isMesh && object.geometry.type === 'TextGeometry') {
//         object.rotation.set(Math.PI / 2, 0, 0); // Adjust label rotation for bottom view
//       }
//     });

//     orbit.update();
//   };

//   // Function to set side view
//   const setSideView = () => {
//     camera.position.set(
//       containerWidth * 6 * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     orbit.target.set(
//       (containerWidth / 2) * aspectWidth,
//       (containerHeight / 2) * aspectHeight,
//       (containerDepth / 2) * aspectDepth,
//     );
//     basePlate.visible = true;

//     if (textMesh) {
//       textMesh.rotation.set(0, Math.PI / 2, 0); // Rotate text by 90 degrees around Y-axis
//     }

//     scene.traverse(object => {
//       if (object.isMesh && object.geometry.type === 'TextGeometry') {
//         object.rotation.set(0, Math.PI / 2, 0); // Adjust label rotation for side view
//       }
//     });

//     orbit.update();
//   };

//   // Event listeners for buttons
//   resetButton.addEventListener('click', resetView);
//   topViewButton.addEventListener('click', setTopView);
//   bottomViewButton.addEventListener('click', setBottomView);
//   sideViewButton.addEventListener('click', setSideView);
//   document.getElementById('animate').addEventListener('click', () => {
//     if (!isAnimating) {
//       console.log('Starting animation');
//       clearContainer();
//       animateSmallBoxes(threedPath[ind]);
//     } else {
//       console.log('Stopping animation');
//       isAnimating = false;

//       clearContainer();
//       createSmallBoxesFromCoordinates(threedPath[ind]);
//     }
//   });

//   let animationFrameId;

//   const gltfLoader = new GLTFLoader();
//   gltfLoader.load('/3dmodels/group1.gltf', gltf => {
//     const model = gltf.scene;

//     // Scale the model to fit into the viewport
//     model.scale.set(0.1, 0.1, 0.1);

//     // Create an Object3D container for the model
//     const modelContainer = new THREE.Object3D();
//     modelContainer.add(model);
//     // Create a secondary scene for the fixed model
//     const fixedScene = new THREE.Scene();
//     fixedScene.background = new THREE.Color('rgba(255, 255, 255, 1)');
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
//     directionalLight.position.set(1, 1, 1);
//     directionalLight.castShadow = true;
//     fixedScene.add(directionalLight);

//     const ambientLight = new THREE.AmbientLight(0xffffff);
//     fixedScene.add(ambientLight);

//     // Enable shadows for the model
//     model.traverse(node => {
//       if (node.isMesh) {
//         node.castShadow = true;
//         node.receiveShadow = true;
//       }
//     });
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//     const fixedCamera = new THREE.OrthographicCamera(-1, 1, 1, 1, 0.1, 10000);
//     fixedCamera.position.set(0, 0, 14); // Position the camera so it looks at the model
//     fixedCamera.lookAt(0, 0, 0);
//     fixedScene.add(modelContainer);
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center); // Center the model at the origin
//     const addedPlates = [];
//     function putPlateSide(face) {
//       if (face.position.x !== 0) {

//         const plate = new THREE.BoxGeometry(
//           containerHeight,
//           containerDepth * aspectDepth,
//           50,
//         );
//         const makeBasePlate = new THREE.Mesh(plate, plateMaterialforSides);
//         makeBasePlate.rotation.x = Math.PI / 2;
//         makeBasePlate.rotation.y = Math.PI / 2;
//         if (face.position.x > 0) {
//           makeBasePlate.position.set(
//             1 * containerWidth + 25,
//             containerHeight / 2,
//             containerDepth,
//           );
//         } else {
//           makeBasePlate.position.set(
//             -25,
//             containerHeight / 2,
//             containerDepth,
//           );
//         }
//         makeBasePlate.isPlate = true;
//         // Add the plate to the scene
//         scene.add(makeBasePlate);
//         addedPlates.push({
//           plate: makeBasePlate,
//           normal: face.normal.clone(),
//         });
//       }
//     }
//     function removePlateSide(face) {
//       for (let i = 0; i < addedPlates.length; i++) {
//         const plateEntry = addedPlates[i];
//         if (plateEntry.normal.equals(face.normal)) {
//           scene.remove(plateEntry.plate);
//           plateEntry.plate.geometry.dispose();
//           plateEntry.plate.material.dispose();
//           addedPlates.splice(i, 1);
//         }
//       }
//     }

//     function animate() {
//       requestAnimationFrame(animate);

//       // Update camera controls
//       orbit.update();

//       // Render the main scene
//       renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
//       renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
//       renderer.setScissorTest(true);
//       renderer.clear();
//       renderer.render(scene, camera);

//       // Set the viewport for the fixed scene rendering (top-right corner)
//       const viewportWidth = window.innerWidth / 6; // 1/4 of the width
//       const viewportHeight = window.innerHeight / 4; // 1/4 of the height
//       renderer.setViewport(
//         window.innerWidth - viewportWidth - window.innerWidth / 20,
//         window.innerHeight - viewportHeight - window.innerHeight / 20,
//         viewportWidth,
//         viewportHeight,
//       );
//       renderer.setScissor(
//         window.innerWidth - viewportWidth - window.innerWidth / 20,
//         window.innerHeight - viewportHeight - window.innerHeight / 20,
//         viewportWidth,
//         viewportHeight,
//       );
//       renderer.setScissorTest(true);

//       // Ensure the fixed model container follows the main camera's rotation
//       modelContainer.quaternion.copy(camera.quaternion.clone().invert());

//       // Adjust the fixed camera to fit the viewport
//       fixedCamera.left = -viewportWidth / 2 / 10; // Adjust based on model scale
//       fixedCamera.right = viewportWidth / 2 / 10;
//       fixedCamera.top = viewportHeight / 2 / 10;
//       fixedCamera.bottom = -viewportHeight / 2 / 10;
//       fixedCamera.updateProjectionMatrix();

//       // Render the fixed scene in the small viewport
//       renderer.clearDepth(); // Clear depth buffer so fixedScene renders on top
//       renderer.render(fixedScene, fixedCamera);

//       // Iterate over faces and apply the visibility logic
//       faces.forEach(face => {
//         // Compute the vector from the camera to a point on the face
//         const vectorToFace = new THREE.Vector3().subVectors(
//           face.position,
//           camera.position,
//         );

//         // Calculate the dot product
//         const dotProduct = vectorToFace.dot(face.normal);

//         // Determine visibility based on the sign of the dot product
//         if (dotProduct > 0) {
//           putPlateSide(face);
//         } else {
//           removePlateSide(face);
//         }
//       });
//     }

//     animate();
//   });

//   // Adjust the camera and renderer on window resize
//   window.addEventListener('resize', () => {
//     const aspect = window.innerWidth / window.innerHeight;
//     camera.aspect = aspect;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });
//   function animato() {
//     // if (!isAnimating) return;
//     animationFrameId = requestAnimationFrame(animato);
//     TWEEN.update(); // Update TWEEN animations
//     renderer.render(scene, camera);
//   }

//   animato();
// });
// });

// `;
