<template>
    <div class="flex flex-col items-center w-full" v-if="user">
        <h1>Welcome {{ user.name }}</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { user, logout } from "@/api/pocketbase";
</script>
