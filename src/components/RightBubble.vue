<template>
    <div class="chat chat-end" v-if="message">
        <div class="chat-header py-1 px-3" v-if="sender">
            {{ sender }}
        </div>
        <div
            class="chat-bubble shadow-sm text-md bg-white text-gray-800 font-medium"
        >
            <p v-if="message" style="white-space: pre-wrap">
                {{ message }}
            </p>

            <p v-else>
                En tant qu'élève de première année à l'ENSEIRB-MATMECA, il est
                important de noter que mes connaissances sont basées sur des
                informations disponibles jusqu'à ma date de connaissance en
                septembre 2021. Si la question concerne un sujet ou un domaine
                spécifique lié à l'ENSEIRB-MATMECA qui a évolué depuis cette
                date, je pourrais ne pas avoir les informations les plus
                récentes à ce sujet. Dans ce cas, je vous recommande de
                consulter vos professeurs, vos camarades de classe ou les
                ressources pédagogiques fournies par l'école pour obtenir une
                réponse précise et à jour. Je suis là pour vous aider dans la
                mesure de mes capacités, en fournissant des informations
                générales et des conseils dans la mesure de mes connaissances
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    sender: String,
    message: String,
});
</script>
