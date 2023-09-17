<template>
    <p class="text-gray-800 dark:text-gray-200 text-center w-full">
        Début de votre discussion avec {{ activeFillot.prenom }}
    </p>

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        :message="`Salut ${activeFillot.prenom} ! Comment ça va ?`"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        message="Yo ! Ça va nickel et toi ?"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Super !"
    />

    <RightBubble
        :senderId="user.id"
        message="Je te contacte parce que je cherche un fillot / une fillote."
    />
    <RightBubble
        :senderId="user.id"
        message="Je peux te poser quelques questions ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        message="Ouais carément !"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ok trop bien !"
    />
    <RightBubble
        :senderId="user.id"
        :message="`Tu peux me donner tes mensurations ? \n (comme première question c'est bizare mais c'est pas moi mdr)`"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['8']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ok nickel 👌"
    />
    <RightBubble
        :senderId="user.id"
        message="Si tu devais changer de nom, comment tu t'appellerais ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="`${activeFillot.infos['7']} ${activeFillot.infos['6']}`"
    />

    <RightBubble
        :senderId="user.id"
        v-if="
            activeFillot.infos['7'] === activeFillot.prenom &&
            activeFillot.infos['6'] === activeFillot.nom
        "
        :sender="user.firstName"
        message="Pas très original 😅"
    />
    <RightBubble
        :senderId="user.id"
        v-else
        :sender="user.firstName"
        message="Stylé !"
    />

    <RightBubble
        :senderId="user.id"
        message="Et de quelle formation viens tu ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="`J'ai fait ${activeFillot.infos['9']}`"
    />

    <RightBubble :senderId="user.id" message="Ok et tu viens d'où ? " />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="`Je viens de ${activeFillot.infos['10']}`"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ouah 🤩 ! Trop bien !"
    />
    <RightBubble :senderId="user.id" message="Et pourquoi tu es là ?" />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['11']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Quelles sont tes passions ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['12']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Quelle est ton/tes sports préférés ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['13']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ton style de musique préféré ? (exemples appréciés)"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['14']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Quelle est ta citation préféré ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['15']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ton but dans la vie ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['16']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Intéressant 🤔"
    />
    <RightBubble
        :senderId="user.id"
        message="Avant de continuer, il faut que tu saches un truc..."
    />

    <RightBubble
        :senderId="user.id"
        message="L'ENSEIRB à la chance d'avoir une vie associative très développée avec de nombreux clubs. N'hésite pas à y prendre part !"
    />
    <RightBubble
        :senderId="user.id"
        message="Penses tu que la vie associative est-elle morte ?"
    />
    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['17']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Est ce qu'il y a des associations dont tu aimerais faire partie ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['18']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Je vois 😉"
    />

    <RightBubble
        :senderId="user.id"
        message="Et es-tu d'accord avec cette affirmation : BDE >> BAR ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['19']"
    />
    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Bonne réponse !"
    />

    <RightBubble :senderId="user.id" message="et c'est quoi ”un listeux” ?" />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['20']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Maintenant on va passer dans la rubrique Intimité"
    />
    <RightBubble
        :senderId="user.id"
        message="N'aie pas peur de te confier 😉"
    />
    <RightBubble
        :senderId="user.id"
        message="Quel est ton plus grand fantasme ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['21']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Comment ça mon reuf ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['22']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Ok prochaine rubrique"
    />
    <RightBubble
        :senderId="user.id"
        message="Fais nous rêver c'est ton moment !"
    />
    <RightBubble
        :senderId="user.id"
        message="Quel est l'objectif de ton année ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['23']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Si tu étais un légume, lequel serais-tu et pourquoi ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['24']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="C'est quoi 22 ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['25']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        :message="`Imagine que tu te trouves paisiblement à bord d'un Drakkar en pleine navigation. \nTout à coup, tu repères un énorme bateau de croisière aux couleurs bleu et jaune qui fonce vers toi à toute vitesse. \nUne collision semble inévitable !\nTon Drakkar est violemment percuté et explose, disparaissant dans les profondeurs de l'océan. Tu te retrouves à la dérive, emporté par les courants pendant de longues heures, jusqu'à échouer finalement sur les rivages d'une île isolée.\n   \nDe tout ce qui restait de ton Drakkar, tu as pu sauver uniquement un marcel noir avec un logo étrange, une raquette de ping-pong, un baril d'huile d'olive, et une moula. \nFace à cette situation difficile, que ferais-tu pour assurer ta survie en attendant l'arrivée des secours ?`"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['26']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Comment décrirais-tu ta relation avec l'alcool ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['27']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="A batard tu fume ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['28']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Quel est pour toi le parrain ou la marraine idéal.e"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['29']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Tu préfères un parrain ou une marraine ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['30']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Brasse en eaux profondes"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['31']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Une petite anecdote pour finir ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="activeFillot.infos['32']"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Les questions que je t'ai posées sont elles merdiques ?"
    />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="`${
            activeFillot.infos['33'] === 'NON je le trouve excellent'
                ? 'Non ! Elles étaient super !'
                : activeFillot.infos['33']
        }`"
    />

    <RightBubble
        :senderId="user.id"
        :sender="user.firstName"
        message="Voilà c'est fini !"
    />
    <RightBubble :senderId="user.id" message="Merci et à bientôt 😁 !" />

    <LeftBubble
        :senderId="activeFillot.id"
        :sender="activeFillot.prenom"
        :message="`Salut ! Mais du coup tu me prends comme ${
            activeFillot.infos['3'] === 'Femme' ? 'fillote' : 'fillot'
        } ?`"
    />

    <!-- {{ activeFillot.infos }} -->

    <div class="chat-footer mx-2">Vu il y a 6 jours</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
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
