<template>
    <div class="background">
        <div class="background-overlay">
            <header>
                <div class="logo">
                    <img src="/img/logo.png" alt="Logo" class="w-32" />
                    <img src="/img/logo_text.png" alt="Logo" class="w-32" />
                </div>
                <button class="login-btn" @click.exact.prevent="!loading && loginWithCas()">
                    {{
                        loading ? "Veuillez patienter..." : "Connexion"
                    }}
                </button>
            </header>
            <main :style="{ opacity: 1 - scroll }">
                <h1>
                    Découvrez<br />votre fillot.e<sup>TM</sup>
                </h1>
                <template v-if="showPassword">
                    <input type="text" placeholder="Identifiant" v-model="email"
                        class="border rounded-full p-3 px-5 text-xl text-white w-full outline-none ring-zinc-100 hover:ring-2 bg-transparent transition duration-200 ease-in-out" />
                    <input placeholder="Mot de passe" type="password" v-model="password"
                        class="border rounded-full p-3 px-5 text-xl text-white w-full outline-none ring-zinc-100 hover:ring-2 bg-transparent transition duration-200 ease-in-out" />
                    <button
                        class="rounded-full p-3 px-5 text-xl text-black w-full outline-none bg-white hover:bg-black transition duration-200 ease-in-out hover:text-white"
                        @click.prevent="login(email, password)">
                        Se connecter
                    </button>
                </template>
                <button
                    class="register-btn"
                    @click.exact.prevent="!loading && loginWithCas()" @click.ctrl.prevent="showPassword = !showPassword">
                    {{
                        loading ? "Connexion en cours..." : "Créer un compte"
                    }}
                </button>
            </main>
            <footer :style="{ opacity: 1 - scroll }">
                Les photos mettent en scène des enseirbien.ne.s, et sont exclusivement utilisées à des fins d'illustration
            </footer>
        </div>
        <div class="mentions">
            Hé, t’es célibat'eirb ? Tu cherches un fillot ou une fillote ? C’est sur Tind'eirb que ça se passe.
            Avec déjà plus de 10000 ingénieurs diplômés depuis 1920, l'ENSEIRB-MATMECA est un très bon plan pour trouver ton ou ta prochaine fillot.e. Que tu sois d'Informatique, d'Élecronique, de Matmeca, de Télécom, de R&I ou encore de SEE, tu trouveras forcément ton bonheur.<br /><br />
            Tind'eirb est une application de rencontre pour les futurs ingénieurs de l'ENSEIRB-MATMECA. Elle permet de les mettre en relation avec leurs futurs fillots en fonction de leurs centres d'intérêts, leurs passions, leurs projets, leurs envies, etc.
            <hr />
            Pôle Web > Pôle Com >>> UNV > WST > JUP >>>>> MSQ > JK > NK  > BAR > Pôle event > CRB
            <span style="float: right;">🄯 2023 Pôle Web BDE. Aucun droit réservé.</span>
        </div>
    </div>
</template>

<style scoped>
::placeholder {
    color: #fff;
}

.background {
    background-image: url("/img/background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    height: 100vh;
}

.background-overlay {
    background-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5));

    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
    width: 100%;
    position: sticky;
    top: 0;
}

.logo {
    display: flex;
    align-items: center;
    gap: 4px;
}

.logo img {
    height: 36px;
    width: auto;
    margin-right: 4px;
}

.login-btn {
    background: #fff;
    color: #000;
    padding: 4px 16px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 600;
}

main {
    margin: 0 auto;
    padding: 0 16px;
    text-align: center;
}

h1 {
    font-size: 110px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    line-height: 1;
}

h1 sup {
    font-size: 34px;
    font-weight: normal;
    color: #fff;
    margin-top: 50px;
}

.register-btn {
    background: linear-gradient(0deg,#ff6036,#fd277a) no-repeat 50% fixed;
    color: #fff;
    padding: 8px 40px;
    border-radius: 24px;
    font-size: 20px;
    font-weight: 600;
    transition: filter 0.2s ease-in-out;
}

.register-btn:hover {
    filter: brightness(1.2);
}

footer {
    padding: 10px 16px;
    text-align: right;
    color: #fff;
    font-size: 13px;
}

.mentions {
    background-color: #111418;
    padding: 20px 70px;
    font-size: 16px;
}

hr {
    border: 0;
    height: 1px;
    background: #444;
    margin: 20px 0;
}
</style>


<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { login } from "@/api/pocketbase";

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

const scroll = ref(0);

function handlescroll() {
    scroll.value = (window.scrollY / window.innerHeight) * 3;
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
            `${import.meta.env.VITE_API_URL
            }/api/parrain/auth/cas?ticket=${ticket}&redirectUrl=${redirectUrl}`
        )
            .then((response) => response.json())
            .then(({ username, password }) => {
                login(username, password);
            });
    }

    window.addEventListener('scroll', handlescroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handlescroll);
});
</script>