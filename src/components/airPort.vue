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

let airportGltf = null
let mixerScene = null

let clock = new THREE.Clock()
let previousTime = null

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
        // alpha: true,
        logarithmicDepthBuffer: true,
    })
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(dom.value.offsetWidth, dom.value.offsetHeight)

    camera = new THREE.PerspectiveCamera(45, dom.value.offsetWidth / dom.value.offsetHeight, 0.1, 1000)

    //设置相机初始位置
    camera.position.set(3.03079142090544, 1.9848119701735485, 3.0720229175612066)

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
            // console.log("热气球缆车", gltf.animations)
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

            console.log("四翼桨机", gltf.animations)
            // airportGltf = gltf
            // mixerScene = new THREE.AnimationMixer(airportGltf.scene)

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
            console.log("汽车", gltf.animations)

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
            console.log("飞机", gltf.animations)

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
            console.log("人物", gltf.animations)

            airportGltf = gltf
            mixerScene = new THREE.AnimationMixer(airportGltf.scene)
            // console.log("人物动画", mixerScene)

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
            console.log("装甲车", gltf.animations)

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
            // console.log("哨塔", gltf.animations)

        })
    });

    Promise.all([balloonCableCar, fourWingsPropeller, car, aircraft, figure, armoredCar, tower]).then((resolve) => {
        // scene.add(resolve[0])
        // scene.add(resolve[1])
        // scene.add(resolve[2])
        // scene.add(resolve[3])
        scene.add(resolve[4])
        // scene.add(resolve[5])
        // scene.add(resolve[6])

        playSceneAnimation()

    }).catch(err => {
        console.log("添加模型抛错err", err)
    })
}

//播放场景动画
const playSceneAnimation = () => {
    const nLen = airportGltf.animations.length
    // console.log(nLen)
    for (let n = 0; n < nLen; ++n) {
        const action = mixerScene.clipAction(airportGltf.animations[n])
        action.paused = false
        action.play()
    }
}
//暂停场景动画
const stopSceneAnimation = () => {
    const nLen = airportGltf.animations.length
    // console.log(nLen)
    for (let n = 0; n < nLen; ++n) {
        const action = mixerScene.clipAction(airportGltf.animations[n])
        action.paused = true
    }
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
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    requestAnimationFrame(renderScene.bind(renderScene))
    renderer.render(scene, camera)

    controls.update()

    if (mixerScene) {
        mixerScene.update(deltaTime)
    }

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


