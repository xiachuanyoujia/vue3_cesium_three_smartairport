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
    renderer = new THREE.WebGL1Renderer({
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: true,
    })
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(dom.value.offsetWidth, dom.value.offsetHeight)

    camera = new THREE.PerspectiveCamera(45, dom.value.offsetWidth / dom.value.offsetHeight, 0.1, 1000)
    
    //设置相机初始位置
    camera.position.set(-70.87587075520202, 11.950535661109116, 4.246782867351376) 

    dom.value.appendChild(renderer.domElement)

    gltfLoader = new GLTFLoader();
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('examples/js/libs/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    controls = new OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = 0.4 * Math.PI;

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

    //汽车
    let car = new Promise((resolve) => {
        gltfLoader.load('/models/CesiumMilkTruck.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    //飞机
    let aircraft = new Promise((resolve) => {
        gltfLoader.load('/models/Cesium_Air.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    //人物
    let figure = new Promise((resolve) => {
        gltfLoader.load('/models/Cesium_Man.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    //装甲车
    let armoredCar = new Promise((resolve) => {
        gltfLoader.load('/models/GroundVehicle.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    //哨塔
    let tower = new Promise((resolve) => {
        gltfLoader.load('/models/Wood_Tower.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material.alphaTest = 1
                    child.material.side = THREE.DoubleSide;
                }
            })
            resolve(gltf.scene);
        })
    });

    Promise.all([balloonCableCar, fourWingsPropeller,car,aircraft,figure,armoredCar,tower]).then((resolve) => {
        scene.add(resolve[0])
        scene.add(resolve[1])
        scene.add(resolve[2])
        scene.add(resolve[3])
        scene.add(resolve[4])
        scene.add(resolve[5])
        scene.add(resolve[6])
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

    // console.log("相机位置", camera.position)
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


