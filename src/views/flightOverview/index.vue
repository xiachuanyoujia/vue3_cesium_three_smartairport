<template>
    <div class="flightOverview">
        <leftPanel class="leftPanel"></leftPanel>
        <middlePanel class="middlePanel"></middlePanel>
        <rightPanel class="rightPanel"></rightPanel>
    </div>
</template>
<script lang="ts" setup>
import leftPanel from './panels/leftPanel.vue';
import middlePanel from './panels/middlePanel.vue';
import rightPanel from './panels/rightPanel.vue';

</script>
<style scoped lang="less">
.flightOverview {
    display: flex;
    background-color: #11101e;
}

.leftPanel {
    flex: 4;
}

.middlePanel {
    flex: 1;
}

.rightPanel {
    flex: 1;
}
</style>