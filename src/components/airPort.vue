<template>
    <div style="height:100vh;" id="container"></div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, render } from 'vue'
import * as THREE from "three"
import { Mesh } from 'three';

let scene = null
let renderer = null
let camera = null

const dom = ref()

onMounted(() => {
    init()
    addTestCube()
    renderScene()
    addAxesHelper()
    window.addEventListener('resize', onWindowResize)
})

const init = () => {
    dom.value = document.getElementById('container')
    console.log("dom", dom.value)
    console.log(dom.value.offsetHeight)
    scene = new THREE.Scene()
    renderer = new THREE.WebGL1Renderer()
    renderer.setSize(dom.value.offsetWidth, dom.value.offsetHeight)

    camera = new THREE.PerspectiveCamera(45, dom.value.offsetWidth / dom.value.offsetHeight, 0.1, 1000)
    camera.position.z = 5
    dom.value.appendChild(renderer.domElement)
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

//绘制场景
function renderScene() {
    requestAnimationFrame(renderScene.bind(renderScene))
    renderer.render(scene, camera)
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
    axesHelper.position.set(0,0,0)
    scene.add(axesHelper)
}

</script>
<style>

</style>


