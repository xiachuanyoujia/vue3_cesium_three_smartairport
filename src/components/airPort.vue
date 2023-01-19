<template>
    <div style="height:100vh;" id="container"></div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, render } from 'vue'
import * as THREE from "three"
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let scene = null
let renderer = null
let camera = null
let controls = null

let gltfLoader = null
let dracoLoader = null

const dom = ref()

onMounted(() => {
    init()
    // addTestCube()
    addAirort()
    addLights()

    renderScene()
    addAxesHelper()
    window.addEventListener('resize', onWindowResize)


})

const init = () => {
    dom.value = document.getElementById('container')
    scene = new THREE.Scene()
    renderer = new THREE.WebGL1Renderer()
    renderer.setSize(dom.value.offsetWidth, dom.value.offsetHeight)

    camera = new THREE.PerspectiveCamera(45, dom.value.offsetWidth / dom.value.offsetHeight, 0.1, 1000)
    camera.position.z = 5
    dom.value.appendChild(renderer.domElement)

    gltfLoader = new GLTFLoader();
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('examples/js/libs/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    controls = new OrbitControls(camera, renderer.domElement)
}

//测试立方体
const addTestCube = () => {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    })
    const cube = new Mesh(boxGeometry, boxMaterial)
    cube.position.set(1, 1, 1)
    scene.add(cube)
}

//添加模型
const addAirort = () => {
    //热气球缆车
    let balloonCableCar = new Promise((resolve) => {
        gltfLoader.load('/models/CesiumBalloon.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    })

    //四翼桨机
    let fourWingsPropeller = new Promise((resolve) => {
        gltfLoader.load('/models/CesiumDrone.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    Promise.all([balloonCableCar, fourWingsPropeller]).then((resolve) => {
        scene.add(resolve[0])
        scene.add(resolve[1])
    }).catch(err => {
        console.log("添加模型抛错err", err)
    })

}

//添加环境光
const addLights = () => {
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
    scene.add(hemiLight)

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0xffffff, 1)
    scene.add(directionalLight)
}


//绘制场景
function renderScene() {
    requestAnimationFrame(renderScene.bind(renderScene))
    renderer.render(scene, camera)

    controls.update()
}

//场景自适应
const onWindowResize = () => {
    camera.aspect = dom.value.offsetWidth / dom.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(dom.value.offsetWidth, dom.value.offsetHeight)
}

//添加坐标轴
const addAxesHelper = () => {
    let axesHelper = new THREE.AxesHelper(300)
    axesHelper.position.set(0, 0, 0)
    scene.add(axesHelper)
}

</script>
<style>

</style>


