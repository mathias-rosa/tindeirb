<template>
    <div class="splashscreen">
        <img src="/img/logo.png" alt="Logo" class="w-32" />
    </div>
    <div class="w-full h-full gradient dark:bg-gray-950" v-if="user">
        <div class="bg w-full h-full flex items-center">
            <div
                class="w-full md:max-w-md h-full self-start flex flex-col bg-white/90 backdrop-blur-md dark:bg-gray-900 shadow-sm"
                :class="{
                    'hidden md:flex': activeFillotId,
                }"
            >
                <div class="w-full shadow-sm">
                    <HeaderComponent />
                    <!-- <h1 class="px-4">
                        {{ config?.MAX_FILLOTS }}
                    </h1> -->
                    <div class="w-full p-5">
                        <input
                            type="text"
                            placeholder="🔍 Rechercher un nom ou des mots-clés"
                            v-model="search"
                            class="w-full px-5 py-3 rounded-full box-border bg-gray-100 dark:bg-gray-700 outline-none hover:ring-2 hover:ring-gray-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div class="tabs px-5">
                        <a
                            class="tab text-lg transition duration-300 ease-in-out"
                            :class="{
                                'tab-active tab-bordered':
                                    currentView === 'all',
                            }"
                            @click.exact="currentView = 'all'"
                            @click.ctrl.prevent="
                                currentView === 'everyone'
                                    ? (currentView = 'all')
                                    : (currentView = 'everyone')
                            "
                            >Tous</a
                        >
                        <a
                            class="tab text-lg transition duration-300 ease-in-out"
                            :class="{
                                'tab-active tab-bordered':
                                    currentView === 'favorites',
                            }"
                            @click="currentView = 'favorites'"
                            >Favoris</a
                        >
                        <a
                            class="tab text-lg transition duration-300 ease-in-out"
                            @click="currentView = 'mine'"
                            :class="{
                                'tab-active tab-bordered':
                                    currentView === 'mine',
                            }"
                            >Mes fillot.e.s</a
                        >
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
                            'bg-rose-500 hover:bg-rose-500 text-white dark:text-gray-900':
                                activeFillotId === fillot.id,
                            'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700':
                                fillot.parrain !== '' &&
                                fillot.parrain !== user.id,
                            'bg-orange-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700':
                                fillot.parrain === user.id,
                            '  hover:bg-rose-100 dark:hover:bg-rose-900 ':
                                activeFillotId !== fillot.id &&
                                fillot.parrain === '',
                        }"
                    >
                        <div class="w-16 h-16">
                            <ProfilePicture :seed="fillot.id" />
                        </div>

                        <div
                            class="flex flex-col w-full text-gray-500 dark:text-gray-200"
                        >
                            <h1
                                class="font-semibold text-xl px-2 w-full text-ellipsis text-gray-900 dark:text-white"
                                :class="{
                                    'text-white': activeFillotId === fillot.id,
                                }"
                            >
                                {{ fillot.prenom }} {{ fillot.nom }}
                            </h1>

                            <h1
                                class="w-fit px-2"
                                :class="{
                                    'text-white': activeFillotId === fillot.id,
                                }"
                                v-if="fillot.parrain === ''"
                            >
                                {{
                                    getFilliere(
                                        fillot.filiere,
                                        fillot.infos["3"]
                                    ) +
                                    `${
                                        fillot.infos["3"] === "Femme"
                                            ? " orpheline"
                                            : " orphelin"
                                    }`
                                }}
                            </h1>
                            <h1
                                class="w-fit px-2"
                                :class="{
                                    'text-white': activeFillotId === fillot.id,
                                }"
                                v-if="fillot.parrain === user.id"
                            >
                                Vous avez adopté
                                {{
                                    `${
                                        fillot.infos["3"] === "Femme"
                                            ? "cette Enseirbienne"
                                            : "cet Enseirbien"
                                    }`
                                }}
                            </h1>
                            <h1
                                class="w-fit px-2"
                                v-if="
                                    fillot.parrain !== '' &&
                                    fillot.parrain !== user.id
                                "
                            >
                                A été adopté par un de vos collègues
                            </h1>
                        </div>

                        <button
                            class="rounded-full h-8 flex items-center justify-center aspect-square bg-white shadow-md hover:scale-110 transition duration-300 ease-in-out group"
                            @click.stop="
                                user?.favorites.includes(fillot.id)
                                    ? removeFavorite(fillot.id)
                                    : addFavorite(fillot.id)
                            "
                        >
                            <span
                                class="absolute group-hover:inline-block hidden line-clamp-1 text-xs px-2 py-1 bg-gray-900 text-white rounded-md whitespace-nowrap z-20 right-5 shadow-md bottom-6"
                            >
                                {{
                                    user?.favorites.includes(fillot.id)
                                        ? "Retirer des favoris"
                                        : "Ajouter aux favoris"
                                }}
                            </span>
                            <img
                                :src="
                                    user?.favorites.includes(fillot.id)
                                        ? '/img/reload.svg'
                                        : '/img/star.svg'
                                "
                                alt="action"
                                class="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col h-screen w-full z-10" v-if="activeFillot">
                <div
                    class="w-full min-h-16 h-fit md:h-16 bg-white/80 backdrop-blur-md dark:bg-gray-900 relative z-10 shadow-sm flex flex-col md:flex-row items-center gap-3 md:gap-0 p-5 font-semibold text-lg justify-between"
                >
                    <div class="flex w-full items-center gap-4">
                        <button @click="activeFillotId = undefined">
                            <img
                                src="/arrow-left-solid.svg"
                                class="w-6 h-6 dark:invert"
                                alt="Retour"
                            />
                        </button>
                        <div class="w-10 h-10">
                            <ProfilePicture :seed="activeFillot.id" />
                        </div>
                        <div>
                            <h1>
                                {{ activeFillot.prenom }} {{ activeFillot.nom }}
                            </h1>
                            <h1
                                class="font-light text-sm text-gray-500 dark:text-gray-200 -mt-1"
                                v-if="activeFillot.parrain === ''"
                            >
                                {{
                                    `${
                                        activeFillot.infos["3"] === "Femme"
                                            ? "Cette 1A recherche un parrain ou une marraine"
                                            : "Ce 1A recherche un parrain ou une marraine"
                                    }`
                                }}
                            </h1>
                            <h1
                                class="font-light text-sm text-gray-500 dark:text-gray-200 -mt-1"
                                v-if="activeFillot.parrain === user.id"
                            >
                                Vous avez adopté
                                {{
                                    `${
                                        activeFillot.infos["3"] === "Femme"
                                            ? "cette Enseirbienne"
                                            : "cet Enseirbien"
                                    }`
                                }}
                            </h1>
                            <h1
                                class="font-light text-sm text-gray-500 dark:text-gray-200 -mt-1"
                                v-if="
                                    activeFillot.parrain !== '' &&
                                    activeFillot.parrain !== user.id
                                "
                            >
                                A été adopté par un de vos collègues
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="p-10 flex-1 overflow-y-scroll" ref="discussion">
                    <ChatComponent
                        :activeFillot="activeFillot"
                        :user="user"
                        :key="activeFillot.id"
                    />
                </div>
                <button class="select-btn bg-rose-500" v-if="parrainYear > 4">
                    <p class="inline-block">
                        Tu ne peux pas adopter de fillot.e.s car tu es trop
                        vieux !
                    </p>
                </button>
                <button
                    class="select-btn bg-rose-500"
                    v-else-if="
                        activeFillot.filiere !== user?.diploma.slice(0, 5)
                    "
                >
                    <p class="inline-block">
                        Tu ne peux pas adopter {{ activeFillot.prenom }} car tu
                        n'es pas dans la même filière !
                    </p>
                </button>
                <button
                    class="select-btn bg-gray-500 cursor-not-allowed text-white"
                    v-else-if="activeFillot.parrain === user.id"
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
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else-if="activeFillot.parrain !== ''"
                >
                    <p>
                        {{ activeFillot.prenom }} a déjà été adopté par
                        quelqu'un d'autre !
                    </p>
                </button>
                <button
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else-if="!mayAdopt"
                >
                    <p class="inline-block">
                        Tu ne peux pas adopter {{ activeFillot.prenom }} car tu
                        as déjà adopté
                        {{ config?.MAX_FILLOTS }}
                        fillot{{ config?.MAX_FILLOTS > 1 ? "s" : "" }}
                    </p>
                </button>
                <button
                    class="select-btn bg-rose-500"
                    v-else-if="shotgunDate.getTime() > currentTime"
                >
                    <p class="inline-block">
                        Tu pourras adopter {{ activeFillot.prenom }} dans &nbsp;
                    </p>
                    <CountdownTimer :targetDate="shotgunDate" />
                </button>
                <button
                    class="select-btn bg-rose-500 hover:bg-black dark:hover:bg-gray-50 dark:hover:text-gray-900"
                    v-else-if="mayAdopt"
                    @click="selectFillot(activeFillot.id)"
                >
                    <p class="inline-block">
                        Adopter {{ activeFillot.prenom }}
                    </p>
                </button>
            </div>
        </div>
    </div>
    <LoginComponent v-else />
