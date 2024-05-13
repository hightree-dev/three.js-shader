import * as THREE from './node_modules/three/build/three.module.js'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(4, 30);
const material = new THREE.ShaderMaterial({ 
  uniforms : {
    u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
    u_time: { type: 'f', value: 1.0 }  
  },
  fragmentShader: `
    uniform float u_time;
    void main() {
      gl_FragColor = vec4(sin(u_time), cos(u_time), u_time, 1.0);
    }
  `
});

const ico = new THREE.Mesh(geometry, material);
ico.material.wireframe = true;
scene.add(ico);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);

  material.uniforms.u_time.value += 0.01;
  ico.rotation.x += 0.01;
  ico.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
