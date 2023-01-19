<template>
    <div class="main">
        <div>
            <topPanel />
        </div>
        <airPort></airPort>
    </div>

    <!-- <router-link to="">
        <flightOverview />
    </router-link> -->

    <router-view/>
    
</template>
<script lang="ts" setup>
import topPanel from './topPanel/index.vue'
import flightOverview from "/src/views/flightOverview/index.vue";
import airPort from "../components/airPort.vue";
</script>
<style>
* {
    margin: 0;
    padding: 0
}

li {
    list-style: none
}

img {
    vertical-align: top;
    border: none
}
</style>