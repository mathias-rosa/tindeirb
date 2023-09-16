<template>
    <div
        class="flex items-center w-full h-full bg-gradient-to-r from-[#ef4a75]/10 to-[#fd5564]/10"
        v-if="user"
    >
        <div
            class="w-full md:max-w-md h-full self-start flex flex-col bg-white"
        >
            <div class="w-full shadow-sm">
                <HeaderComponent />
                <div class="w-full p-5">
                    <input
                        type="text"
                        placeholder="🔍 Rechercher un nom ou un mot clé (ex: BDE 👀)"
                        v-model="search"
                        class="w-full px-5 py-3 rounded-full box-border bg-gray-100 outline-none hover:ring-2 hover:ring-gray-500 transition duration-300 ease-in-out"
                    />
                </div>
            </div>

            <div class="overflow-y-scroll my-1">
                <div
                    v-for="fillot in filteredFillots"
                    :key="fillot.id"
                    class="flex gap-5 justify-between shadow-sm py-3 px-5 mb-1 w-full cursor-pointer items-center transition duration-500 ease-in-out hover:bg-gradient-to-tr from-yellow-500/5 to-rose-600/5"
                    @click="activeFillotId = fillot.id"
                    :class="{
                        'bg-gradient-to-tr from-yellow-500/5 to-rose-600/5':
                            activeFillotId === fillot.id,
                        'bg-white': activeFillotId !== fillot.id,
                    }"
                >
                    <img
                        :src="'https://cataas.com/cat?cas=' + fillot.id"
                        class="w-12 h-12 rounded-full aspect-square object-cover"
                    />
                    <div class="flex flex-col w-full text-gray-500">
                        <h1
                            class="font-semibold text-xl px-2 w-full text-ellipsis text-gray-900"
                        >
                            {{ fillot.prenom }} {{ fillot.nom }}
                        </h1>

                        <h1 class="w-fit py-1 px-2">
                            {{ fillot.infos["3"] }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div
                class="hidden sm:flex flex-col h-full w-full"
                v-if="activeFillot"
            >
                <div
                    class="w-full h-16 bg-white relative z-10 shadow-sm flex items-center p-5 font-semibold text-xl justify-between"
                >
                    <h1>{{ activeFillot.prenom }} {{ activeFillot.nom }}</h1>
                    <button class="btn h-8" @click="activeFillotId = undefined">
                        Fermer
                    </button>
                </div>
                <div class="p-10 overflow-y-scroll test">
                    <LeftBubble
                        :sender="user.firstName"
                        :message="`Salut ${activeFillot.infos['2']} ! Comment ça va ?`"
                    />

                    <RightBubble
                        :sender="activeFillot.infos['2']"
                        message="Yo ! Ça va nickel et toi ?"
                    />

                    <LeftBubble :sender="user.firstName" message="Super !" />
                    <LeftBubble message="Dis moi tu viens d'où ? " />
                    <LeftBubble message="(Je cherche un fillot)" />

                    <RightBubble
                        :sender="activeFillot.infos['2']"
                        :message="`Je viens de ${activeFillot.infos['10']}`"
                    />

                    <LeftBubble
                        :sender="user.firstName"
                        message="Ouah 🤩 ! Trop bien !"
                    />

                    {{ activeFillot }}
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
                    class="select-btn bg-rose-500 hover:bg-black"
                    v-else-if="mayAdopt"
                    @click="selectFillot(activeFillot.id)"
                >
                    Adopter {{ activeFillot.prenom }}
                </button>
                <button
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else-if="!mayAdopt"
                >
                    Tu ne peux pas adopter {{ activeFillot.prenom }} car tu as
                    déjà adopté
                    {{ MAXIMUM_FILLOTS }}
                    fillot{{ MAXIMUM_FILLOTS > 1 ? "s" : "" }}
                </button>
                <button
                    class="select-btn cursor-not-allowed bg-gray-500"
                    v-else
                >
                    {{ activeFillot.prenom }} a déjà été adopté par quelqu'un
                    d'autre !
                </button>
            </div>
        </Transition>
    </div>
    <LoginComponent v-else />
</template>

<style>
.select-btn {
    @apply h-16  text-white sticky z-10 shadow-sm flex items-center p-3 mt-2 mb-5 mx-10 font-semibold text-lg justify-center box-border flex-1 rounded-lg transition duration-300 ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<script setup lang="ts">
import { computed, ref, Ref, onBeforeUnmount, watch } from "vue";
import { pb, user } from "@/api/pocketbase";
import { Fillot } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import LeftBubble from "@/components/LeftBubble.vue";
import RightBubble from "@/components/RightBubble.vue";

const MAXIMUM_FILLOTS = 1;

const liste_fillots: Ref<Fillot[]> = ref([]);

const search = ref("");

const filteredFillots = computed(() => {
    return liste_fillots.value.filter(
        (fillot) =>
            `${fillot.prenom} ${fillot.nom}`
                .toLowerCase()
                .startsWith(search.value.toLowerCase()) ||
            `${fillot.nom} ${fillot.prenom}`
                .toLowerCase()
                .startsWith(search.value.toLowerCase()) ||
            Object.values(fillot.infos)
                .join(" ")
                .toLowerCase()
                .includes(search.value.toLowerCase())
    );
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

watch(() => user.value, loadFillots);

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
