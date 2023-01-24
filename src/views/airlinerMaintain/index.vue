<template>
  <div id="containerEarth"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";

let Cesium = inject("$Cesium")

onMounted(() => {
  init()
})

let start = null
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