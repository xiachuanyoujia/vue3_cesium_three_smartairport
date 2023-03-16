// 可支持3dtiles加载
function FN_3dtiles(Cesium: any) {
  var fixGltf = function (gltf: any) {
    if (!gltf.extensionsUsed) {
      return;
    }

    var v = gltf.extensionsUsed.indexOf("KHR_technique_webgl");

    var t = gltf.extensionsRequired.indexOf("KHR_technique_webgl");

    // 中招了。。

    if (v !== -1) {
      gltf.extensionsRequired.splice(t, 1, "KHR_techniques_webgl");

      gltf.extensionsUsed.splice(v, 1, "KHR_techniques_webgl");

      gltf.extensions = gltf.extensions || {};

      gltf.extensions["KHR_techniques_webgl"] = {};

      gltf.extensions["KHR_techniques_webgl"].programs = gltf.programs;

      gltf.extensions["KHR_techniques_webgl"].shaders = gltf.shaders;

      gltf.extensions["KHR_techniques_webgl"].techniques = gltf.techniques;

      var techniques = gltf.extensions["KHR_techniques_webgl"].techniques;

      gltf.materials.forEach(function (mat: any, index: any) {
        gltf.materials[index].extensions["KHR_technique_webgl"].values =
          gltf.materials[index].values;

        gltf.materials[index].extensions["KHR_techniques_webgl"] =
          gltf.materials[index].extensions["KHR_technique_webgl"];

        var vtxfMaterialExtension =
          gltf.materials[index].extensions["KHR_techniques_webgl"];

        for (var value in vtxfMaterialExtension.values) {
          var us = techniques[vtxfMaterialExtension.technique].uniforms;

          for (var key in us) {
            if (us[key] === value) {
              vtxfMaterialExtension.values[key] =
                vtxfMaterialExtension.values[value];

              delete vtxfMaterialExtension.values[value];

              break;
            }
          }
        }
      });

      techniques.forEach(function (t: any) {
        for (var attribute in t.attributes) {
          var name = t.attributes[attribute];

          t.attributes[attribute] = t.parameters[name];
        }

        for (var uniform in t.uniforms) {
          var name = t.uniforms[uniform];

          t.uniforms[uniform] = t.parameters[name];
        }
      });
    }
  };
  Object.defineProperties(Cesium.Model.prototype, {
    _cachedGltf: {
      set: function (value) {
        this._vtxf_cachedGltf = value;

        if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
          fixGltf(this._vtxf_cachedGltf._gltf);
        }
      },

      get: function () {
        return this._vtxf_cachedGltf;
      },
    },
  });
}
//设定3D Tiles的位置及大小参数
function TilesPositionSizing(
  x: number,
  y: number,
  tiles: any,
  Cesium: any,
  paramsScale = 0.9
) {
  let params = {
    tx: x, // 模型中心x轴坐标（经度，单位：十进制）
    ty: y, // 模型中心y轴坐标（经度，单位：十进制）
    tz: 0, // 模型中心y轴坐标（高程，单位：米）
    rx: 0, // x轴（经度）方向旋转角度（单位：度）
    ry: 0, // y轴（纬度）方向旋转角度（单位：度）
    rz: 0, // z轴（高程）方向旋转角度（单位：度）
    scale: paramsScale, // 缩放比例
  };
  let position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
  let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  let scale = Cesium.Matrix4.fromUniformScale(params.scale);
  let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
  let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
  let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
  let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
  let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
  let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
  Cesium.Matrix4.multiply(mat, scale, mat);
  Cesium.Matrix4.multiply(mat, rotationX, mat);
  Cesium.Matrix4.multiply(mat, rotationY, mat);
  Cesium.Matrix4.multiply(mat, rotationZ, mat);
  tiles._root.transform = mat;
}
export { FN_3dtiles, TilesPositionSizing };
