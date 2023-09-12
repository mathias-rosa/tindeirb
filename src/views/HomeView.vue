<template>
    <div class="flex items-center w-full h-full" v-if="user">
        <div class="w-full lg:max-w-lg h-full self-start">
            <HeaderComponent />
            <div class="w-full p-5">
                <input
                    type="text"
                    placeholder="Rechercher un fillot par son nom"
                    v-model="search"
                    class="w-full px-5 py-3 rounded-full box-border bg-gray-100 outline-none hover:ring-2 hover:ring-gray-500 transition duration-300 ease-in-out"
                />
            </div>
            <div>
                <div
                    v-for="fillot in filteredFillots"
                    :key="fillot.Prenom"
                    class="flex gap-5 justify-between shadow-sm py-3 px-5 mb-1 w-full cursor-pointer items-center transition duration-500 ease-in-out hover:bg-gradient-to-tr from-yellow-500/5 to-rose-600/5"
                    @click="activeFillot = fillot"
                    :class="{
                        'bg-gradient-to-tr from-yellow-500/5 to-rose-600/5':
                            activeFillot === fillot,
                        'bg-white': activeFillot !== fillot,
                    }"
                >
                    <img
                        :src="'https://cataas.com/cat?cas=' + fillot.cas"
                        class="w-16 h-16 rounded-full aspect-square object-cover"
                    />
                    <div class="flex flex-col w-full text-gray-500">
                        <h1
                            class="font-semibold text-2xl px-2 w-full text-ellipsis text-gray-900"
                        >
                            {{ fillot.Prenom }} {{ fillot.Nom }}
                        </h1>
                        <button
                            class="w-fit hover:bg-red-700 hover:translate-x-2 py-1 px-2 rounded-full transition duration-200 ease-in-out bg-red-500 text-white"
                            @click="unselectFillot(fillot.cas)"
                            v-if="fillot.Parrain === user.id"
                        >
                            Abandonner ce fillot
                        </button>
                        <button
                            class="w-fit hover:bg-green-500 hover:translate-x-2 hover:text-white py-1 px-2 rounded-full transition duration-200 ease-in-out"
                            @click="selectFillot(fillot.cas)"
                            v-else-if="fillot.Parrain === '' && mayAdopt"
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
                        <h1 v-else class="red-500">Ce 1A a déjà été adopté</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 hidden sm:flex flex-col h-full w-full">
            {{ activeFillot }}
        </div>
    </div>
    <LoginComponent v-else />
</template>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { pb, user } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import { RecordModel } from "pocketbase";
import HeaderComponent from "@/components/HeaderComponent.vue";

const MAXIMUM_FILLOTS = 1;

interface Fillot extends RecordModel {
    Prenom: string;
    Nom: string;
    Infos: JSON;
    Parrain: string;
    cas: string;
}

const liste_fillots: Ref<Fillot[]> = ref([]);

const search = ref("");

const filteredFillots = computed(() =>
    liste_fillots.value.filter((fillot) => {
        if (
            (
                fillot.Prenom.toLowerCase() +
                " " +
                fillot.Nom.toLowerCase()
            ).includes(search.value.toLowerCase()) ||
            (
                fillot.Nom.toLowerCase() +
                " " +
                fillot.Prenom.toLowerCase()
            ).includes(search.value.toLowerCase()) ||
            fillot.cas.toLowerCase().includes(search.value.toLowerCase())
        ) {
            return fillot;
        }
    })
);

const selectFillot = async (cas: string) => {
    const fillot = liste_fillots.value.find((fillot) => {
        if (fillot.cas === cas) {
            return fillot;
        }
    });
    if (!fillot) {
        return alert("Fillot non trouvé");
    }
    await pb.collection("Fillots").update(fillot.id, {
        Parrain: user.value?.id,
    });
};

const activeFillot = ref<Fillot>();

const unselectFillot = async (cas: string) => {
    const fillot = liste_fillots.value.find((fillot) => {
        if (fillot.cas === cas) {
            return fillot;
        }
    });
    if (!fillot) {
        return alert("Fillot non trouvé");
    }
    await pb.collection("Fillots").update(fillot.id, {
        Parrain: "",
    });
};

const mayAdopt = computed(() => {
    const count = liste_fillots.value.filter((fillot) => {
        if (fillot.Parrain === user.value?.id) {
            return fillot;
        }
    }).length;
    return count < MAXIMUM_FILLOTS;
});

pb.collection("Fillots")
    .getFullList()
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
</script>
