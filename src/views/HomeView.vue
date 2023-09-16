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

            <div class="overflow-y-scroll m-2 mr-0 pr-1">
                <div
                    v-for="fillot in filteredFillots"
                    :key="fillot.id"
                    class="flex gap-2 justify-between p-3 mb-1 w-full cursor-pointer items-center rounded-md"
                    @click="activeFillotId = fillot.id"
                    :class="{
                        'bg-rose-500 text-white': activeFillotId === fillot.id,
                        'bg-white hover:bg-rose-100 ':
                            activeFillotId !== fillot.id,
                    }"
                >
                    <img
                        :src="'https://cataas.com/cat?cas=' + fillot.id"
                        class="w-12 h-12 rounded-full aspect-square object-cover"
                    />
                    <div
                        class="flex flex-col w-full text-gray-500"
                        :class="{
                            'text-white': activeFillotId === fillot.id,
                        }"
                    >
                        <h1
                            class="font-semibold text-xl px-2 w-full text-ellipsis text-gray-900"
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
                    <RightBubble
                        :sender="user.firstName"
                        :message="`Salut ${activeFillot.prenom} ! Comment ça va ?`"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        message="Yo ! Ça va nickel et toi ?"
                    />

                    <RightBubble :sender="user.firstName" message="Super !" />

                    <RightBubble
                        message="Je te contacte parce que je cherche un fillot."
                    />
                    <RightBubble
                        message="Je peux te poser quelques questions ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        message="Ouais carément !"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ok trop bien !"
                    />
                    <RightBubble
                        message="Tu peux me donner ta Mensuration ? \n (comme première question c'est bizare mais c'est pas moi mdr)"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['8']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ok nickel 👌"
                    />
                    <RightBubble message="Et de quelle formation viens tu ?" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="`J'ai fait ${activeFillot.infos['9']}`"
                    />

                    <RightBubble message="Ok et tu viens d'où ? " />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="`Je viens de ${activeFillot.infos['10']}`"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ouah 🤩 ! Trop bien !"
                    />
                    <RightBubble message="Et pourquoi tu es là ?" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['11']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Quelles sont tes passions ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['12']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Quelle est ton/tes sports préférés ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['13']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ton style de musique préféré ? (exemples appréciés)"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['14']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Quelle est ta citation préféré ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['15']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ton but dans la vie ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['16']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Intéressant 🤔"
                    />
                    <RightBubble
                        message="Avant de continuer, il faut que tu saches un truc..."
                    />

                    <RightBubble
                        message="L'ENSEIRB à la chance d'avoir une vie associative très développée avec de nombreux clubs. N'hésite pas à y prendre part !"
                    />
                    <RightBubble
                        message="Penses tu que la vie associative est-elle morte ?"
                    />
                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['17']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Est ce qu'il y a des associations dont tu aimerais faire partie ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['18']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Je vois 😉"
                    />

                    <RightBubble
                        message="Et es-tu d'accord avec cette affirmation : BDE >> BAR ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['19']"
                    />
                    <RightBubble
                        :sender="user.firstName"
                        message="Bonne réponse !"
                    />

                    <RightBubble message="et c'est quoi ”un listeux” ?" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['20']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="C'est quoi ”un listeux” ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['20']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Maintenant on va passer dans la rubrique Intimité"
                    />
                    <RightBubble message="N'aie pas peur de te confier 😉" />
                    <RightBubble message="Quel est ton plus grand fantasme ?" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['21']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Comment ça mon reuf ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['22']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Ok prochaine rubrique"
                    />
                    <RightBubble message="Fais nous rêver c'est ton moment !" />
                    <RightBubble message="Quel est l'objectif de ton année :" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['23']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Si tu était un légume, lequel serais-tu et pourquoi?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['24']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="C'est quoi 22 ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['25']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="
                        Imagine que tu te trouves paisiblement à bord d'un Drakkar en pleine navigation. \n
                        Tout à coup, tu repères un énorme bateau de croisière aux couleurs bleu et jaune qui fonce vers toi à toute vitesse.
                        Une collision semble inévitable ! \n 
                        Ton Drakkar est violemment percuté et explose, disparaissant dans les profondeurs de l'océan. Tu te retrouves à la dérive, emporté par les courants pendant de longues heures, jusqu'à échouer finalement sur les rivages d'une île isolée.
                        \n\n 
                        De tout ce qui restait de ton Drakkar, tu as pu sauver uniquement un marcel noir avec un logo étrange, une raquette de ping-pong, un baril d'huile d'olive, et une moula. \n
                        Face à cette situation difficile, que ferais-tu pour assurer ta survie en attendant l'arrivée des secours ?
                        "
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['26']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Comment décrirais-tu ta relation avec l'alcool ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['27']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="A batard tu fume ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['28']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Pour toi le parrain idéal :"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['29']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Tu préfères un parrain ou une marraine ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['30']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Brasse en eaux profondes"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['31']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Une petite anecdote pour finir ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="activeFillot.infos['32']"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Les questions que je t'ai posées sont elles merdiques ?"
                    />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="`${
                            activeFillot.infos['33'] ===
                            'NON je le trouve excellent'
                                ? 'Non ! Elles étaient super !'
                                : activeFillot.infos['33']
                        }`"
                    />

                    <RightBubble
                        :sender="user.firstName"
                        message="Voilà c'est fini !"
                    />
                    <RightBubble message="Merci et à bientôt 😁 !" />

                    <LeftBubble
                        :sender="activeFillot.prenom"
                        :message="`Salut ! Mais du coup tu me prends comme ${
                            activeFillot.infos['3'] === 'Femme'
                                ? 'fillote'
                                : 'fillot'
                        } ?`"
                    />

                    <div class="chat-footer mx-2">Vu il y a 6 jouts</div>
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
