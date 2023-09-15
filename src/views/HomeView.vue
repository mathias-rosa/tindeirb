<template>
    <div class="flex items-center w-full h-full" v-if="user">
        <div class="w-full lg:max-w-lg h-full self-start overflow-y-scroll">
            <HeaderComponent />
            <div class="w-full p-5">
                <input
                    type="text"
                    placeholder="Rechercher un fillot par son nom"
                    v-model="search"
                    class="w-full px-5 py-3 rounded-full box-border bg-gray-100 outline-none hover:ring-2 hover:ring-gray-500 transition duration-300 ease-in-out"
                />
            </div>
            <div class="">
                <div
                    v-for="fillot in filteredFillots"
                    :key="fillot.id"
                    class="flex gap-5 justify-between shadow-sm py-3 px-5 mb-1 w-full cursor-pointer items-center transition duration-500 ease-in-out hover:bg-gradient-to-tr from-yellow-500/5 to-rose-600/5"
                    @click="activeFillot = fillot"
                    :class="{
                        'bg-gradient-to-tr from-yellow-500/5 to-rose-600/5':
                            activeFillot === fillot,
                        'bg-white': activeFillot !== fillot,
                    }"
                >
                    <img
                        :src="'https://cataas.com/cat?cas=' + fillot.id"
                        class="w-16 h-16 rounded-full aspect-square object-cover"
                    />
                    <div class="flex flex-col w-full text-gray-500">
                        <h1
                            class="font-semibold text-2xl px-2 w-full text-ellipsis text-gray-900"
                        >
                            {{ fillot.prenom }} {{ fillot.nom }}
                        </h1>
                        <h1
                            class="w-fit py-1 px-2 rounded-full bg-amber-400 text-white"
                            v-if="fillot.parrain === user.id"
                        >
                            Tu as adopté ce fillot
                        </h1>
                        <button
                            class="w-fit hover:bg-green-500 hover:translate-x-2 hover:text-white py-1 px-2 rounded-full transition duration-200 ease-in-out"
                            @click="selectFillot(fillot.id)"
                            v-else-if="true"
                        >
                            Choisir ce fillot
                        </button>
                        <h1
                            v-else-if="!mayAdopt"
                            class="text-red-500 w-fit py-1 px-2"
                        >
                            Tu as déjà adopté
                            {{ MAXIMUM_FILLOTS }}
                            fillot{{ MAXIMUM_FILLOTS > 1 ? "s" : "" }}
                        </h1>
                        <h1 v-else class="w-fit py-1 px-2">
                            Ce 1A a déjà été adopté
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-gray-100 hidden sm:flex flex-col h-full w-full p-10"
            v-if="activeFillot"
        >
            <div class="flex items-start justify-end mb-4">
                <div class="bg-blue-500 text-white rounded-lg p-3">
                    <p class="font-semibold">{{ user.firstName }}</p>
                    <p>Hello, how are you?</p>
                </div>
            </div>

            <div class="flex items-start mb-4">
                <div class="bg-green-500 text-white rounded-lg p-3">
                    <p class="font-semibold">{{ activeFillot.infos["2"] }}</p>
                    <p>I'm good, thanks!</p>
                </div>
            </div>

            {{ activeFillot }}
        </div>
    </div>
    <LoginComponent v-else />
</template>

<script setup lang="ts">
import { computed, ref, Ref, onBeforeUnmount } from "vue";
import { pb, user } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import { RecordModel } from "pocketbase";
import HeaderComponent from "@/components/HeaderComponent.vue";

const MAXIMUM_FILLOTS = 1;

interface Fillot extends RecordModel {
    prenom: string;
    nom: string;
    infos: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
        "20": string;
        "21": string;
        "22": string;
        "23": string;
        "24": string;
        "25": string;
        "26": string;
        "27": string;
        "28": string;
        "29": string;
        "30": string;
        "31": string;
        "32": string;
        "33": string;
    };
    filiere: string;
    parrain: string;
}

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
                .startsWith(search.value.toLowerCase())
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

const activeFillot = ref<Fillot>();

const mayAdopt = computed(() => {
    const count = liste_fillots.value.filter((fillot) => {
        if (fillot.parrain === user.value?.id) {
            return fillot;
        }
    }).length;
    return count < MAXIMUM_FILLOTS;
});

pb.collection("Fillots")
    .getFullList({
        sort: "prenom,nom",
        filter: `filiere = "${user.value?.diploma.slice(0, 5)}"`,
    })
    .then((fillots) => {
        liste_fillots.value = fillots as Fillot[];
    });

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
