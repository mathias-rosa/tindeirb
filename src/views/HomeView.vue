<template>
    <div class="splashscreen">
        <img src="/img/logo.png" alt="Logo" class="w-32" />
    </div>
    <div class="w-full h-full gradient dark:bg-gray-950" v-if="user">
        <div class="bg w-full h-full flex items-center">
            <div
                class="w-full md:max-w-md h-full self-start flex flex-col bg-white dark:bg-gray-900 shadow-sm"
                :class="{
                    'hidden md:flex': activeFillotId,
                }"
            >
                <div class="w-full shadow-sm">
                    <HeaderComponent />
                    <div class="w-full p-5">
                        <input
                            type="text"
                            placeholder="🔍 Rechercher un nom ou des mots clés (ex: BDE 👀)"
                            v-model="search"
                            class="w-full px-5 py-3 rounded-full box-border bg-gray-100 dark:bg-gray-700 outline-none hover:ring-2 hover:ring-gray-500 transition duration-300 ease-in-out"
                        />
                    </div>
                </div>

                <div class="overflow-y-scroll m-2 mr-0 pr-1">
                    <div
                        v-for="fillot in filteredFillots"
                        :key="fillot.id"
                        class="flex gap-2 justify-between p-3 mb-1 w-full cursor-pointer items-center rounded-md"
                        @click="
                            () => {
                                scrollToTop();
                                activeFillotId = fillot.id;
                            }
                        "
                        :class="{
                            'bg-rose-500 text-white dark:text-gray-900':
                                activeFillotId === fillot.id,
                            'bg-white dark:bg-gray-900 hover:bg-rose-100 dark:hover:bg-rose-900 ':
                                activeFillotId !== fillot.id,
                        }"
                    >
                        <img
                            :src="'https://cataas.com/cat?cas=' + fillot.id"
                            class="w-12 h-12 rounded-full aspect-square object-cover"
                        />
                        <div
                            class="flex flex-col w-full text-gray-500 dark:text-gray-200"
                            :class="{
                                'text-white': activeFillotId === fillot.id,
                            }"
                        >
                            <h1
                                class="font-semibold text-xl px-2 w-full text-ellipsis text-gray-900 dark:text-white"
                                :class="{
                                    'text-white': activeFillotId === fillot.id,
                                }"
                            >
                                {{ fillot.prenom }} {{ fillot.nom }}
                            </h1>

                            <h1 class="w-fit px-2">
                                {{ fillot.infos["3"] }}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col h-screen w-full z-10" v-if="activeFillot">
                <div
                    class="w-full min-h-16 h-fit md:h-16 bg-white dark:bg-gray-900 relative z-10 shadow-sm flex flex-col md:flex-row items-center gap-3 md:gap-0 p-5 font-semibold text-lg justify-between"
                >
                    <router-link
                        to="/"
                        class="text-rose-500 font-semibold text-2xl tracking-tight md:hidden"
                        >Tind'eirb</router-link
                    >
                    <div class="flex w-full items-center justify-between">
                        <h1>
                            {{ activeFillot.prenom }} {{ activeFillot.nom }}
                        </h1>
                        <button
                            class="btn dark:bg-white dark:text-gray-900 dark:hover:bg-rose-500 dark:hover:text-white"
                            @click="activeFillotId = undefined"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
                <div class="p-10 flex-1 overflow-y-scroll" ref="discussion">
                    <ChatComponent
                        :activeFillot="activeFillot"
                        :user="user"
                        :key="activeFillot.id"
                    />
                </div>
                <button
                    class="select-btn bg-gray-500 cursor-not-allowed text-white"
                    v-if="activeFillot.parrain === user.id"
                >
                    {{ activeFillot.prenom }} est déjà
                    {{
                        `${
                            activeFillot.infos["3"] === "Femme"
                                ? "ta fillote !"
                                : "ton fillot !"
                        }`
                    }}
                </button>
                <button
                    class="select-btn bg-rose-500"
                    v-else-if="shotgunDate.getTime() > currentTime"
                >
                    <p>
                        Tu pourras adopter {{ activeFillot.prenom }} dans &nbsp;
                    </p>
                    <CountdownTimer :targetDate="shotgunDate" />
                </button>
                <button
                    class="select-btn bg-rose-500 hover:bg-black dark:hover:bg-gray-50 dark:hover:text-gray-900"
                    v-else-if="mayAdopt"
                    @click="selectFillot(activeFillot.id)"
                >
                    <p>Adopter {{ activeFillot?.prenom }}</p>
                </button>
                <button
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else-if="!mayAdopt"
                >
                    <p>
                        Tu ne peux pas adopter {{ activeFillot?.prenom }} car tu
                        as déjà adopté
                        {{ MAXIMUM_FILLOTS }}
                        fillot{{ MAXIMUM_FILLOTS > 1 ? "s" : "" }}
                    </p>
                </button>
                <button
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else
                >
                    <p>
                        {{ activeFillot?.prenom }} a déjà été adopté par
                        quelqu'un d'autre !
                    </p>
                </button>
            </div>
        </div>
    </div>
    <LoginComponent v-else />
