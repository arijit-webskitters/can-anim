let model2;

var objGroup2 = new THREE.Object3D();
var outerObjGroup = new THREE.Object3D();

const renderer2 = new THREE.WebGLRenderer({
  alpha: true,
  // antialias: true,
});
var canvas2 = document.getElementById("banner-canvas-wpr");
renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.logarithmicDepthBuffer = false;
renderer2.outputEncoding = THREE.sRGBEncoding;
renderer2.toneMapping = THREE.ACESFilmicToneMapping;
// console.log(canvas2)
canvas2.appendChild(renderer2.domElement);

const scene2 = new THREE.Scene();

const camera2 = new THREE.PerspectiveCamera(
  75,
  canvas2.clientWidth / canvas2.clientHeight,
  0.1,
  1000
);
camera2.position.z = 5;
camera2.position.y = 2.1;

// const controls = new THREE.OrbitControls(camera2, renderer2.domElement);
// controls.target.z = 100;

// const ambLight = new THREE.AmbientLight(0x8ae8ff, 5);
const bannerLight4 = new THREE.HemisphereLight("#fff", 0.1);
bannerLight4.position.set(-0.5, -5, 10);
scene2.add(bannerLight4);

window.addEventListener("resize", function () {
  console.log("affs");
  let width = canvas2.clientWidth,
    height = canvas2.clientHeight;
  renderer2.setSize(width, height);
  camera2.aspect = width / height;
  camera2.updateProjectionMatrix();
  render2();
});

const texture2 = new THREE.TextureLoader().load("https://arijit-webskitters.github.io/can-anim/model6/world.jpg");
texture2.mapping = THREE.EquirectangularReflectionMapping;
scene2.castShadow = true;
scene2.matrixWorldNeedsUpdate = true;

const ff = new THREE.GLTFLoader();
ff.load(
  "https://arijit-webskitters.github.io/can-anim/model6/asset.gltf",

  // called when the resource is loaded
  function (gltf2) {
    gltf2.scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        // node.material.map.minFilter = THREE.LinearFilter;
        node.material.side = THREE.DoubleSide;
        model2 = gltf2.scene;
        node.material.flatShading = false;
        node.material.metalness = 0.8;
        node.material.envMap = texture2;
        node.material.envMapIntensity = 2;

        console.log(node);
      }
    });
    console.log(model2);
    model2.scale.set(1.1, 1.1, 1.1);
    objGroup2.add(model2);
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

outerObjGroup.add(objGroup2);
outerObjGroup.position.y = 0.2;
outerObjGroup.position.z = 1.2;

scene2.add(outerObjGroup);

function render2() {
  renderer2.render(scene2, camera2);
  requestAnimationFrame(render2);
}
render2();

/*---*/
function cnvasMove(){
  canvas2.addEventListener("mouseout", function () {
    gsap.to(outerObjGroup.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "none",
    });
  });
  var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 12;
  
  function animate() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
  
    gsap.set(outerObjGroup.rotation, {
      x: y,
      y: -x,
      z: 0,
    });
    window.requestAnimationFrame(animate);
  }
  
  canvas2.addEventListener("mousemove", function (e) {
    var lMouseX = Math.max(
        -100,
        Math.min(100, canvas2.clientWidth / 2 - e.clientX)
      ),
      lMouseY = Math.max(
        -100,
        Math.min(100, canvas2.clientHeight / 2 - e.clientY)
      );
    lFollowX = (2 * lMouseX) / 5000;
    lFollowY = (2 * lMouseY) / 2000;
  });
  animate();
}

