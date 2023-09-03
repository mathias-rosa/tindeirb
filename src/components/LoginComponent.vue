<template>
    <div class="flex flex-col items-center w-full">
        <div v-if="user">
            <h1>Welcome {{ user.name }}</h1>
            <button @click="logout()">Se déconnecter</button>
        </div>
        <form class="flex flex-col gap-3 max-w-sm" v-else>
            <input type="text" v-model="email" class="border" />
            <input type="password" v-model="password" class="border" />
            <button
                @click="
                    (e) => {
                        login(email, password);
                        e.preventDefault();
                    }
                "
            >
                Se connecter
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { user, login, logout } from "@/api/pocketbase";

const email = ref("");
const password = ref("");
</script>
