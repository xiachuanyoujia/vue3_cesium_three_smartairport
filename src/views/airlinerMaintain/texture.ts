import * as Cesium from "cesium";

//飞线材质
function getFlylineMaterial() {
  // 创建材质，在MaterialAppearance中若不添加基础材质，模型将会透明
  let material = new Cesium.Material({
    fabric: {
      type: "Color", // 大写
    },
  });
  material.uniforms.color = Cesium.Color.ORANGE;
  // 飞线效果-飞线间隔，宽度2
  let fragmentShaderSource = `         
                          varying vec2 v_st;    
                          varying float v_width;    
                          varying float v_polylineAngle;
                          varying vec4 v_positionEC;
                          varying vec3 v_normalEC;
                          void main()
                          {
                              vec2 st = v_st;
                              // 箭头飞线，宽度 8
                              float xx = fract(st.s*10.0 + st.t  - czm_frameNumber/60.0);
                              if (st.t<0.5) {
                                  xx = fract(st.s*10.0 - st.t - czm_frameNumber/60.0);
                              }
                              float r = 0.0;
                              float g = xx;
                              float b = xx;
                              float a = xx;
  
                              // 飞线边框
                              if (st.t>0.8||st.t<0.2) {
                                  g = 1.0;
                                  b = 1.0;
                                  a = 0.4;
                              }
  
                              gl_FragColor = vec4(r,g,b,a);
                          }
  
                  `;
  // 自定义材质
  const aper = new Cesium.PolylineMaterialAppearance({
    material: material,
    translucent: true,
    vertexShaderSource: `
                          #define CLIP_POLYLINE 
                          void clipLineSegmentToNearPlane(
                              vec3 p0,
                              vec3 p1,
                              out vec4 positionWC,
                              out bool clipped,
                              out bool culledByNearPlane,
                              out vec4 clippedPositionEC)
                          {
                              culledByNearPlane = false;
                              clipped = false;
                              vec3 p0ToP1 = p1 - p0;
                              float magnitude = length(p0ToP1);
                              vec3 direction = normalize(p0ToP1);
                              float endPoint0Distance =  czm_currentFrustum.x + p0.z;
                              float denominator = -direction.z;
                              if (endPoint0Distance > 0.0 && abs(denominator) < czm_epsilon7)
                              {
                                  culledByNearPlane = true;
                              }
                              else if (endPoint0Distance > 0.0)
                              {
                                  float t = endPoint0Distance / denominator;
                                  if (t < 0.0 || t > magnitude)
                                  {
                                      culledByNearPlane = true;
                                  }
                                  else
                                  {
                                      p0 = p0 + t * direction;
                                      p0.z = min(p0.z, -czm_currentFrustum.x);
                                      clipped = true;
                                  }
                              }
                              clippedPositionEC = vec4(p0, 1.0);
                              positionWC = czm_eyeToWindowCoordinates(clippedPositionEC);
                          }
                          vec4 getPolylineWindowCoordinatesEC(vec4 positionEC, vec4 prevEC, vec4 nextEC, float expandDirection, float width, bool usePrevious, out float angle)
                          {
                              #ifdef POLYLINE_DASH
                              vec4 positionWindow = czm_eyeToWindowCoordinates(positionEC);
                              vec4 previousWindow = czm_eyeToWindowCoordinates(prevEC);
                              vec4 nextWindow = czm_eyeToWindowCoordinates(nextEC);
                              vec2 lineDir;
                              if (usePrevious) {
                                  lineDir = normalize(positionWindow.xy - previousWindow.xy);
                              }
                              else {
                                  lineDir = normalize(nextWindow.xy - positionWindow.xy);
                              }
                              angle = atan(lineDir.x, lineDir.y) - 1.570796327;
                              angle = floor(angle / czm_piOverFour + 0.5) * czm_piOverFour;
                              #endif
                              vec4 clippedPrevWC, clippedPrevEC;
                              bool prevSegmentClipped, prevSegmentCulled;
                              clipLineSegmentToNearPlane(prevEC.xyz, positionEC.xyz, clippedPrevWC, prevSegmentClipped, prevSegmentCulled, clippedPrevEC);
                              vec4 clippedNextWC, clippedNextEC;
                              bool nextSegmentClipped, nextSegmentCulled;
                              clipLineSegmentToNearPlane(nextEC.xyz, positionEC.xyz, clippedNextWC, nextSegmentClipped, nextSegmentCulled, clippedNextEC);
                              bool segmentClipped, segmentCulled;
                              vec4 clippedPositionWC, clippedPositionEC;
                              clipLineSegmentToNearPlane(positionEC.xyz, usePrevious ? prevEC.xyz : nextEC.xyz, clippedPositionWC, segmentClipped, segmentCulled, clippedPositionEC);
                              if (segmentCulled)
                              {
                                  return vec4(0.0, 0.0, 0.0, 1.0);
                              }
                              vec2 directionToPrevWC = normalize(clippedPrevWC.xy - clippedPositionWC.xy);
                              vec2 directionToNextWC = normalize(clippedNextWC.xy - clippedPositionWC.xy);
                              if (prevSegmentCulled)
                              {
                                  directionToPrevWC = -directionToNextWC;
                              }
                              else if (nextSegmentCulled)
                              {
                                  directionToNextWC = -directionToPrevWC;
                              }
                              vec2 thisSegmentForwardWC, otherSegmentForwardWC;
                              if (usePrevious)
                              {
                                  thisSegmentForwardWC = -directionToPrevWC;
                                  otherSegmentForwardWC = directionToNextWC;
                              }
                              else
                              {
                                  thisSegmentForwardWC = directionToNextWC;
                                  otherSegmentForwardWC =  -directionToPrevWC;
                              }
                              vec2 thisSegmentLeftWC = vec2(-thisSegmentForwardWC.y, thisSegmentForwardWC.x);
                              vec2 leftWC = thisSegmentLeftWC;
                              float expandWidth = width * 0.5;
                              if (!czm_equalsEpsilon(prevEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1) && !czm_equalsEpsilon(nextEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1))
                              {
                                  vec2 otherSegmentLeftWC = vec2(-otherSegmentForwardWC.y, otherSegmentForwardWC.x);
                                  vec2 leftSumWC = thisSegmentLeftWC + otherSegmentLeftWC;
                                  float leftSumLength = length(leftSumWC);
                                  leftWC = leftSumLength < czm_epsilon6 ? thisSegmentLeftWC : (leftSumWC / leftSumLength);
                                  vec2 u = -thisSegmentForwardWC;
                                  vec2 v = leftWC;
                                  float sinAngle = abs(u.x * v.y - u.y * v.x);
                                  expandWidth = clamp(expandWidth / sinAngle, 0.0, width * 2.0);
                              }
                              vec2 offset = leftWC * expandDirection * expandWidth * czm_pixelRatio;
                              return vec4(clippedPositionWC.xy + offset, -clippedPositionWC.z, 1.0) * (czm_projection * clippedPositionEC).w;
                          }
                          vec4 getPolylineWindowCoordinates(vec4 position, vec4 previous, vec4 next, float expandDirection, float width, bool usePrevious, out float angle)
                          {
                              vec4 positionEC = czm_modelViewRelativeToEye * position;
                              vec4 prevEC = czm_modelViewRelativeToEye * previous;
                              vec4 nextEC = czm_modelViewRelativeToEye * next;
                              return getPolylineWindowCoordinatesEC(positionEC, prevEC, nextEC, expandDirection, width, usePrevious, angle);
                          }
  
                          attribute vec3 position3DHigh;
                          attribute vec3 position3DLow;
                          attribute vec3 prevPosition3DHigh;
                          attribute vec3 prevPosition3DLow;
                          attribute vec3 nextPosition3DHigh;
                          attribute vec3 nextPosition3DLow;
                          attribute vec2 expandAndWidth;
                          attribute vec2 st;
                          attribute float batchId;
  
                          varying float v_width;
                          varying vec2 v_st;
                          varying float v_polylineAngle;
                          
                          varying vec4 v_positionEC;
                          varying vec3 v_normalEC;
                          void main()
                          {
                          float expandDir = expandAndWidth.x;
                          float width = abs(expandAndWidth.y) + 0.5;
                          bool usePrev = expandAndWidth.y < 0.0;
  
                          vec4 p = czm_computePosition();
                          vec4 prev = czm_computePrevPosition();
                          vec4 next = czm_computeNextPosition();
                          
                          float angle;
                          vec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, angle);
                          gl_Position = czm_viewportOrthographic * positionWC;
                          
                          v_width = width;
                          v_st.s = st.s;
                          v_st.t = st.t;
                          // v_st.t = czm_writeNonPerspective(st.t, gl_Position.w);
                          v_polylineAngle = angle;
  
  
                          
                          vec4 eyePosition = czm_modelViewRelativeToEye * p;
                          v_positionEC =  czm_inverseModelView * eyePosition;      // position in eye coordinates
                          //v_normalEC = czm_normal * normal;                         // normal in eye coordinates
                          }
  
                      `,
    fragmentShaderSource: fragmentShaderSource,
  });
  return aper;
}

