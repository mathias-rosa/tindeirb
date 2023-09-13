<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
    <!-- <HeaderComponent /> -->
    <RouterView />
</template>

<style>
* {
    font-family: "Outfit", sans-serif;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
