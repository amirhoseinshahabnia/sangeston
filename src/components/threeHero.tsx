"use client";

import * as THREE from "three";

import { useEffect, useRef, useState } from "react";

function ThreeHero() {
  const [loading, setLoading] = useState(true);
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    setLoading(false);
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
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
