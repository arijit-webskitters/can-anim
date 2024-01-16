let model2;

    // var objGroup = new THREE.Group();
    var objGroup2 = new THREE.Object3D();

    const renderer2 = new THREE.WebGLRenderer({
      alpha: true,
      antialiase: true,
    });
    var canvas2 = document.getElementById('banner-canvas-wpr');
    renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
    renderer2.setPixelRatio(window.devicePixelRatio);
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
    camera2.lookAt(new THREE.Vector3(0, 2.1, 0));


    // const controls = new THREE.OrbitControls(
    //   camera,
    //   renderer.domElement
    // );
    // controls.target.z = 100;

    // const ambLight = new THREE.AmbientLight("#d6d6d6", 5);
    const bannerLight1 = new THREE.DirectionalLight("#fff", 0.2);
    bannerLight1.position.set(-60, 15, 10).normalize();
    // light1.rotation.set(0, 0, 0);
    // light1.position.set(0, 5, 5).normalize();
    // light1.position.set(-0.15, 1.5, 1).normalize();
    bannerLight1.castShadow = true;
    scene2.add(bannerLight1);

    const bannerLight2 = new THREE.PointLight(0xFFFFFF, 0.5);
    bannerLight2.position.set(40, 2, 10);
    // light2.castShadow = true;
    scene2.add(bannerLight2);

    const bannerLight3 = new THREE.HemisphereLight(0xFFFFFF, 1);
    bannerLight3.position.set(-0.5, -5, 10);
    // light3.castShadow = true;
    scene2.add(bannerLight3);

    window.addEventListener("resize", function () {
      let width = canvas2.clientWidth,
        height = canvas2.clientHeight;
      renderer2.setSize(width, height);
      camera2.aspect = width / height;
      camera2.updateProjectionMatrix();
    });


    new THREE.GLTFLoader().load(
      // new THREE.OBJLoader().load(
      "https://arijit-webskitters.github.io/can-anim/model4/Untitled.gltf",
      // "model2/can.obj",

      // called when the resource is loaded
      function (gltf2) {

        gltf2.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.side = THREE.DoubleSide;
            node.material.flatShading = false;
            // node.material.blendDst = 1;
            // node.material.needsUpdate = true;
            // node.material.metalness = 1;
            // node.material.roughness=0.1;



            // node.material.color.setHex(0x282526);
            // node.material.color = "#000";
            // node.material.map = textures[0];
            model2 = gltf2.scene;

            console.log("node:", node);
          }
        });

        // model2.textures = textures;
        // model2.scale.set(0.35, 0.35, 0.35);
        // model2.scale.set(0.1, 0.1, 0.1);
        // model2.scale.set(12, 12, 12);
        model2.scale.set(1, 1, 1);
        // model2.position.set(0,-1.2,0);
        // scene.add(model2);
        objGroup2.add(model2);
        console.log("all anmi:", gltf2.animations);
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

    // let cylinder = new THREE.CylinderGeometry(20, 20, 20, 8, 1, true);
    // let meshMaterial = new THREE.MeshNormalMaterial();

    //     let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireMat]);
    // scene.add(cylinder);

    // CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, 
    // radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)


    const texture2 = new THREE.TextureLoader().load('https://arijit-webskitters.github.io/can-anim/images/wrap-img.png');
    const geometry2 = new THREE.CylinderGeometry(0.6765, 0.6765, 3.61, 30, 5, true);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // material.side = THREE.DoubleSide;
    // const cylinder = new THREE.Mesh(geometry, material);

    var phongMaterial2 = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 800,
      // alphaMap: texture,
      // blending: 1,
      // transparent: true,
    });
    phongMaterial2.side = THREE.DoubleSide;

    console.log("cylinder:", phongMaterial2);

    const cylinder2 = new THREE.Mesh(geometry2, phongMaterial2);

    // var light = new THREE.PointLight(0xFFFFFF);
    // light.position.set(-10, 15, 50);
    // scene.add(light);

    // cylinder.rotation.set(0, (Math.PI / 1.1), 0);
    cylinder2.rotation.set(0, (Math.PI / 1.1), 0);
    // cylinder.position.set(-0.265, 1.75, 0.2);
    cylinder2.position.set(0, 1.895, 0);
    // cylinder.position.set(-0.265,0.55,0.2);
    // scene.add(cylinder);


    objGroup2.add(cylinder2);
    objGroup2.position.z = 1.2;
    // objGroup.position.x = 1.2;

    // // objGroup.applyMatrix( new THREE.Matrix().setTranslation( 0, 10, 0 ) );
    scene2.add(objGroup2);


    function render2() {
      requestAnimationFrame(render2);
      renderer2.render(scene2, camera2);
    }
    render2();
    console.log("scene:", scene2);
