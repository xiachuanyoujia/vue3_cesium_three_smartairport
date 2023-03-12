// 可支持3dtiles加载
function FN_3dtiles(Cesium:any) {
  var fixGltf = function (gltf:any) {
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

      gltf.materials.forEach(function (mat:any, index:any) {
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

      techniques.forEach(function (t:any) {
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
export { FN_3dtiles };
