<template>
  <div id="containerEarth"></div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";
import { getFlylineMaterial, parabola, curvePlotting } from "./texture"
import { FN_3dtiles, TilesPositionSizing } from "./fixGltf";

let Cesium: any = inject("$Cesium")

let geoCoordMap: any = {
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
  // 桂平: [110.08, 23.40],
  桂平: [110.04061649606402, 23.44348302026688],
}

onMounted(() => {
  init()
})

const init = async () => {
  let viewer = new Cesium.Viewer("containerEarth", {
    infoBox: false,
    shouldAnimate: true, //配置为自动播放动画
    baseLayerPicker: false,
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      // arcgis访问地址
      // url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer", 
      // url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",

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
      sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
      scene3DOnly: true, //每个几何实例将只能以3D渲染以节省GPU内存
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
  // viewer.scene.globe.depthTestAgainstTerrain = false;//地形遮挡效果开关，打开后地形会遮挡看不到的区域
  viewer.scene.globe.showGroundAtmosphere = false;
  viewer.scene.globe.enableLighting = true; //对大气和雾启用动态照明效果

  //配置地球相机初始位置
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      // 116.588627,
      // 40.078398,
      // 25000000.0
      114.2321730316198, 22.300849401205425, 1600
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0, 0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  });

  //设置默认的视角为中国
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西边经度
    89.5,
    // 南边维度
    20.4,
    // 东边经度
    110.4,
    // 北边维度
    61.2
  )

  //添加点位
  let geoCoordMapArr: any = []
  for (const key in geoCoordMap) {
    addPointPosition(geoCoordMap[key], viewer, key)
    geoCoordMapArr.push(geoCoordMap[key])
  }


  for (let i = 0, newi = 1; i < geoCoordMapArr.length; i++, newi++) {
    if (i % 2 == 1) continue
    if (newi == geoCoordMapArr.length) break
    //这里通过封装绘制曲线
    curvePlotting([...geoCoordMapArr[i], ...geoCoordMapArr[newi]], viewer)
  }

  //获取当前点击的经纬度
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(function (event) {
    let position = viewer.scene.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
    let cartographic = Cesium.Cartographic.fromCartesian(position)
    // 4.地理坐标（弧度制）转为经纬度坐标
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    let lng = Cesium.Math.toDegrees(cartographic.longitude);
    let height = cartographic.height;
    console.log("世界坐标", cartographic, position);
    console.log("当前经纬度坐标：", lng, lat, height);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  /*
   // 加载glb模型
   // 模型移动
   // let startPosition = new Cesium.Cartesian3.fromDegrees(110.04061649606402, 23.44348302026688);
   // let endPosition = new Cesium.Cartesian3.fromDegrees(110.04711609957151, 23.43851227376917);
   // let factor = 0;
   // let position = new Cesium.CallbackProperty(function () {
   //   if (factor > 5000) {
   //     factor = 0;
   //   }
   //   factor++;
   //   // 动态更新位置
   //   return Cesium.Cartesian3.lerp(startPosition, endPosition, factor / 5000.0, new Cesium.Cartesian3());
   // }, false)
 
   // //模型视角
   // let heading = Cesium.Math.toRadians(45.0);
   // let pitch = Cesium.Math.toRadians(15.0);
   // let roll = Cesium.Math.toRadians(0.0);
   // let orientation = Cesium.Transforms.headingPitchRollQuaternion(startPosition, new Cesium.HeadingPitchRoll(heading, pitch, roll));
 
   // const modelEntity = viewer.entities.add({
   //   name: "人物glb模型",
   //   orientation: orientation,
   //   position: position,
   //   model: {
   //     uri: '/models/Cesium_Man.glb',
   //     scale: 50.0,
   //     // minimumPixelSize: 256,
   //     // maxumunScale: 500,
   //     incrementallyLoadTextures: true, // 加载模型后纹理是否可以继续流入
   //     runAnimations: true, // 是否应启动模型中指定的glTF动画
   //     // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND //设置模型贴地,
   //   },
   // });
 
   // 聚焦模型
   // viewer.trackedEntity = modelEntity;
  */

  // 添加3D Tiles
  FN_3dtiles(Cesium)  //可支持3dtiles加载
  viewer.scene.globe.depthTestAgainstTerrain = false  //开启地下可视化
  //开启3DTiles 监视器
  // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)
  let Model032003 = await new Cesium.Cesium3DTileset({
    url: '/3dtiles/Tile_+032_+003/tileset.json',
    //控制切片视角显示的数量，可调整性能
    // maximumScreenSpaceError: 2,
    // maximumNumberOfLoadedTiles: 1000000,
  })
  viewer.scene.primitives.add(Model032003);
  // 显示3D Tiles包围盒
  // Model032003.debugShowContentBoundingVolume = true


  // 设定3D Tiles的位置及大小参数
  Model032003.readyPromise
    .then(function (currentModel) {
      let tx = 114.1782999999999
      let ty = 22.324031786505302
      TilesPositionSizing(tx, ty, Model032003, Cesium)
      viewer.zoomTo(Model032003, new Cesium.HeadingPitchRange(0, -1, 1000))
    })
    .otherwise(function (error) {
      new Error(error);
    })

  console.log("viewer", viewer)

}

//添加点位
const addPointPosition = (longitudeAndLatitude: string, viewer, name) => {
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