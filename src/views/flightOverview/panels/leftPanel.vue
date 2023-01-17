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
            <!-- <div class="title">今年航班起降架次趋势</div>
            <baseHistogram class="baseHistogram" :dataX="month" :dataY="flightCount"></baseHistogram> -->
        </div>
        <!-- 飞机延误原因 -->
        <div class="reason OverviewTrendreason">
            <!-- <div class="title">飞机延误原因</div>
            <div></div>
            <basePiechart class="basePiechart" :pieData="reasonData"></basePiechart> -->
        </div>
    </div>
</template>
<script lang="ts" setup>
import flightOverview from "/src/components/flightOverview.vue";
import baseRoundProgress from "/src/components/baseRoundProgress.vue";

const delayNun = 18 //延误航班
const cancelNum = 5 //取消航班
const allNum = 515  //今日航班
const punctualityRate = 71  //准点率


</script>
<style scoped lang="less">
.OverviewTrendreason {
    width: 360px;
    height: 228px;
    background-color: #182140;
    opacity:0.5;
}

.Overview {
    position: absolute;
    top: 20px;
    right: 0px;
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
        span{
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
    right: 0px;
    height: 286px;
}

.reason {
    position: absolute;
    top: 574px;
    right: 0px;
    height: 372px;
}
</style>