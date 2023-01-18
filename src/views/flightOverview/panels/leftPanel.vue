<template>
    <div style="position: relative;">
        <flightOverview class="flightOverview" />

        <!-- 航班概览 -->
        <div class="Overview OverviewTrendreason">
            <div class="OverviewData">
                <span>延误航班</span>
                <span>{{ delayNun }}</span>
                <span>取消航班</span>
                <span>{{ cancelNum }}</span>
                <span>今日航班</span>
                <span>{{ allNum }}</span>
            </div>
            <div>
                <baseRoundProgress :curValue="punctualityRate" />
                <span>今日航班准点率</span>
            </div>
        </div>
        <!-- 今年航班起降架次趋势 -->
        <div class="Trend OverviewTrendreason">
            <div class="title">今年航班起降架次趋势</div>
            <baseHistogram class="baseHistogram" :dataX="month" :dataY="flightCount" />
        </div>
        <!-- 飞机延误原因 -->
        <div class="reason OverviewTrendreason">
            <div class="title">飞机延误原因</div>
            <div></div>
            <basePiechart class="basePiechart" :pieData="reasonData"></basePiechart>
        </div>
    </div>
</template>
<script lang="ts" setup>
import flightOverview from "/src/components/flightOverview.vue";
import baseRoundProgress from "/src/components/baseRoundProgress.vue";
import baseHistogram from "/src/components/baseHistogram.vue";
import basePiechart from "/src/components/basePiechart.vue";

const delayNun = 18 //延误航班
const cancelNum = 5 //取消航班
const allNum = 515  //今日航班
const punctualityRate = 71  //准点率
const month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const flightCount = [
    43234, 19873, 49017, 82975, 12999, 23964, 30826, 43982, 69234, 42971, 32562, 43252,
]
const reasonData = [
    {
        name: '乘客原因',
        value: 17,
    },
    {
        name: '地面保障',
        value: 31,
    },
    {
        name: '飞机故障',
        value: 9,
    },
    {
        name: '流量控制',
        value: 8,
    },
    {
        name: '空域限制',
        value: 48,
    },
    {
        name: '天气原因',
        value: 52,
    },
]


</script>
<style scoped lang="less">
.OverviewTrendreason {
    width: 360px;
    height: 228px;
    background: url("/src/assets/echarts/feiJiHangBanBJ.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.7;
}

.Overview {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;

    .OverviewData {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        span {
            width: 90px;
            height: 24px;
            font-size: 16px;
            color: #ffffff;
            line-height: 24px;
            text-align: center;
        }
    }

    div:nth-child(2) {
        width: 100%;
        display: flex;
        margin-top: 20px;
        margin-left: 15%;
        flex-direction: column;

        span {
            margin-top: 10px;
            margin-left: 20px;
            font-size: 16px;
            color: #ffffff;
        }
    }

}

.Trend {
    position: absolute;
    top: 268px;
    left: 0px;
    height: 286px;
}

.title {
    height: 30px;
    font-size: 20px;
    color: #ffffff;
    line-height: 30px;
    padding-left: 35px;
    text-align: left;
}

.reason {
    position: absolute;
    top: 574px;
    left: 0px;
    height: 372px;
}

.basePiechart {
    position: absolute;
    left: 10px;
    top: 50px;
    right: 10px;
    bottom: 10px;
    background: url('/src/assets/echarts/feiji.png') no-repeat center center;
}
</style>