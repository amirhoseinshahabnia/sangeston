"use client";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import { useEffect, useRef, useState } from "react";

function ThreeHero() {
  const [loading, setLoading] = useState(true);
  const refContainer = useRef<HTMLDivElement>(null);

  const hdr = "/mars.hdr";
  const model = "/sang.glb";

  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
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
      //   scene.backgroundBlurriness = 0.01;
      scene.environmentIntensity = 1;
      setLoading(false);
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
    ambientLight.visible = true;
    scene.add(ambientLight);

    let obj: any;

    new GLTFLoader().load(model, (gltf) => {
      gltf.scene.traverse((child) => {
        (child as THREE.Mesh).material = material;
      });
      obj = gltf.scene;
      console.log(obj);
      scene.add(gltf.scene);
    });

    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("mousemove", (e) => {
      obj.rotation.x = THREE.MathUtils.lerp(0, e.clientY, 0.001);
      obj.rotation.y = THREE.MathUtils.lerp(0, e.clientX, 0.002);
      obj.rotation.z = THREE.MathUtils.lerp(0, e.clientY, 0.0001);
    });

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <div ref={refContainer}></div>
      {loading && (
        <div className="hero-loader min-h-screen flex justify-center flex-col items-center">
          <div className="glitch-logo mb-4"></div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default ThreeHero;
