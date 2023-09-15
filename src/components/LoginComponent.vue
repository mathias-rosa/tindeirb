<template>
    <div
        class="flex flex-col items-center w-full p-5 justify-center flex-1 bg-gradient-to-tr from-red-500 to-rose-600"
    >
        <div v-if="user">
            <h1>Welcome {{ user.firstName }}</h1>
            <button @click="logout()">Se déconnecter</button>
        </div>
        <form class="flex flex-col gap-3 w-full max-w-sm" v-else>
            <h1 class="text-5xl text-white font-bold w-full text-center p-5">
                Tind'eirb
            </h1>

            <template v-if="showPassword">
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
                    @click.prevent="login(email, password)"
                >
                    Se connecter
                </button>
            </template>
            <button
                class="rounded-full p-3 px-5 text-xl text-black w-full outline-none bg-white hover:bg-black transition duration-200 ease-in-out hover:text-white"
                @click.exact.prevent="!loading && loginWithCas()"
                @click.ctrl.prevent="showPassword = !showPassword"
            >
                {{
                    loading ? "Connexion en cours..." : "Se connecter avec CAS"
                }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { user, login, logout } from "@/api/pocketbase";

const email = ref("");
const password = ref("");

const showPassword = ref(false);
const loading = ref(false);

function loginWithCas() {
    // Get current url
    const redirectUrl = window.location.href;
    const serviceUrl = "https://tcoutan.zzz.bordeaux-inp.fr/casAuth/";
    const authenticationCasUrl = `https://cas.bordeaux-inp.fr/?service=${serviceUrl}?url=${redirectUrl}`;
    window.location.href = authenticationCasUrl;
}

onBeforeMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get("ticket");
    if (ticket) {
        loading.value = true;
        // Remove ticket from url
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

        // Get current url
        const redirectUrl = window.location.href
            .replace("ticket=" + ticket, "")
            .replace("?&", "?")
            .replace("&&", "&");

        fetch(
            `${
                import.meta.env.VITE_API_URL
            }/api/parrain/auth/cas?ticket=${ticket}&redirectUrl=${redirectUrl}`
        )
            .then((response) => response.json())
            .then(({ username, password }) => {
                login(username, password);
            });
    }
});
</script>

<style scoped>
::placeholder {
    color: #fff;
}
</style>
