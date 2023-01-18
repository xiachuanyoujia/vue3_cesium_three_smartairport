<template>
    <div>
        <v-chart :option="dataOption" style="width: 100%; height: 200px" />
        <div class="xAxis">{{ xTitle }}</div>
        <div class="yAxis">{{ yTitle }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, defineProps, watch } from 'vue'

import * as echarts from 'echarts/core';
import { use } from 'echarts/core';
import { BarChart, PictorialBarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, DataZoomComponent } from 'echarts/components';
use([BarChart, PictorialBarChart, TooltipComponent, GridComponent, DataZoomComponent]);

const props = defineProps({
    dataX: Array,
    dataY: Array,
})
const { dataX, dataY } = toRefs(props)

const yTitle = '架次(万)'
const xTitle = '月'

const dataOption = reactive(
    {
        backgroundColor: 'transparent',
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            top: '15%',
            right: '10%',
            left: '15%',
            bottom: '10%',
        },
        xAxis: [
            {
                type: 'category',
                data: dataX?.value,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(66, 192, 255, .3)',
                    },
                },
                axisLabel: {
                    interval: 0,
                    margin: 10,
                    color: '#05D5FF',
                    fontSize: 11,
                },
                axisTick: {
                    //刻度
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                show: false,
                axisLabel: {
                    padding: [3, 0, 0, 0],
                    formatter: '{value}',
                    color: 'rgba(95, 187, 235, 1)',
                    fontSize: 11,
                },
                axisTick: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(66, 192, 255, .3)',
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0)',
                    },
                },
            },
            {
                position: 'left',
                axisLabel: {
                    padding: [3, 0, 0, 0],
                    formatter: '{value}',
                    color: 'rgba(95, 187, 235, 1)',
                    fontSize: 11,
                },
                data: dataY?.value,
                axisTick: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(66, 192, 255, .3)',
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0)',
                    },
                },
            },
        ],
        series: [
            {
                type: 'bar',
                data: dataY?.value,
                barWidth: '10',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: 'rgba(254,69,7, 1)', // 0% 处的颜色
                            },
                            {
                                offset: 0.18,
                                color: 'rgba(100,90,255, 1)', // 100% 处的颜色
                            },
                            {
                                offset: 0.44,
                                color: 'rgba(72,133,250, 1)', // 100% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(64, 131, 252, 0)', // 100% 处的颜色
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(5, 213, 255, 1)',
                    shadowBlur: 4,
                },
                label: {
                    show: true,
                    lineHeight: 10,
                    formatter: '{c}',
                    position: 'top',
                    color: '#fff',
                    fontSize: 10,
                },
            },
            {
                type: 'pictorialBar',
                symbol: 'rect',
                symbolSize: [10, 2],
                symbolOffset: [0, -3],
                symbolPosition: 'end',
                data: dataY?.value,
                itemStyle: {
                    color: '#FFFFFF',
                },
            },
        ],
    }
)

// watch(
//     () => dataX,
//     (newV, oldV) => {
//         console.log("dataX当前值：" + dataX?.value)
//         dataOption.xAxis[0].data = oldV;
//         // console.log("变化前：" + oldV)
//         // console.log("变化后：" + newV?.value)
//     },
//     {
//         immediate: true, // 立即执行
//         deep: true // 深度监听
//     }
// )
// watch(
//     () => dataY,
//     (newV, oldV) => {
//         console.log("dataY当前值：" + dataY?.value)
//         var nLen = newV?.value.length;
//         var arrTemp = [];
//         for (var n = 0; n < nLen; ++n) {
//             arrTemp.push(Math.floor(newV[n] / 10000));
//         }
//         dataOption.yAxis[0].data = arrTemp;
//         // console.log("变化前：" + oldV)
//         // console.log("变化后：" + newV?.value)
//     },
//     {
//         immediate: true, // 立即执行
//         deep: true // 深度监听
//     }
// )

</script>
<style scoped lang="less">
.yAxis {
  position: absolute;
  left: 0px;
  top: 38px;
  width: 52px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #dedae4;
  line-height: 20px;
  text-align: left;
}

.xAxis {
  position: absolute;
  right: 10px;
  bottom: 66px;
  width: 14px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #dedae4;
  line-height: 20px;
}
</style>