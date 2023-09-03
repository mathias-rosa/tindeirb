<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
    <HeaderComponent />
    <RouterView class="p-5" />
</template>

<style>
* {
    font-family: "Outfit", sans-serif;
}
</style>
