<template>
  <div id="containerEarth"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";
import { getFlylineMaterial, parabola, curvePlotting } from "./texture"

let Cesium = inject("$Cesium")

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
  // var entity = viewer.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(120.9677706, 30.7985748, 2.61),
  //   point: {
  //     color: Cesium.Color.RED,    //点位颜色
  //     pixelSize: 10                //像素点大小
  //   },
  //   label: {
  //     text: '测试名称',
  //     font: '14pt Source Han Sans CN',    //字体样式
  //     fillColor: Cesium.Color.BLACK,        //字体颜色
  //     backgroundColor: Cesium.Color.AQUA,    //背景颜色
  //     showBackground: true,                //是否显示背景颜色
  //     style: Cesium.LabelStyle.FILL,        //label样式
  //     outlineWidth: 2,
  //     verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
  //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平位置
  //     pixelOffset: new Cesium.Cartesian2(10, 0)            //偏移
  //   }
  // });
  // console.log(entity);

  //这里通过封装绘制曲线
  curvePlotting([-75, 39, -175, 39], viewer)

  console.log("viewer", viewer)

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