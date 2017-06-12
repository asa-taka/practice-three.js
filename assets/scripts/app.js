// const router = new VueRouter({
//   routes: [
//     {
//       path: '/',
//       component: { template: `
//         <div>a VueRouter works!</div>
//       `}
//     }
//   ]
// })
//
// new Vue({
//   el: '#app',
//   router,
// })


// Shorthands

const Vector = THREE.Vector3


// Utilities

const random = (amp = 1) => (Array(6).fill().reduce(v => v + Math.random(), 0) / 6 - 0.5) * amp


// Prepare Sciene

const c = document.getElementById('3d-container')

const dim = {
  width: window.innerWidth,
  height: window.innerHeight,
}
console.log(dim)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, dim.width / dim.height, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(dim.width, dim.height)
c.appendChild(renderer.domElement)


// Add Objects

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })

camera.position.z = 5;


class Cube {

  constructor({ geometry, material, scene }) {
    this.mesh = new THREE.Mesh(geometry, material)
    scene.add(this.mesh)
    this.racc = new Vector()
    this.acc = new Vector()
  }

  render() {
    const a = 0.05
    const r = 0.1

    this.acc.add(new Vector(random(a), random(a), random(a)))
    this.racc.add(new Vector(random(r), random(r), random(r)))

    this.mesh.position.add(this.acc)
    this.mesh.rotation.setFromVector3(this.racc)
  }
}

const cubes = Array(1000).fill().map(() => new Cube({ geometry, material, scene }))

// Render

function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)

  cubes.forEach(c => c.render())
}
render();
