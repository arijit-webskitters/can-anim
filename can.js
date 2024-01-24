let model;

var objGroup = new THREE.Object3D();
var outerObjGroup1 = new THREE.Object3D();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  // antialias: true,
});
var canvas = document.getElementById("canvas-wpr");
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.logarithmicDepthBuffer = false;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// console.log(canvas)
canvas.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 2.1;

// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.target.z = 100;

// const ambLight = new THREE.AmbientLight(0x8ae8ff, 5);
const light = new THREE.HemisphereLight("#fff", 0.1);
light.position.set(-0.5, -5, 10);
scene.add(light);

window.addEventListener("resize", function () {
  console.log("affs");
  let width = canvas.clientWidth,
    height = canvas.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  render();
});

const texture = new THREE.TextureLoader().load("https://arijit-webskitters.github.io/can-anim/model6/world.jpg");
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.castShadow = true;
scene.matrixWorldNeedsUpdate = true;

new THREE.GLTFLoader().load(
  "https://arijit-webskitters.github.io/can-anim/model6/asset.gltf",

  // called when the resource is loaded
  function (gltf) {
    gltf.scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        // node.material.map.minFilter = THREE.LinearFilter;
        node.material.side = THREE.DoubleSide;
        model = gltf.scene;
        node.material.flatShading = false;
        node.material.metalness = 0.8;
        node.material.envMap = texture;
        node.material.envMapIntensity = 2;

        console.log(node);
      }
    });
    console.log(model);
    model.scale.set(1.1, 1.1, 1.1);
    objGroup.add(model);
  },

  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

outerObjGroup1.add(objGroup);
outerObjGroup1.position.y = 0.2;
outerObjGroup1.position.z = 1.2;

scene.add(outerObjGroup1);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

/*---*/
// canvas.addEventListener("mouseout", function () {
//   gsap.to(outerObjGroup1.rotation, {
//     x: 0,
//     y: 0,
//     z: 0,
//     duration: 0.2,
//     ease: "none",
//   });
// });
// var lFollowX = 0,
//   lFollowY = 0,
//   x = 0,
//   y = 0,
//   friction = 1 / 12;

// function animate() {
//   x += (lFollowX - x) * friction;
//   y += (lFollowY - y) * friction;

//   gsap.set(outerObjGroup1.rotation, {
//     x: y,
//     y: -x,
//     z: 0,
//   });
//   window.requestAnimationFrame(animate);
// }

// canvas.addEventListener("mousemove", function (e) {
//   var lMouseX = Math.max(
//       -100,
//       Math.min(100, canvas.clientWidth / 2 - e.clientX)
//     ),
//     lMouseY = Math.max(
//       -100,
//       Math.min(100, canvas.clientHeight / 2 - e.clientY)
//     );
//   lFollowX = (2 * lMouseX) / 500;
//   lFollowY = (2 * lMouseY) / 2000;
// });
// animate();
