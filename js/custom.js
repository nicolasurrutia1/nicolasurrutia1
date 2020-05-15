//#region camera / scene / renderer
const scene = new THREE.Scene();
// scene.fog = new THREE.Fog('white', 0.1, 19);
var aspect = window.innerWidth / window.innerHeight
const camera = new THREE.OrthographicCamera(-100 * aspect, 100 * aspect, 100, -100, -1000, 1000);
camera.position.set(4, 4, 4)
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
renderer.setClearColor(0xffdca9, 0.9);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
})
if (window.screen.width <= 768 && window.screen.width >= 576) {
    camera.fov = 85;
}
if (window.screen.width <= 575 && window.screen.width >= 426) {
    camera.fov = 100;
}
if (window.screen.width <= 425 && window.screen.width >= 321) {
    camera.fov = 115;
}
if (window.screen.width <= 320) {
    camera.fov = 120;
}
camera.updateProjectionMatrix();
//#endregion

//#region light
const color = 0xFFFFFF
const intensity = 0.8
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

var point = new THREE.PointLight(0xffffff, 0.8)
point.position.set(0, 50, 50)
scene.add(point);
//#endregion

//#region orbit controls
var controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', animate)
controls.enableZoom = true
controls.enablePan = false
controls.maxPolarAngle = Math.PI / 2
//#endregion

//#region grid
var geoGrid = new THREE.PlaneBufferGeometry(100, 100, 10, 10)
var matGrid = new THREE.MeshBasicMaterial({ color: 0x00000, wireframe: true, opacity: 1 })
var grid = new THREE.Mesh(geoGrid, matGrid)
grid.rotation.order = 'YXZ'
grid.rotation.y = -Math.PI / 2
grid.rotation.x = -Math.PI / 2
scene.add(grid)
//#endregion

//#region darwin
var loader = new THREE.GLTFLoader();
loader.load(
    'models/darwin/Darwin2.glb',
    function (gltf) {
        gltf.scene.scale.set(50, 50, 50)
        gltf.scene.name = 'darwin'
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
//#endregion

//#region plant
var loader = new THREE.GLTFLoader();
loader.load(
    'models/plant/plant.glb',
    function (gltf) {
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.name = 'plant'
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
//#endregion

//#region compu
var loader = new THREE.GLTFLoader();
loader.load(
    'models/compu/compu.glb',
    function (gltf) {
        gltf.scene.position.set(0, 0, 20)
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.name = 'compu'
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
//#endregion

//#region hammer
var loader = new THREE.GLTFLoader();
loader.load(
    'models/hammer/hammer.glb',
    function (gltf) {
        gltf.scene.position.set(0, 20, 0)
        gltf.scene.scale.set(2, 2, 2)
        gltf.scene.name = 'hammer'
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
//#endregion

//#region click
var raycaster, mouse = { x: 0, y: 0 }
raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener('click', raycast, false);
function raycast(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(scene.children, true)
    for (var i = 0; i< intersects.length; i++){
        console.log(intersects[i].object)
        if(intersects[i].object.name === 'plant'){
            gsap.to(camera.position,{x:0, y:0, duration:0.5})
        }
    }
}
//#endregion

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();