</template>

<style>
.select-btn {
    @apply min-h-16 text-white sticky z-10 shadow-sm flex flex-col h-fit md:flex-row items-center p-3 mt-2 mb-5 md:mx-10 mx-5 font-semibold text-lg justify-center box-border rounded-lg transition duration-300 ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.splashscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, #ff6036, #fd277a) no-repeat 50% fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
    animation: splashscreen 0.3s ease-in-out 1s forwards;
}

.splashscreen img {
    width: 64px;
    height: auto;
    animation: pulse 1s ease-in-out infinite;
}

.gradient {
    background: linear-gradient(0deg, #ff603622, #fd277a22) no-repeat 50% fixed;
}

@keyframes splashscreen {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
        pointer-events: none;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>

<script setup lang="ts">
import { computed, ref, Ref, onBeforeUnmount, watch } from "vue";
import { pb, user } from "@/api/pocketbase";
import { Fillot } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import ChatComponent from "@/components/ChatComponent.vue";

const discussion = ref<HTMLElement | null>(null);

const scrollToTop = () => {
    discussion.value?.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const MAXIMUM_FILLOTS = 1;

const liste_fillots: Ref<Fillot[]> = ref([]);

const search = ref("");

const filteredFillots = computed(() => {
    // split search keywords by space
    const keywords = search.value.replace(",", " ").split(" ");
    // filter fillots by keywords

    if (!search.value) {
        return liste_fillots.value;
    }

    return liste_fillots.value.filter((fillot) => {
        // check if fillot matches all keywords

        return keywords.every((keyword) => {
            // check if keyword is in fillot's name
            return (
                fillot.prenom.toLowerCase().startsWith(keyword.toLowerCase()) ||
                fillot.nom.toLowerCase().startsWith(keyword.toLowerCase()) ||
                Object.values(fillot.infos)
                    .splice(9)
                    .join(" ")
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            );
        });
    });
});

const selectFillot = async (id: string) => {
    if (!user.value) {
        return alert("Tu dois être connecté pour adopter un fillot");
    }
    const fillot = liste_fillots.value.find((fillot) => {
        if (fillot.id === id) {
            return fillot;
        }
    });
    if (!fillot) {
        return alert("Fillot non trouvé");
    }
    await pb.collection("Fillots").update(fillot.id, {
        parrain: user.value?.id,
    });
    await pb.collection("Users").update(user.value.id, {
        fillots: [fillot.id, ...user.value.fillots],
    });
};

const activeFillotId = ref<string | undefined>(undefined);

const activeFillot = computed(() => {
    if (!activeFillotId.value) {
        return undefined;
    }
    return liste_fillots.value.find((fillot) => {
        if (fillot.id === activeFillotId.value) {
            return fillot;
        }
    });
});

const mayAdopt = computed(() => {
    const count = liste_fillots.value.filter((fillot) => {
        if (fillot.parrain === user.value?.id) {
            return fillot;
        }
    }).length;
    return count < MAXIMUM_FILLOTS;
});

function loadFillots() {
    pb.collection("Fillots")
        .getFullList({
            sort: "prenom,nom",
            filter: `filiere = "${user.value?.diploma.slice(0, 5)}"`,
        })
        .then((fillots) => {
            liste_fillots.value = fillots as Fillot[];
        });
}
const shotgunDate = ref(new Date(user.value?.shotgunDate));

watch(
    () => user.value,
    () => {
        loadFillots();
        shotgunDate.value = new Date(user.value?.shotgunDate);
    }
);

const currentTime = ref(Date.now());

setInterval(() => {
    currentTime.value = Date.now();
}, 1000);

loadFillots();

pb.collection("Fillots").subscribe("*", async ({ action, record }) => {
    if (action === "update") {
        const index = liste_fillots.value.findIndex(
            (fillot: any) => fillot.id === record.id
        );
        liste_fillots.value[index] = record as Fillot;
    }
});

// Unsubscribe

onBeforeUnmount(() => {
    pb.collection("Fillots").unsubscribe("*");
});
</script>
