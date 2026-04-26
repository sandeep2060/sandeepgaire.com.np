// TYPING EFFECT
const roles = ["Web Developer", "Computer Teacher", "Tech Enthusiast"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = roles[i];

  if (deleting) j--;
  else j++;

  document.getElementById("typing").innerText = current.substring(0, j);

  if (!deleting && j === current.length) {
    deleting = true;
    setTimeout(type, 1000);
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, deleting ? 50 : 100);
  }
}
type();


// PARTICLES
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 2 }
  }
});


// GITHUB PROJECT FETCH
fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("github-projects");

    data.slice(0,6).forEach(repo => {
      let div = document.createElement("div");
      div.className = "repo";
      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank">View</a>
      `;
      container.appendChild(div);
    });
  });


// THREE.JS 3D OBJECT
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
