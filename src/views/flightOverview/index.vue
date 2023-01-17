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
  position: absolute;
  left: 0px;
  top: 300px;
  width: 2880px;
  bottom: 0px;
//   background: url('~@/assets/flightOverview/bg.png') no-repeat center center;
}

.leftPanel {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 786px;
  bottom: 0px;
}

.middlePanel {
  position: absolute;
  left: 2114px;
  top: 0px;
  right: 210px;
  bottom: 34px;
}

.rightPanel {
  position: absolute;
  right: 30px;
  top: 0px;
  width: 180px;
  bottom: 34px;
}
</style>