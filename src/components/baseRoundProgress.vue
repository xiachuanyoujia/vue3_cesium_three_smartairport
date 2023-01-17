<template>
    <div>
        <v-chart :option="dataOption" style="width: 150px; height: 150px" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, toRefs, watch } from 'vue'

import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
use([PieChart, TitleComponent]);

const props = defineProps({
    curValue: Number,
})
const { curValue } = toRefs(props)

watch(
    () => curValue,
    (newV, oldV) => {
        console.log("当前值：" + curValue?.value)
        // console.log("变化前：" + oldV)
        // console.log("变化后：" + newV?.value)
    },
    {
        immediate: true, // 立即执行
        deep: true // 深度监听
    }
)

const dataOption = reactive(
    {
        backgroundColor: 'transparent',
        title: {
            text: '{a|' + curValue?.value + '}{c|\n%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich: {
                    a: {
                        fontSize: 36,
                        color: '#29EEF3',
                        fontFamily: 'Promethean',
                    },
                    c: {
                        fontSize: 20,
                        color: '#ffffff',
                    },
                },
            },
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['70%', '90%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    position: 'center',
                },
                data: [
                    {
                        value: curValue?.value,
                        name: '',
                        itemStyle: {
                            color: {
                                // 完成的圆环的颜色
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#A098FC', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.3,
                                        color: '#4386FA', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.6,
                                        color: '#4FADFD', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: '#0CD3DB', // 100% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#646CF9', // 100% 处的颜色
                                    },
                                ],
                            },
                        },
                    },
                    {
                        value: 100 - curValue?.value,
                        name: '',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: '#173164',
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                radius: ['66%', '70%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    position: 'center',
                },
                data: [
                    {
                        value: 100,
                        name: '',
                        itemStyle: {
                            color: {
                                // 完成的圆环的颜色
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#2d57a7', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#4657ae', // 100% 处的颜色
                                    },
                                ],
                            },
                        },
                    },
                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: '#173164',
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                radius: ['92%', '96%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    position: 'center',
                },
                data: [
                    {
                        value: 100,
                        name: '',
                        itemStyle: {
                            color: '#38537a',
                        },
                    },
                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: '#173164',
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                radius: ['98%', '100%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    position: 'center',
                },
                data: [
                    {
                        value: 100,
                        name: '',
                        itemStyle: {
                            color: '#1e2e4e',
                        },
                    },
                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: '#1e2e4e',
                        },
                    },
                ],
            },
        ],
    }
)

</script>
<style>

</style>