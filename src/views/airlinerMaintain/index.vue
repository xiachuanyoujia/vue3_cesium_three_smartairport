<template>
    <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";

let Cesium = inject("$Cesium")

onMounted(()=>{
    let viewer = new Cesium.Viewer("cesiumContainer", {
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
          }),
        });
        console.info(viewer)
})

</script>

<style>
#cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>