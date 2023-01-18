<template>
    <div>
        <v-chart :option="dataOption" style="width: 100%; height: 100%" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts/core';

let colorList = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(63,130,252,0)',
        },
        {
            offset: 1,
            color: 'rgba(63,130,252,1)',
        },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(160,187,255,0)',
        },
        {
            offset: 1,
            color: 'rgba(160,187,255,1)',
        },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(63,131,252,0)',
        },
        {
            offset: 1,
            color: 'rgba(63,131,252,1)',
        },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(100,253,255,0)',
        },
        {
            offset: 1,
            color: 'rgba(100,253,255,1)',
        },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(132,123,255,0)',
        },
        {
            offset: 1,
            color: 'rgba(132,123,255,1)',
        },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(147,149,210,0)',
        },
        {
            offset: 1,
            color: 'rgba(147,149,210,1)',
        },
    ]),
]

const props = defineProps({
    pieData: Array,
})
const { pieData } = toRefs(props)

const dataOption = reactive(
    {
        backgroundColor: 'transparent',
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['48%', '60%'],
                clockwise: true,
                avoidLabelOverlap: true,
                hoverOffset: 15,
                itemStyle: {
                    color: function (params) {
                        return colorList[params.dataIndex];
                    },
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{a|{b}\n{c}}\n{hr|}',
                    textStyle: {
                        rich: {
                            hr: {
                                backgroundColor: 'transparent',
                                borderRadius: 3,
                                width: 3,
                                height: 3,
                                padding: [0, 0, 0, 0],
                            },
                            a: {
                                padding: [0, -30, 0, -30],
                                fontFamily: 'BigYoungMediumGB20',
                                color: '#DEDAE4',
                                fontSize: 14,
                            },
                        },
                    },
                },
                labelLine: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1,
                    },
                },
                data: pieData,
            },
        ],
    }
)

onMounted(() => {
    dataOption.series[0].data = pieData
})

</script>
<style>

</style>