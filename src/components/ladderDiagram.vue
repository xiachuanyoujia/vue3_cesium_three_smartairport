<template>
    <div>
        <v-chart :option="dataOption" style="width: 100%; height: 100%" />
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts/core';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
use([LineChart, LegendComponent]);

const props = defineProps({
    xData: Array,
    yNormalData: Array,
    yAbnormalData: Array,
})
const { xData, yNormalData, yAbnormalData } = toRefs(props)

onMounted(() => {
    dataOption.xAxis.data = xData;
    dataOption.series[0].data = yNormalData;
    dataOption.series[1].data = yAbnormalData;
})

const dataOption = {
    legend: {
        //配置图例组件
        data: ['正常', '异常'],
        right: 40, //适当调整工具框的left位置
        top: 3, //适当调整工具框的top位置
        color: '#DEDAE4',
        fontFamily: 'BigYoungMediumGB20',
        fontSize: 14,
        lineStyle: {
            type: 'solid',
        },
    },
    grid: {
        //配置网格组件
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        //配置X轴坐标系
        type: 'category',
        data: xData,
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: '#DEDAE4',
            fontSize: 14,
        },
    },
    yAxis: {
        //配置Y轴坐标系
        type: 'value',
        axisLine: {
            show: true,
        },
        splitLine: {
            lineStyle: {
                color: '#313d5b',
                type: 'dashed',
            },
        },
        axisLabel: {
            color: '#DEDAE4',
            fontSize: 14,
        },
    },
    series: [
        //配置数据系列
        {
            name: '正常',
            type: 'line', //设置指定显示为折线
            step: true, //设置指定折线的显示样式
            data: yNormalData,
            showSymbol: false,
            lineStyle: {
                color: '#4071FF',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(60, 107, 239, 0.5)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(60, 106, 239, 0)',
                    },
                ]),
            },
        },
        {
            name: '异常',
            type: 'line', //设置指定显示为折线
            step: true, //设置指定折线的显示样式
            data: yAbnormalData,
            showSymbol: false,
            lineStyle: {
                color: '#FE4507',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(254, 69, 7, 0.4)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(244, 70, 9, 0)',
                    },
                ]),
            },
        },
    ],
}

</script>
<style>

</style>