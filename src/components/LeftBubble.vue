<template>
    <div class="chat chat-start">
        <div class="chat-header py-1 px-3" v-if="sender">
            {{ sender }}
        </div>
        <div class="chat-bubble shadow-sm text-md text-white font-medium">
            <p v-if="message" style="white-space: pre-wrap">
                {{ beautifyMessage(message) }}
            </p>
            <p v-else>
                {{
                    defautltMessages[
                        (Math.random() * defautltMessages.length) | 0
                    ]
                }}
            </p>
        </div>
        <div class="chat-footer py-1" v-if="!message">
            Cette réponse a été générée automatiquement par Tind'eirb
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    sender: String,
    message: String,
});

const beautifyMessage = (message: string) => {
    message = message.replace(/Tu adores l'ENSEIRB/g, "J'adore l'ENSEIRB");
    message = message.replace(/Tu aimes le soleil/g, "J'aime le soleil");
    message = message.replace(/Tu as foiré tes oraux/g, "J'ai foiré mes oraux");
    switch (message) {
        case "Parrain":
            return "Je préfère un parrain";
        case "Marraine":
            return "Je préfère une marraine";
        default:
            return message;
    }
};

const defautltMessages = [
    "En tant qu'élève de première année à l'ENSEIRB-MATMECA, il est important de noter que j'ai la flemme de répondre à cette question.",
    "C'est un secret bien gardé, même ma machine à café n'est pas au courant !",
    "C'est un mystère plus grand que la recette du Colonel Sanders !",
    "Je pourrais te répondre, mais cela briserait le continuum espace-temps. On n'a pas besoin de ça en ce moment, non ?",
    "Je ne peux pas répondre à ça sans un selfie de toi portant un chapeau en aluminium pour la protection contre les extraterrestres !",
    "Hélas, mon clavier a soudainement développé une allergie aux réponses à cette question !",
    "Si je réponds à cette question, les licornes perdront leur magie, alors je préfère m'abstenir.",
    "Désolé, je suis en grève des réponses aujourd'hui !",
    "La dernière fois que j'ai répondu à cette question, une armée de pingouins a envahi ma mémoire. Vraiment, c'était un carnage !",
    "Si je réponds à cela, je devrais également vous dire où est caché le trésor, et c'est un secret bien gardé !",
    "Je suis désolé, mais la réponse à cette question est classée top secrète, même pour moi.",
    "Je préfère ne pas répondre à cette question pour éviter une rupture dans le continuum espace-temps. Qui sait ce qui pourrait arriver ?",
    "Hmmm, je sens que cette question est une diversion pour que vous puissiez voler mes cookies virtuels !",
];
</script>
