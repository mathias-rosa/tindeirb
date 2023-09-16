<template>
    <nav class="flex items-center justify-between flex-wrap bg-white p-6 pb-0">
        <router-link
            to="/"
            class="text-rose-500 font-semibold text-2xl tracking-tight"
            >Tind'eirb</router-link
        >
        <div v-if="user" class="flex">
            <button class="btn rounded-full" @click="logout">
                Se déconnecter
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { user, logout } from "@/api/pocketbase";
</script>
