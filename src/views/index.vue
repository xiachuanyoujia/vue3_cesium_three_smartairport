<template>
    <div class="main">
        <div><topPanel /></div>
    </div>
    <router-view/>
</template>
<script lang="ts" setup>
import topPanel from './topPanel/index.vue'
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