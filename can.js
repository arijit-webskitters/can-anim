let model;

    // var objGroup = new THREE.Group();
    var objGroup = new THREE.Object3D();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialiase: true,
    });
    var canvas1 = document.getElementById('canvas-wpr');
    renderer.setSize(canvas1.clientWidth, canvas1.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping  = THREE.LinearToneMapping ;
    // console.log(canvas1)
    canvas1.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas1.clientWidth / canvas1.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2.1;
    camera.lookAt(new THREE.Vector3(0, 2.1, 0));


    // const controls = new THREE.OrbitControls(
    //   camera,
    //   renderer.domElement
    // );
    // controls.target.z = 100;

    // const ambLight = new THREE.AmbientLight("#d6d6d6", 5);
    const ambLight2 = new THREE.AmbientLight(0x8ae8ff, 5);
    const light1 = new THREE.DirectionalLight(0x8ae8ff, 0.05);
    light1.position.set(400, 100, 100);
    light1.rotation.set(0, 2, -0.4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight( 0x8ae8ff, 0.05, 1);
    // const helper = new THREE.DirectionalLightHelper( light2, 0.5 );
    // scene.add( helper );
    light2.position.set( -10,-5,-3 );
    light2.rotation.set(0.3,0,2.2 );
    scene.add( light2 );

    const light3 = new THREE.HemisphereLight(0x8ae8ff, 0.05);
    light3.position.set(0,1.5,10);
    light3.rotation.set(1.5,0,0);
    scene.add(light3);

    const light4 = new THREE.HemisphereLight("#fff", 0.1);
    light4.position.set(-0.5, -5, 10);
    // light4.castShadow = true;
    scene.add(light4);

    window.addEventListener("resize", function () {
      let width = canvas1.clientWidth,
        height = canvas1.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });


    new THREE.GLTFLoader().load(
      // new THREE.OBJLoader().load(
      "https://arijit-webskitters.github.io/can-anim/model5/asset.gltf",
      // "model2/can.obj",

      // called when the resource is loaded
      function (gltf) {

        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.map.minFilter = THREE.LinearFilter;
            node.material.side = THREE.DoubleSide;
            node.material.flatShading = false;
            node.material.metalness = 0.8;
            node.material.shading = THREE.SmoothShading;
            // node.material.blendDst = 1;
            // node.material.needsUpdate = true;
            // node.material.metalness = 1;
            // node.material.roughness=0.1;



            // node.material.color.setHex(0x282526);
            // node.material.color = "#000";
            // node.material.map = textures[0];
            model = gltf.scene;

            console.log("node:", node);
          }
        });

        // model.textures = textures;
        // model.scale.set(0.35, 0.35, 0.35);
        // model.scale.set(0.1, 0.1, 0.1);
        // model.scale.set(12, 12, 12);
        model.scale.set(1.15, 1.15, 1.15);
        // model.position.set(0,-1.2,0);
        // scene.add(model);
        objGroup.add(model);
        console.log("all anmi:", gltf.animations);
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


    const texture = new THREE.TextureLoader().load('https://arijit-webskitters.github.io/can-anim/images/wrap-img.png');
    const geometry = new THREE.CylinderGeometry(0.6765, 0.6765, 3.61, 30, 5, true);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // material.side = THREE.DoubleSide;
    // const cylinder = new THREE.Mesh(geometry, material);

    var phongMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 800,
      // alphaMap: texture,
      // blending: 1,
      // transparent: true,
    });
    phongMaterial.side = THREE.DoubleSide;
    phongMaterial.map.minFilter = THREE.LinearFilter;
    phongMaterial.shading = THREE.SmoothShading;

    console.log("cylinder:", phongMaterial);

    const cylinder = new THREE.Mesh(geometry, phongMaterial);

    // var light = new THREE.PointLight(0xFFFFFF);
    // light.position.set(-10, 15, 50);
    // scene.add(light);

    // cylinder.rotation.set(0, (Math.PI / 1.1), 0);
    cylinder.rotation.set(0, (Math.PI / 1.1), 0);
    // cylinder.position.set(-0.265, 1.75, 0.2);
    cylinder.position.set(0, 1.895, 0);
    // cylinder.position.set(-0.265,0.55,0.2);
    // scene.add(cylinder);


    // objGroup.add(cylinder);
    objGroup.position.y = 0.1;
    objGroup.position.z = 1.2;
    // objGroup.position.x = 1.2;

    // // objGroup.applyMatrix( new THREE.Matrix().setTranslation( 0, 10, 0 ) );
    scene.add(objGroup);



    // gsap.to(objGroup.rotation, {
    //   duration: 1000,
    //   y: 360,
    //   repeat: -1,
    //   // yoyo: true,
    // })


    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
    console.log("scene:", scene);
