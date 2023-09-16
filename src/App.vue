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

::-webkit-scrollbar {
    width: 20px;
    position: absolute;
}

::-webkit-scrollbar-track {
    background-color: transparent;
    backdrop-filter: blur(12px);
}

::-webkit-scrollbar-thumb {
    background-color: #c7c8d1cc;
    backdrop-filter: blur(12px);
}

::-webkit-scrollbar-thumb {
    background-color: #c7c8d1cc;
    backdrop-filter: blur(12px);
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #c7c8d1cc;
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #20254ccc;
}
</style>
