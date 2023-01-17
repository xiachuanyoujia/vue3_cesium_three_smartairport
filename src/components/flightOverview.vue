<template>
    <div id="flyOverview"></div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'

import * as echarts from 'echarts/core';
import { use } from 'echarts/core';
import { GeoComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { LinesChart, EffectScatterChart } from 'echarts/charts';
import datajson from '../assets/json/world.json';

use([CanvasRenderer, GeoComponent, LinesChart, EffectScatterChart]);
echarts.registerMap('world', datajson)

onMounted(() => {
    init()
})

const flyOverview = reactive(
    {
        backgroundColor: 'transparent',
        geo: {
            map: 'world',
            zoom: 1.3,
            label: {
                emphasis: {
                    show: false,
                },
            },
            roam: true,
            itemStyle: {
                areaColor: '#16213e',
                borderColor: '#5b66a1',
                emphasis: {
                    areaColor: '#2a333d',
                },
            },
            regions: [
                {
                    name: 'China',
                    itemStyle: {
                        opacity: 0.4, // 透明度
                        borderColor: '#ffd591', // 省份界线颜色
                        borderWidth: 3, // 省份界线的宽度
                        areaColor: '#485377', // 整个省份的颜色
                    },
                },
            ],
        },
    }
)

const trackData = reactive(
    [
        //这是两地的数据
        [
            {
                name: '',
            },
            {
                name: '温哥华',
                icon: 'img_wengehua.png',
            },
        ],
        [
            {
                name: '温哥华',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '莫斯科',
                icon: 'img_mosike.png',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '伦敦',
                icon: 'img_lundun.png',
            },
        ],
        [
            {
                name: '',
            },
            {
                name: '华盛顿',
                icon: 'img_huashendun.png',
            },
        ],
        [
            {
                name: '华盛顿',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '',
            },
            {
                name: '圣地亚哥',
                icon: 'img_shendiyage.png',
            },
        ],
        [
            {
                name: '圣地亚哥',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '巴西利亚',
                icon: 'img_baxiliya.png',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '内罗华',
                icon: 'img_neihualuo.png',
            },
        ],
        [
            {
                name: '',
            },
            {
                name: '开普敦',
                icon: 'img_kaipudun.png',
            },
        ],
        [
            {
                name: '开普敦',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '',
            },
            {
                name: '曼谷',
                icon: 'img_mangu.png',
            },
        ],
        [
            {
                name: '曼谷',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '重庆',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '香港',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '上海',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '首尔',
                icon: 'img_shouer.png',
            },
        ],
        [
            {
                name: '',
            },
            {
                name: '悉尼',
                icon: 'img_xini.png',
            },
        ],
        [
            {
                name: '悉尼',
            },
            {
                name: '北京',
                icon: '',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '东京',
                icon: 'img_dongjing.png',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '鄂霍次克',
                icon: 'img_mosike.png',
            },
        ],
        [
            {
                name: '北京',
            },
            {
                name: '斯里巴加湾市',
                icon: 'img_silibajiawanshi.png',
            },
        ],
    ]
)
const geoCoordMap = reactive(
    {
        //地理坐标
        北京: [116.4551, 40.2539],
        温哥华: [-123.181512, 49.196692],
        莫斯科: [37.623638, 55.752055],
        伦敦: [0.049518, 51.504841],
        华盛顿: [-77.456536, 38.953115],
        圣地亚哥: [-117.193305, 32.733801],
        巴西利亚: [-47.917233, -15.869736],
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
)

// 坐标转换
const convertData = (data) => {
    let res = []
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
            });
        }
    }
    return res;
}

const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

const init = () => {
    let series = reactive(
        [
            {
                name: 'track',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3,
                },
                lineStyle: {
                    color: '#a6c84c',
                    width: 0,
                    curveness: 0.2,
                },
                data: convertData(trackData),
            },
            {
                name: 'track',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15,
                },
                lineStyle: {
                    color: '#a6c84c',
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2,
                },
                data: convertData(trackData),
            },
            {
                name: 'track',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke',
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                },
                // symbol: function (val) {
                //     return 'image://./imgs/countryIcon/' + val[2];
                // },
                symbolSize: 15,
                itemStyle: {
                    color: '#a6c84c',
                },
                data: trackData.map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].icon]),
                    };
                }),
            },
        ]
    )

    flyOverview.series = series;
    let myChart = echarts.init(document.getElementById('flyOverview'))
    myChart.setOption(flyOverview);
}



</script>
<style scoped lang="less">
#flyOverview {
    width: 1090px;
    height: 1000px;
}
</style>