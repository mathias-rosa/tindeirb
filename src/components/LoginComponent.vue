<template>
    <div
        class="flex flex-col items-center w-full p-5 justify-center flex-1 bg-gradient-to-tr from-red-500 to-rose-600"
    >
        <div v-if="user">
            <h1>Welcome {{ user.name }}</h1>
            <button @click="logout()">Se déconnecter</button>
        </div>
        <form class="flex flex-col gap-3 w-full max-w-sm" v-else>
            <h1 class="text-5xl text-white font-bold w-full text-center p-5">
                Tind'eirb
            </h1>

            <input
                type="text"
                placeholder="Identifiant"
                v-model="email"
                class="border rounded-full p-3 px-5 text-xl text-white w-full outline-none ring-zinc-100 hover:ring-2 bg-transparent transition duration-200 ease-in-out"
            />
            <input
                placeholder="Mot de passe"
                type="password"
                v-model="password"
                class="border rounded-full p-3 px-5 text-xl text-white w-full outline-none ring-zinc-100 hover:ring-2 bg-transparent transition duration-200 ease-in-out"
            />
            <button
                class="rounded-full p-3 px-5 text-xl text-black w-full outline-none bg-white hover:bg-black transition duration-200 ease-in-out hover:text-white"
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

<style scoped>
::placeholder {
    color: #fff;
}
</style>