</template>

<style>
.select-btn {
    @apply min-h-16 text-white sticky z-10 shadow-md h-fit items-center p-3 mt-2 mb-5 md:mx-10 mx-5 font-semibold text-lg justify-center box-border rounded-lg transition duration-300 ease-in-out;
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
import { computed, ref, onBeforeUnmount, watch } from "vue";
import type { Ref } from "vue";
import { pb, user } from "@/api/pocketbase";
import type { Fillot } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import ChatComponent from "@/components/ChatComponent.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";

const discussion = ref<HTMLElement | null>(null);

const scrollToTop = () => {
    discussion.value?.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const config = ref<any>(undefined);

const parrainYear = computed(() => {
    if (!user.value) {
        return 0;
    }
    return user.value.diploma.substring(5, 6);
});

const currentView = ref("all");

const addFavorite = (id: string) => {
    if (!user.value) {
        return alert("Tu dois être connecté pour ajouter un favori");
    }
    user.value.favorites.push(id);
    pb.collection("users").update(user.value.id, {
        favorites: user.value?.favorites,
    });
};

const removeFavorite = (id: string) => {
    if (!user.value) {
        return alert("Tu dois être connecté pour ajouter un favori");
    }
    user.value.favorites.splice(
        user.value?.favorites.findIndex((favorite: string) => favorite === id),
        1
    );
    pb.collection("users").update(user.value.id, {
        favorites: user.value?.favorites,
    });
};

const liste_fillots: Ref<Fillot[]> = ref([]);

const getFilliere = (code: string, genre: string) => {
    if (genre === "Femme") {
        switch (code) {
            case "IIEIN":
                return "Informaticienne";
            case "IIETE":
                return "Télécom";
            case "IIEMM":
                return "Matméca";
            case "IIEEL":
                return "Electronicienne";
            default:
                return "Animal";
        }
    } else {
        switch (code) {
            case "IIEIN":
                return "Informaticien";
            case "IIETE":
                return "Télécom";
            case "IIEMM":
                return "Matméca";
            case "IIEEL":
                return "Electronicien";
            default:
                return "Animal";
        }
    }
};

const search = ref("");

const filteredFillots = computed(() => {
    let fillots = liste_fillots.value;

    function formatString(text: string) {
        return text
            .toString()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase();
    }

    function generateSearchString(fillot: Fillot) {
        const infos: string[] = [];
        for (const [key, value] of Object.entries(fillot.infos)) {
            if (parseInt(key) > 8) {
                infos.push(formatString(value));
            }
        }
        return infos.join(" ");
    }

    if (currentView.value === "all") {
        fillots = fillots.filter((fillot) => {
            if (fillot.filiere === user.value?.diploma.slice(0, 5)) {
                return fillot;
            }
        });
    } else if (currentView.value === "favorites") {
        fillots = fillots.filter((fillot) => {
            if (user.value?.favorites.includes(fillot.id)) {
                return fillot;
            }
        });
    } else if (currentView.value === "mine") {
        fillots = fillots.filter((fillot) => {
            if (fillot.parrain === user.value?.id) {
                return fillot;
            }
        });
    }

    // split search keywords by space
    const keywords = search.value.replace(",", " ").split(" ");
    // filter fillots by keywords

    if (!search.value) {
        return fillots;
    }

    return fillots.filter((fillot) => {
        // check if fillot matches all keywords

        return keywords.every((keyword) => {
            // check if keyword is in fillot's name
            return (
                formatString(fillot.prenom).startsWith(formatString(keyword)) ||
                formatString(fillot.nom).startsWith(formatString(keyword)) ||
                generateSearchString(fillot).includes(formatString(keyword))
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
    return count < (config.value?.MAX_FILLOTS ?? 0);
});

function loadFillots() {
    pb.collection("Fillots")
        .getFullList({
            sort: "prenom,nom",
            // filter: `filiere = "${user.value?.diploma.slice(0, 5)}"`,
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

pb.collection("users").subscribe("*", async ({ action, record }) => {
    if (action === "update") {
        if (record.id === user.value?.id) {
            user.value = record;
        }
    }
});

function loadConfig() {
    pb.collection("config")
        .getFullList()
        .then((configs) => {
            config.value = configs.reduce((acc: any, config: any) => {
                acc[config.key] = config.value;
                return acc;
            }, {});
        });
}

pb.collection("config").subscribe("*", async ({ action, record }) => {
    if (action === "update") {
        config.value[record.key] = record.value;
    }
});

loadConfig();

// Unsubscribe

onBeforeUnmount(() => {
    pb.collection("Fillots").unsubscribe("*");
    pb.collection("users").unsubscribe("*");
});
</script>