//抛物线绘制
function parabola(twoPoints: any) {
  //抛物线绘制
  let s: any = [];
  let startPoint = [twoPoints[0], twoPoints[1], 0]; //起点的经度、纬度
  s = s.concat(startPoint);
  let step = 80; //线的多少，越多则越平滑(但过多浏览器缓存也会占用越多)
  let heightProportion = 0.125; //最高点和总距离的比值
  let dLon = (twoPoints[2] - startPoint[0]) / step; //经度差值
  let dLat = (twoPoints[3] - startPoint[1]) / step; //纬度差值
  let deltaLon = dLon * Math.abs(111000 * Math.cos(twoPoints[1])); //经度差(米级)
  let deltaLat = dLat * 111000; //纬度差(米),1纬度相差约111000米
  let endPoint = [0, 0, 0]; //定义一个端点（后面将进行startPoint和endPoint两点画线）
  let heigh =
    Number(
      (
        step *
        Math.sqrt(deltaLon * deltaLon + deltaLat * deltaLat) *
        heightProportion
      ).toFixed(0)
    ) * 2;
  let x2 = 10000 * Math.sqrt(dLon * dLon + dLat * dLat); //小数点扩大10000倍，提高精确度
  let a = heigh / (x2 * x2);
  function y(x: any, height: any) {
    return height - a * x * x;
  }
  for (var i = 1; i <= step; i++) {
    //逐“帧”画线
    endPoint[0] = startPoint[0] + dLon; //更新end点经度
    endPoint[1] = startPoint[1] + dLat; //更新end点纬度
    let x = x2 * ((2 * i) / step - 1); //求抛物线函数x
    endPoint[2] = Number(y(x, heigh).toFixed(0)) * 1; //求end点高度
    s = s.concat(endPoint);

    // end点变为start点
    startPoint[0] = endPoint[0];
    startPoint[1] = endPoint[1];
    startPoint[2] = endPoint[2];
  }
  return Cesium.Cartesian3.fromDegreesArrayHeights(s);
}

//封装抛物线并添加至场景中
function curvePlotting(longitudeAndLatitude: any, viewer: any) {
//   console.log("texture里的viewer", viewer);
  //这里通过算法得到曲线
  let mm = parabola(longitudeAndLatitude);
  let polyline = new Cesium.PolylineGeometry({
    positions: mm,
    width: 2,
  });

  const instance = new Cesium.GeometryInstance({
    geometry: polyline,
    id: "flyline",
  });

  //添加至场景
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: [instance],
      appearance: getFlylineMaterial(),
      releaseGeometryInstances: false,
      compressVertices: false,
    })
  );
}
export { getFlylineMaterial, parabola, curvePlotting };
