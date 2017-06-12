
// Shorthands

const Vector = THREE.Vector3


// Utilities

const random = (amp = 1) => (Array(6).fill().reduce(v => v + Math.random(), 0) / 6 - 0.5) * amp


// Prepare Sciene

const container = document.getElementById('3d-container')

const dim = {
  width: container.offsetWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(dim.width, dim.height)
renderer.shadowMap.enabled = true
container.appendChild(renderer.domElement)

const scene = new THREE.Scene()


// camera and lights

const camera = new THREE.PerspectiveCamera(75, dim.width / dim.height, 0.1, 1000)

const light = new THREE.PointLight(0xffffff, 1)
const light2 = new THREE.AmbientLight(0xffffff, 0)
light.position.set(0, 0, 0)
scene.add(light)
scene.add(light2)


// Objects

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshLambertMaterial({ color: 0xffffff })

camera.position.z = 0;

class Cube {

  constructor({ geometry, material, scene }) {
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    scene.add(this.mesh)
    this.racc = new Vector()
    this.acc = new Vector()
  }

  tick() {

    // factors
    const a = 0.05
    const r = 0.1

    this.acc.add(new Vector(random(a), random(a), random(a)))
    this.racc.add(new Vector(random(r), random(r), random(r)))

    this.mesh.position.add(this.acc)
    this.mesh.rotation.setFromVector3(this.racc)
  }
}

const cubes = Array(10000).fill().map(() => new Cube({ geometry, material, scene }))

// Render

function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)

  // forward tick
  cubes.forEach(c => c.tick())
  camera.position.z += 0.1;
}
render();
