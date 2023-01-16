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
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const navigation = reactive(
    [
        {
            name: '航班总览',
            path: 'flightOverview',
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

</script>
<style scoped lang="less">
.cont {
    height: 130px;
    background-color: #0a0c10;
    display: flex;
}

.title {
    margin-left: 40px;
    margin-top: 30px;
    width: 375px;
    height: 65px;

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
    width: 560px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    color: #ffffff;
    text-align: left;
}
</style>