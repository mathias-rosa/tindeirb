<template>
    <nav class="flex items-center justify-between flex-wrap bg-rose-500 p-6">
        <router-link
            to="/"
            class="text-white font-semibold text-xl tracking-tight"
            >Tind'eirb</router-link
        >
        <div v-if="user" class="flex gap-2">
            <button
                class="p-2 border border-white text-white rounded-md hover:bg-white hover:text-rose-500 transition duration-300 ease-in-out"
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
