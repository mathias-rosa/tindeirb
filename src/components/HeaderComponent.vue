<template>
    <nav class="flex items-center justify-between flex-wrap px-6 pt-4">
        <router-link
            to="/"
            class="text-rose-500 font-semibold text-2xl tracking-tight"
            >Tind'eirb</router-link
        >
        <div v-if="user" class="flex">
            <button
                class="btn rounded-full dark:bg-white dark:text-gray-900 dark:hover:bg-rose-500 dark:hover:text-white"
                @click="logout"
            >
                Se déconnecter
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { user, logout } from "@/api/pocketbase";
</script>
