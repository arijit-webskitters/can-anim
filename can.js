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
    camera.position.y = 1.8;
    camera.lookAt(new THREE.Vector3(0, 1.8, 0));


    // const controls = new THREE.OrbitControls(
    //   camera,
    //   renderer.domElement
    // );
    // controls.target.z = 100;

    // const ambLight = new THREE.AmbientLight("#d6d6d6", 5);
    const light1 = new THREE.DirectionalLight("#fff", 0.8);
    light1.position.set(-0.15, 1.5, 1).normalize();
    // light1.position.set(30, 1, 1).normalize();
    light1.rotation.set(0, 0, 4);
    // light1.position.set(-0.15, 1.5, 1).normalize();
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.PointLight(0xFFFFFF, 0.2);
    light2.position.set(-3000, -500, 800);
    light2.castShadow = true;
    scene.add(light2);

    // const helper = new THREE.HemisphereLightHelper(light, 5)
    // scene.add(helper)
    // // light controls
    // const lightColor = {
    //   color: light.color.getHex(),
    //   groundColor: light.groundColor.getHex()
    // }
    // const lightFolder = gui.addFolder('Light')

    const light3 = new THREE.HemisphereLight(0xFFFFFF, 1);
    light3.position.set(-0.5, -5, 5);
    // light3.castShadow = true;
    scene.add(light3);

    window.addEventListener("resize", function () {
      let width = canvas1.clientWidth,
        height = canvas1.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });


    new THREE.GLTFLoader().load(
      // new THREE.OBJLoader().load(
      "https://arijit-webskitters.github.io/can-anim/model3/Can.gltf",
      // "model2/can.obj",

      // called when the resource is loaded
      function (gltf) {

        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.side = THREE.DoubleSide;
            node.material.flatShading = true;
            // node.material.blendDst = 1;
            // node.material.needsUpdate = true;
            // node.material.metalness = 1;
            // node.material.roughness=0.1;



            node.material.color.setHex(0x282526);
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
        model.scale.set(0.01225, 0.01225, 0.01225);
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
    const geometry = new THREE.CylinderGeometry(0.6256, 0.6256, 3.5, 30, 5, true);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // material.side = THREE.DoubleSide;
    // const cylinder = new THREE.Mesh(geometry, material);

    var phongMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 800,
      alphaMap: texture,
      blending: 1,
      transparent: true,
    });
    phongMaterial.side = THREE.DoubleSide;

    console.log("cylinder:", phongMaterial);

    const cylinder = new THREE.Mesh(geometry, phongMaterial);

    // var light = new THREE.PointLight(0xFFFFFF);
    // light.position.set(-10, 15, 50);
    // scene.add(light);

    // cylinder.rotation.set(0, (Math.PI / 1.1), 0);
    cylinder.rotation.set(0, (Math.PI / 1.1), 0);
    // cylinder.position.set(-0.265, 1.75, 0.2);
    cylinder.position.set(0, 1.9, 0);
    // cylinder.position.set(-0.265,0.55,0.2);
    // scene.add(cylinder);


    objGroup.add(cylinder);
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



    // GSAP
    if ($("#canvas-wpr").length) {
      let caioTl = gsap.timeline();
      const el = document.querySelector("#canvas-wpr");
      let item = el.querySelector("#canvas-wpr canvas");

      // gsap.set(objGroup.rotation, { x: 0.1, y: 0 });
      gsap.set(objGroup.rotation, { y: 0 });

      caioTl
        .to(objGroup.rotation, {
          y: 6.4,
        })
        .pause();


      ScrollTrigger.create({
        trigger: "#canvas-wpr",
        start: "top top",
        end: "+=100%",
        animation: caioTl,
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
        scrub: 0.3,
        pin: true,
        markers: true,
        // onEnter: () => ScrollTrigger.refresh(),
        // onUpdate: (self) => {
        //   //console.log(self.progress);
        //   if (self.progress > 0.87) {
        //     $(".rv-section-rht-col").addClass("present");
        //   } else {
        //     $(".rv-section-rht-col").removeClass("present");
        //   }
        // },
      });


    };
