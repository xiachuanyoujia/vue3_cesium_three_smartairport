<template>
  <div id="containerEarth"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";
import { getFlylineMaterial,parabola } from "./texture"

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

  //这里通过算法得到曲线
  let mm = parabola([-75, 39, -175, 39])
  var polyline = new Cesium.PolylineGeometry({
    positions: mm,
    width: 2
  });
  const instance = new Cesium.GeometryInstance({
    geometry: polyline,
    id: 'flyline',
  })

  //添加至场景
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: [instance],
      appearance: getFlylineMaterial(),
      releaseGeometryInstances: false,
      compressVertices: false,
    })
  )

  console.log("viewer", viewer)

}

// const parabola = (twoPoints) => {  //抛物线绘制
//   let s = []
//   let startPoint = [twoPoints[0], twoPoints[1], 0]; //起点的经度、纬度
//   s = s.concat(startPoint)
//   let step = 80;  //线的多少，越多则越平滑(但过多浏览器缓存也会占用越多)
//   let heightProportion = 0.125; //最高点和总距离的比值
//   let dLon = (twoPoints[2] - startPoint[0]) / step;  //经度差值
//   let dLat = (twoPoints[3] - startPoint[1]) / step;  //纬度差值
//   let deltaLon = dLon * Math.abs(111000 * Math.cos(twoPoints[1]));  //经度差(米级)
//   let deltaLat = dLat * 111000;  //纬度差(米),1纬度相差约111000米
//   let endPoint = [0, 0, 0];  //定义一个端点（后面将进行startPoint和endPoint两点画线）
//   let heigh = (step * Math.sqrt(deltaLon * deltaLon + deltaLat * deltaLat) * heightProportion).toFixed(0) * 2;
//   let x2 = (10000 * Math.sqrt(dLon * dLon + dLat * dLat)); //小数点扩大10000倍，提高精确度
//   let a = (heigh / (x2 * x2));
//   function y(x, height) { return height - a * x * x; }
//   for (var i = 1; i <= step; i++) {  //逐“帧”画线
//     endPoint[0] = startPoint[0] + dLon; //更新end点经度
//     endPoint[1] = startPoint[1] + dLat; //更新end点纬度
//     let x = x2 * (2 * i / step - 1);  //求抛物线函数x
//     endPoint[2] = (y(x, heigh)).toFixed(0) * 1;  //求end点高度
//     s = s.concat(endPoint)

//     // end点变为start点
//     startPoint[0] = endPoint[0];
//     startPoint[1] = endPoint[1];
//     startPoint[2] = endPoint[2];
//   }
//   return Cesium.Cartesian3.fromDegreesArrayHeights(s)
// }


</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
}
</style>