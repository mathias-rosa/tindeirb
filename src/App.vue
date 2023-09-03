<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";
import { isAuthenticated, pb } from "@/api/pocketbase";
onMounted(() => {
    console.log("App mounted");
    console.log("isAuthenticated", isAuthenticated());
    if (!isAuthenticated()) {
        router.push("/login");
    }
    pb.authStore.onChange(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            router.push("/");
        }
    });
});
</script>

<template>
    <RouterView />
</template>

<style>
#app {
    padding: 1em;
}
</style>
