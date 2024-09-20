"use client";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
// import { GUI } from "dat.gui";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ThreeHero() {
  const [loading, setLoading] = useState(true);
  const refContainer = useRef<HTMLDivElement>(null);

  const hdr = "/graffiti.hdr";
  const model = "/sang.glb";

  const handleScrollClick = () => {
    const id = "music";
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const y = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    let environmentTexture: THREE.DataTexture;

    new RGBELoader().load(hdr, (texture) => {
      environmentTexture = texture;
      environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = environmentTexture;
      scene.background = environmentTexture;
      scene.backgroundRotation = new THREE.Euler(1, -1.5, 0);
      // scene.backgroundBlurriness = 0.01;
      scene.environmentIntensity = 0.7;
      setTimeout(() => {
        setLoading(false);
      }, 800);
    });

    const material = new THREE.MeshPhysicalMaterial();
    material.side = THREE.DoubleSide;
    material.roughness = 0;
    material.metalness = 1;

    const directionallight = new THREE.DirectionalLight(0xebfeff, Math.PI);
    directionallight.position.set(1, 0.1, 1);
    directionallight.visible = false;
    scene.add(directionallight);

    const ambientLight = new THREE.AmbientLight(0xebfeff, Math.PI / 16);
    ambientLight.visible = false;
    scene.add(ambientLight);

    // const gui = new GUI({ autoPlace: false });
    // gui.domElement.id = "gui";
    let obj: any;

    new GLTFLoader().load(model, (gltf) => {
      gltf.scene.traverse((child) => {
        (child as THREE.Mesh).material = material;
      });
      obj = gltf.scene;
      scene.add(obj);
      // const modelFolder = gui.addFolder("Model");
      // modelFolder.add(obj.position, "z", -20, 20, 1);
      // modelFolder.open();
      obj.position.set(0, 0, 1);
    });

    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });

    refContainer.current?.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 768 && obj) {
        // obj.rotation.x = THREE.MathUtils.lerp(0, e.clientY, 0.001);
        obj.rotation.y = THREE.MathUtils.lerp(0, e.clientX, 0.002);
        obj.rotation.z = THREE.MathUtils.lerp(0, e.clientY, 0.0001);
        camera.lookAt(
          new THREE.Vector3(
            THREE.MathUtils.lerp(0, e.clientX, 0.0003),
            THREE.MathUtils.lerp(0, e.clientY, 0.0001),
            0
          )
        );
      }
    });

    // const sceneFolder = gui.addFolder("Scene");
    // sceneFolder.add(scene.backgroundRotation, "y", -5, 5, 0.5);
    // sceneFolder.add(scene.backgroundRotation, "x", -5, 5, 0.5);
    // sceneFolder.add(scene.backgroundRotation, "z", -5, 5, 0.5);
    // sceneFolder.add(scene.backgroundRotation, "y", 0, Math.PI * 2);
    // sceneFolder.add(scene.backgroundRotation, "z", 0, Math.PI * 2);
    // sceneFolder.open();

    // const cameraFolder = gui.addFolder("Camera");
    // cameraFolder.add(camera, "fov", 0, 150, 5).onChange(() => {
    //   camera.updateProjectionMatrix();
    // });
    // cameraFolder.open();

    function animate() {
      requestAnimationFrame(animate);

      if (window.innerWidth <= 768 && obj) {
        obj.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      {loading && (
        <div className="hero-loader min-h-screen flex justify-center flex-col items-center">
          {/* <div className="glitch-logo mb-4"></div> */}
          <img
            src="/glitch-1.gif"
            alt="Sangstone Logo"
            className="mb-4 sang-gif"
          />
          <p>Loading...</p>
        </div>
      )}
      <div ref={refContainer} className="relative">
        <div
          className="absolute left-0 bottom-0 right-0 h-24 w-full"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
          }}
        ></div>
      </div>

      {!loading && (
        <div
          className="scroll-hero main-color absolute bottom-1  flex flex-col items-center hover:opacity-80 cursor-pointer"
          onClick={handleScrollClick}
        >
          <span className="animate-bounce">Enter the world</span>
          <FontAwesomeIcon icon={faChevronDown} size="3x" fontWeight={100} />
        </div>
      )}
    </>
  );
}

export default ThreeHero;
