import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    canvasRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 150);
    pointLight.position.set(20, 30, 20);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-10, 15, 10);
    scene.add(directionalLight);

    // Meshes
    const geometries = [
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.TetrahedronGeometry(2),
      new THREE.SphereGeometry(1.5, 32, 32),
    ];

    const meshes: THREE.Mesh[] = [];
    const meshCount = 50;

    const createMesh = () => {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 50%)`),
        metalness: 0.7,
        roughness: 0.1,
        emissive: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 20%)`),
        transparent: true,
        opacity: 0.85,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 100
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.scale.setScalar(Math.random() * 2 + 1);

      meshes.push(mesh);
      scene.add(mesh);
    };

    for (let i = 0; i < meshCount; i++) createMesh();

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Click to pop new mesh
    const handleClick = () => {
      createMesh();
    };
    window.addEventListener("click", handleClick);

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.002 + Math.sin(elapsed + idx) * 0.003;
        mesh.rotation.y += 0.003 + Math.cos(elapsed + idx) * 0.003;
        mesh.position.y += Math.sin(elapsed + idx * 0.2) * 0.01;
        mesh.position.x += Math.cos(elapsed + idx * 0.2) * 0.008;

        // Reset position if too far
        if (mesh.position.y > 60) mesh.position.y = -30;
        if (mesh.position.x > 60) mesh.position.x = -30;
      });

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} className="fixed inset-0 -z-10" />;
};
