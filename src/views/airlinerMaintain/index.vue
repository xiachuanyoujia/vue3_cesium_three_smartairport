<template>
  <div id="containerEarth"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";
import { getFlylineMaterial, parabola, curvePlotting } from "./texture"

let Cesium = inject("$Cesium")

let geoCoordMap = {
  //地理坐标
  北京: [116.4551, 40.2539],
  巴西利亚: [-47.917233, -15.869736],
  温哥华: [-123.181512, 49.196692],
  莫斯科: [37.623638, 55.752055],
  伦敦: [0.049518, 51.504841],
  华盛顿: [-77.456536, 38.953115],
  圣地亚哥: [-117.193305, 32.733801],
  内罗华: [-43.249422, -22.813409],
  开普敦: [18.602085, -33.971463],
  曼谷: [100.750101, 13.689969],
  重庆: [106.644156, 29.72263],
  香港: [113.945136, 22.317638],
  上海: [121.813481, 31.156682],
  斯里巴加湾市: [23.973313, 56.922652],
  首尔: [126.801518, 37.557968],
  悉尼: [151.187692, -33.92881],
  东京: [140.39285, 35.771986],
  鄂霍次克: [143.246185, 59.362988],
}

onMounted(() => {
  init()
})

const init = () => {
  let viewer = new Cesium.Viewer("containerEarth", {
    infoBox: false,
    baseLayerPicker: false,
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      // arcgis访问地址
      // url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer", 
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
      // url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",  

      orderIndependentTranslucency: false,
      homeButton: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      geocoder: false,
      infoBox: false,
      fullscreenButton: false,
      timeline: true,
      animation: true,
      sceneModePicker: false,
      selectionIndicator: false,
      shouldAnimate: true,
      navigationInstructionsInitiallyVisible: false,
      navigation: false,
      sceneMode: 3,
      scene3DOnly: false,
      contextOptions: {
        requestWebgl2: true,
        webgl: {
          alpha: true,
        },
      },
    }),
  });
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.skyBox.show = false;
  viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
  viewer._cesiumWidget._creditContainer.style.display = "none";
  viewer.animation.container.style.display = "none";
  viewer.timeline.container.style.display = "none";
  viewer.scene.globe.depthTestAgainstTerrain = false;
  viewer.scene.globe.showGroundAtmosphere = false;

  //配置地球相机初始位置
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      116.588627,
      40.078398,
      40000000.0
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0, 0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  });

  //添加点位
  let geoCoordMapArr = []
  for (const key in geoCoordMap) {
    addPointPosition(geoCoordMap[key], viewer, key)
    geoCoordMapArr.push(geoCoordMap[key])
  }

  for (let i = 0, newi = 1; i < geoCoordMapArr.length; i++, newi++) {
    if (i % 2 == 1) continue
    //这里通过封装绘制曲线
    curvePlotting([...geoCoordMapArr[i], ...geoCoordMapArr[newi]], viewer)
  }




  console.log("viewer", viewer)

}

//添加点位
const addPointPosition = (longitudeAndLatitude, viewer, name) => {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(...longitudeAndLatitude),
    point: {
      color: Cesium.Color.RED,    //点位颜色
      pixelSize: 6                //像素点大小
    },
    label: {
      text: name,
      font: '10pt Source Han Sans CN',    //字体样式
      fillColor: Cesium.Color.BLUE,        //字体颜色
      // backgroundColor: Cesium.Color.AQUA,    //背景颜色
      showBackground: false,                //是否显示背景颜色
      style: Cesium.LabelStyle.FILL,        //label样式
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平位置
      pixelOffset: new Cesium.Cartesian2(10, 0)            //偏移
    }
  });
}

</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
}
</style>