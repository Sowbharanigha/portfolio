// ===============================
// Typing Animation
// ===============================

const words = [
    "Java Developer",
    "Cybersecurity Enthusiast",
    "Web Developer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    let currentWord = words[wordIndex];

    if (!isDeleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = isDeleting ? 70 : 120;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        speed = 1500;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ===============================
// GSAP Animations
// ===============================

gsap.from(".logo", {
    y: -80,
    opacity: 0,
    duration: 1
});

gsap.from(".navbar ul li", {
    y: -40,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

gsap.from(".hero-text", {
    x: -100,
    opacity: 0,
    duration: 1.5
});

gsap.from(".glass-card", {
    x: 100,
    opacity: 0,
    duration: 1.5
});

gsap.from(".title", {
    scrollTrigger: ".title",
    y: 50,
    opacity: 0,
    duration: 1
});


// ===============================
// Three.js Background
// ===============================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector("#bg"),
alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 15;


// ===============================
// Floating Spheres
// ===============================

const spheres = [];

for(let i=0;i<30;i++){

const geometry = new THREE.SphereGeometry(
0.18,
20,
20
);

const material = new THREE.MeshBasicMaterial({
color:0x00e5ff
});

const sphere = new THREE.Mesh(
geometry,
material
);

sphere.position.x=(Math.random()-0.5)*30;
sphere.position.y=(Math.random()-0.5)*30;
sphere.position.z=(Math.random()-0.5)*30;

scene.add(sphere);

spheres.push(sphere);

}


// ===============================
// Animation Loop
// ===============================

function animate(){

requestAnimationFrame(animate);

spheres.forEach((sphere,index)=>{

sphere.rotation.x +=0.01;

sphere.rotation.y +=0.01;

sphere.position.y +=Math.sin(Date.now()*0.001+index)*0.002;

});

renderer.render(scene,camera);

}

animate();


// ===============================
// Resize
// ===============================

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});


// ===============================
// Skill Card Hover
// ===============================

document.querySelectorAll(".skill-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.05)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px) scale(1)";

});

});


// ===============================
// Project Card Hover
// ===============================

document.querySelectorAll(".project-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;
const y=e.offsetY;

const rotateY=(x-card.offsetWidth/2)/18;
const rotateX=(card.offsetHeight/2-y)/18;

card.style.transform=
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0deg) rotateY(0deg)";

});

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({

behavior:"smooth"

});

});

});
