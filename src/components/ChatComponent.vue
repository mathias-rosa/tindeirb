<template>
    <p class="text-gray-800 dark:text-gray-200 text-center w-full">
        Début de votre discussion avec {{ activeFillot.prenom }}
    </p>

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
        message="Je te contacte parce que je cherche un fillot / une fillote."
    />
    <RightBubble message="Je peux te poser quelques questions ?" />

    <LeftBubble :sender="activeFillot.prenom" message="Ouais carément !" />

    <RightBubble :sender="user.firstName" message="Ok trop bien !" />
    <RightBubble
        :message="`Tu peux me donner tes mensurations ? \n (comme première question c'est bizare mais c'est pas moi mdr)`"
    />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['8']"
    />

    <RightBubble :sender="user.firstName" message="Ok nickel 👌" />
    <RightBubble
        message="Si tu devais changer de nom, comment tu t'appellerais ?"
    />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="`${activeFillot.infos['7']} ${activeFillot.infos['6']}`"
    />

    <RightBubble
        v-if="
            activeFillot.infos['7'] === activeFillot.prenom &&
            activeFillot.infos['6'] === activeFillot.nom
        "
        :sender="user.firstName"
        message="Pas très original 😅"
    />
    <RightBubble v-else :sender="user.firstName" message="Stylé !" />

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

    <RightBubble :sender="user.firstName" message="Ouah 🤩 ! Trop bien !" />
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

    <RightBubble :sender="user.firstName" message="Ton but dans la vie ?" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['16']"
    />

    <RightBubble :sender="user.firstName" message="Intéressant 🤔" />
    <RightBubble
        message="Avant de continuer, il faut que tu saches un truc..."
    />

    <RightBubble
        message="L'ENSEIRB à la chance d'avoir une vie associative très développée avec de nombreux clubs. N'hésite pas à y prendre part !"
    />
    <RightBubble message="Penses tu que la vie associative est-elle morte ?" />
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

    <RightBubble :sender="user.firstName" message="Je vois 😉" />

    <RightBubble
        message="Et es-tu d'accord avec cette affirmation : BDE >> BAR ?"
    />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['19']"
    />
    <RightBubble :sender="user.firstName" message="Bonne réponse !" />

    <RightBubble message="et c'est quoi ”un listeux” ?" />

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

    <RightBubble :sender="user.firstName" message="Comment ça mon reuf ?" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['22']"
    />

    <RightBubble :sender="user.firstName" message="Ok prochaine rubrique" />
    <RightBubble message="Fais nous rêver c'est ton moment !" />
    <RightBubble message="Quel est l'objectif de ton année ?" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['23']"
    />

    <RightBubble
        :sender="user.firstName"
        message="Si tu étais un légume, lequel serais-tu et pourquoi ?"
    />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['24']"
    />

    <RightBubble :sender="user.firstName" message="C'est quoi 22 ?" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['25']"
    />

    <RightBubble
        :sender="user.firstName"
        :message="`Imagine que tu te trouves paisiblement à bord d'un Drakkar en pleine navigation. \nTout à coup, tu repères un énorme bateau de croisière aux couleurs bleu et jaune qui fonce vers toi à toute vitesse. \nUne collision semble inévitable !\nTon Drakkar est violemment percuté et explose, disparaissant dans les profondeurs de l'océan. Tu te retrouves à la dérive, emporté par les courants pendant de longues heures, jusqu'à échouer finalement sur les rivages d'une île isolée.\n   \nDe tout ce qui restait de ton Drakkar, tu as pu sauver uniquement un marcel noir avec un logo étrange, une raquette de ping-pong, un baril d'huile d'olive, et une moula. \nFace à cette situation difficile, que ferais-tu pour assurer ta survie en attendant l'arrivée des secours ?`"
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

    <RightBubble :sender="user.firstName" message="A batard tu fume ?" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['28']"
    />

    <RightBubble
        :sender="user.firstName"
        message="Quel est pour toi le parrain ou la marraine idéal.e"
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

    <RightBubble :sender="user.firstName" message="Brasse en eaux profondes" />

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
            activeFillot.infos['33'] === 'NON je le trouve excellent'
                ? 'Non ! Elles étaient super !'
                : activeFillot.infos['33']
        }`"
    />

    <RightBubble :sender="user.firstName" message="Voilà c'est fini !" />
    <RightBubble message="Merci et à bientôt 😁 !" />

    <LeftBubble
        :sender="activeFillot.prenom"
        :message="`Salut ! Mais du coup tu me prends comme ${
            activeFillot.infos['3'] === 'Femme' ? 'fillote' : 'fillot'
        } ?`"
    />

    <!-- {{ activeFillot.infos }} -->

    <div class="chat-footer mx-2">Vu il y a 6 jours</div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Fillot } from "@/api/pocketbase";
import LeftBubble from "@/components/LeftBubble.vue";
import RightBubble from "@/components/RightBubble.vue";
defineProps({
    activeFillot: {
        type: Object as PropType<Fillot>,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});
</script>
