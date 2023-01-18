<template>
    <div class="cont">
        <div class="title">
            <div>
                <p>智慧机场</p>
                <p>可视化系统</p>
            </div>
            <div>Smart airport visualization system</div>
        </div>
        <div class="navigation">
            <div class="navigationItem" :class="[
                index >= 3 ? 'navigationItemDis' : curSeleNavigation == index ? 'navigationItemSel' : '',
            ]" v-for="(item, index) in navigation" :key="index" @click="selNavigation(index)">
                {{ item.name }}
            </div>
        </div>
        <div class="notes">{{ notes }}</div>

        <div class="worldTime">
            <div class="worldTimeItem" v-for="(item, index) in worldTime" :key="index">
                <span class="world_Name">{{ item.name }}</span>
                <span class="world_Time">{{ item.time }}</span>
            </div>
        </div>

        <div class="curTime">
            <div>
                <p>{{ date }}</p>
                <p>{{ week }}</p>
            </div>
            <div>{{ curTime }}</div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import dayjs from "dayjs";
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    timeDifference()
})

const navigation = reactive(
    [
        {
            name: '航班总览',
            // path: 'flightOverview',
            path: '/',
        },
        {
            name: '机场运行',
            path: 'airportOperation',
        },
        {
            name: '客机运维',
            path: 'airlinerMaintain',
        },
        {
            name: '交通管理',
            path: '',
        },
        {
            name: '指挥调度',
            path: '',
        },
        {
            name: '统计分析',
            path: '',
        },
    ]
)

const curSeleNavigation = ref(0)
const selNavigation = (nIndex: number) => {
    if (nIndex >= 3) {
        return;
    }
    router.push(navigation[nIndex].path)
    curSeleNavigation.value = nIndex;
}
const notes = ref("东方航空 MU5240 上海虹桥飞白云机场航班因天气原因航班取消！")

const getTime = (dateVal) => {
    var dateObj = {};
    let arrDay = dayjs(dateVal).format('YYYY/MM/DD HH:mm:ss').split(' ');
    let nWeek = dayjs(dateVal).day();
    dateObj.date = arrDay[0].split('/').join('-');
    dateObj.time = arrDay[1];
    switch (nWeek) {
        case 0:
            dateObj.week = '星期日';
            break;
        case 1:
            dateObj.week = '星期一';
            break;
        case 2:
            dateObj.week = '星期二';
            break;
        case 3:
            dateObj.week = '星期三';
            break;
        case 4:
            dateObj.week = '星期四';
            break;
        case 5:
            dateObj.week = '星期五';
            break;
        case 6:
            dateObj.week = '星期六';
            break;
    }
    return dateObj;
}

const date = ref('')
const week = ref('')
const curTime = ref('')
const timeDifference = () => {
    setInterval(() => {
        let curDateObj = getTime(dayjs());
        date.value = curDateObj.date;
        week.value = curDateObj.week;
        curTime.value = curDateObj.time;

        let nLen = worldTime.length;
        for (var n = 0; n < nLen; ++n) {
            let nOffset = worldTime[n].offsetTime;
            let objTemp = getTime(dayjs().valueOf() + nOffset * 60 * 60 * 1000);
            worldTime[n].time = objTemp.time;
        }
    }, 1000);
}

const worldTime = reactive(
    [
        {
            name: '伦敦',
            icon: 'img_lundun.png',
            time: '13:34:22',
            offsetTime: -8,
        },
        {
            name: '莫斯科',
            icon: 'img_mosike.png',
            time: '13:34:22',
            offsetTime: -5,
        },
        {
            name: '华盛顿',
            icon: 'img_huashendun.png',
            time: '13:34:22',
            offsetTime: -13,
        },
        {
            name: '东京',
            icon: 'img_dongjing.png',
            time: '13:34:22',
            offsetTime: 1,
        },
    ]
)

</script>
<style scoped lang="less">
.cont {
    height: 130px;
    background-color: #0a0c10;
    display: flex;
}

.title {
    margin-left: 1%;
    margin-top: 35px;

    div:nth-child(1) {
        display: flex;

        p:nth-child(1) {
            width: 164px;
            height: 42px;
            font-size: 40px;
            color: #ff7e36;
            line-height: 42px;
            letter-spacing: 1px;
            background: linear-gradient(180deg, #4071ff 0%, #9395d2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p:nth-child(2) {
            width: 205px;
            height: 42px;
            font-size: 40px;
            color: #ffffff;
            line-height: 42px;
            letter-spacing: 1px;
        }
    }

    div:nth-child(2) {
        width: 365px;
        height: 12px;
        font-size: 16px;
        color: #dedae4;
        line-height: 12px;
        letter-spacing: 1px;
    }
}

.navigation {
    // margin-left: 490px;
    margin-left: 2%;
    margin-top: 40px;
    width: 630px;
    height: 40px;
    font-size: 20px;
    color: #ffffff;
    display: flex;

    .navigationItem {
        flex: 1;
        margin-left: 20px;
        line-height: 42px;
        cursor: pointer;
    }

    .navigationItemDis {
        color: rgba(255, 255, 255, 0.6);
    }
}

.notes {
    margin-top: 42px;
    margin-left: 2%;
    // width: 500px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    color: #ffffff;
    text-align: left;
}

.curTime {
    margin-top: 40px;
    // margin-right: 60px;
    margin-left: 2%;
    width: 300px;
    display: flex;

    p:nth-child(1) {
        margin-top: 6px;
        margin-left: 0px;
        width: 95px;
        height: 11px;
        font-size: 14px;
        color: #ffffff;
        line-height: 11px;
    }

    p:nth-child(2) {
        margin-top: 8px;
        margin-left: 0px;
        width: 42px;
        height: 15px;
        font-size: 14px;
        color: #ffffff;
        line-height: 15px;
    }

    div:nth-child(2) {
        margin-top: 4px;
        margin-right: 0px;
        width: 196px;
        height: 35px;
        font-size: 46px;
        color: #ffffff;
        line-height: 35px;
    }
}

.worldTime {
    width: 380px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .world_Name {
        font-size: 14px;
        color: #dedae4;
        display: flex;
        justify-content: center;
    }

    .world_Time {
        font-size: 20px;
        color: #ffffff;
    }
}
</style>