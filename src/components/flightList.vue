<template>
    <div class="item" v-for="item in listData" :key="item.id">
        <div class="left">
            <div>{{ item.name }}</div>
            <div>{{ item.nummber }}</div>
        </div>
        <div class="centre">
            <div class="cenLeft">
                <span>{{ item.takeoffTime }}</span>
                <span>{{ item.fromAddress }}</span>
            </div>
            <div class="cenCenter">---{{ item.boardingPort }}---</div>
            <div class="cenRight">
                <span>{{ item.landingTime }}</span>
                <span>{{ item.toAddress }}</span>
            </div>
        </div>
        <div class="right">
            <span>{{ item.state }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, defineProps } from 'vue'

const props = defineProps({
    listData: Array,
})
const { listData } = toRefs(props)

</script>
<style scoped lang="less">
.item {
    margin-top: 20px;
    width: 100%;
    height: 70px;
    color: #fff;
    font-size: 16px;
    display: flex;

    .left {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .centre {
        flex: 2;
        display: flex;
        text-align: center;

        div:nth-child(1) {
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        div:nth-child(2) {
            flex: 1;
            line-height: 70px;
            display: flex;
            justify-content: center;
        }

        div:nth-child(3) {
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
    }

    .right {
        width: 80px;
        height: 100%;
        line-height: 70px;
        font-size: 20px;
    }
}
</style>