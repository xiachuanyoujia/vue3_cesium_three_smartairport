<template>
    <div>
        <div class="top">
            <div></div>
            <div>今日航班</div>
            <div>TODAY’S FLIGHT</div>
            <flightList class="flightList" :listData="flightData"></flightList>
        </div>
        <!-- <div class="bottom">
            <div class="title">飞机起降正常与异常</div>
            <ladderDiagram class="ladderDiagram" :xData="monthData" :yNormalData="normalData"
                :yAbnormalData="abnormalData"></ladderDiagram>
        </div> -->
    </div>
</template>
<script lang="ts" setup>
import flightList from "/src/components/flightList.vue";
import ladderDiagram from "/src/components/ladderDiagram.vue";

const flightData = [
    {
        id: 1,
        icon: "shanghaihk.png",
        name: "上海航空",
        nummber: "FM9165",
        boardingPort: "F01",
        takeoffTime: "23:10",
        fromAddress: "上海",
        landingTime: "05:20",
        toAddress: "三亚",
        state: "航班计划"
    },
    {
        id: 2,
        icon: "chunqiuhk.png",
        name: "春秋航空",
        nummber: "9C6107",
        boardingPort: "F01",
        takeoffTime: "23:30",
        fromAddress: "上海",
        landingTime: "00:28",
        toAddress: "杭州",
        state: "航班取消"
    },
    {
        id: 3,
        icon: "dongfanghk.png",
        name: "东方航空",
        nummber: "MU5240",
        boardingPort: "F01",
        takeoffTime: "22:30",
        fromAddress: "上海",
        landingTime: "06:45",
        toAddress: "广州",
        state: "航班起飞"
    },
    {
        id: 4,
        icon: "nanfanghk.png",
        name: "南方航空",
        nummber: "CZ6508",
        boardingPort: "F01",
        takeoffTime: "14:10",
        fromAddress: "上海",
        landingTime: "17:45",
        toAddress: "三亚",
        state: "航班延误"
    },
    {
        id: 5,
        icon: "jixianghk.png",
        name: "吉祥航空",
        nummber: "CZ6508",
        boardingPort: "F01",
        takeoffTime: "10:10",
        fromAddress: "南京",
        landingTime: "12:10",
        toAddress: "北京",
        state: "航班到达"
    },
    {
        id: 6,
        icon: "shenzhenghk.png",
        name: "深圳航空",
        nummber: "CZ6508",
        boardingPort: "F01",
        takeoffTime: "16:10",
        fromAddress: "北京",
        landingTime: "17:45",
        toAddress: "深圳",
        state: "航班延误"
    },
    {
        id: 7,
        icon: "sichuanhk.png",
        name: "四川航空",
        nummber: "CZ6508",
        boardingPort: "F01",
        takeoffTime: "17:10",
        fromAddress: "四川",
        landingTime: "19:45",
        toAddress: "三亚",
        state: "航班计划"
    },
    // {
    //     id: 7,
    //     icon: "zhongguogh.png",
    //     name: "中国国际航空",
    //     nummber: "CZ6508",
    //     boardingPort: "F01",
    //     takeoffTime: "14:15",
    //     fromAddress: "上海",
    //     landingTime: "17:45",
    //     toAddress: "北京",
    //     state: "航班起飞"
    // }
]
const monthData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
const normalData = [9, 6, 4, 8, 6, 7, 9, 9, 4, 5, 6, 4]
const abnormalData = [2, 4, 5, 2, 3, 4, 6, 1, 7, 8, 3, 1]


</script>
<style scoped lang="less">
.top {
    height: 80%;
    background: url("/src/assets/echarts/feiJiHangBanBJ.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.7;
    overflow: hidden;
    position: relative;

    div:nth-child(1) {
        width: 340px;
        height: 130px;
        background: url("/src/assets/echarts/hangBanFeiJi.png");
        opacity: 0.5;
    }

    div:nth-child(2) {
        position: absolute;
        top: 36px;
        right: 0;
        width: 81px;
        height: 76px;
        font-size: 30px;
        color: #FFFFFF;
        line-height: 32px;
        letter-spacing: 1px;
    }

    div:nth-child(3) {
        position: absolute;
        right: 5px;
        top: 105px;
        height: 14px;
        font-size: 10px;
        font-weight: 300;
        color: #FFFFFF;
        line-height: 14px;
    }
}

.bottom {
    right: 0px;
    height: 266px;
    background: url("/src/assets/echarts/feiJiHangBanBJ.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.7;
    .title {
        width: 100%;
        height: 14%;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 21px;
        padding-left: 35px;
        text-align: left;
        line-height: 30px;
    }
}
</style>