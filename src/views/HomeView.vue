<template>
    <div class="flex flex-col items-center w-full" v-if="user">
        <h1>Bonjour {{ user.name }}</h1>
        <h1>Liste des fillots :</h1>
        <div>
            <div
                v-for="fillot in liste_fillots"
                :key="fillot.Prenom"
                class="flex flex-col gap-1 w-fit shadow-md p-3 m-2 rounded-md cursor-pointer"
            >
                <h1>{{ fillot.Prenom }} {{ fillot.Nom }}</h1>
                <h1>Informations :</h1>
                <div class="w-full bg-slate-100 p-2 rounded-md">
                    <div
                        v-for="(item, index) in fillot.Infos"
                        :key="index"
                        class="flex gap-x-5 gap-y-1 rounded-md justify-between"
                    >
                        <h1>{{ `${index.toString()}` }}</h1>
                        <p>{{ item }}</p>
                    </div>
                </div>
                <button
                    @click="selectFillot(fillot.cas)"
                    v-if="fillot.Parrain === ''"
                >
                    Choisir ce fillot
                </button>
                <button
                    @click="unselectFillot(fillot.cas)"
                    v-else-if="fillot.Parrain === user.id"
                >
                    Abandonner ce fillot
                </button>
                <h1 v-else class="red-500">Ce 1A a déjà été adopté</h1>
            </div>
        </div>
    </div>
    <LoginComponent v-else />
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { pb, user } from "@/api/pocketbase";
import LoginComponent from "@/components/LoginComponent.vue";
import { RecordModel } from "pocketbase";

interface Fillot extends RecordModel {
    Prenom: string;
    Nom: string;
    Infos: JSON;
    Parrain: string;
    cas: string;
}

const liste_fillots: Ref<Fillot[]> = ref([]);

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
