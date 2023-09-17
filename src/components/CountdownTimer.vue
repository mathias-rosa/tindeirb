<template>
    <!-- <p>{{ targetDate.toLocaleDateString() }}</p> -->
    <p v-if="timeRemaining > 0" class="font-semibold inline-block">
        {{
            `${
                days > 0
                    ? days === 1
                        ? days + " jour,"
                        : days + " jours, "
                    : ""
            }`
        }}
        {{ `${hours > 0 ? hours + "h, " : ""}` }}
        {{ `${minutes > 0 ? minutes + "min et " : ""}` }}
        {{ seconds }}s
    </p>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export default {
    props: {
        targetDate: {
            type: Date,
            required: true,
        },
    },
    setup(props) {
        const currentTime = ref(new Date());

        const timeRemaining = computed(() =>
            Math.max(
                props.targetDate.getTime() - currentTime.value.getTime(),
                0
            )
        );

        const days = computed(() =>
            Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
        );
        const hours = computed(() =>
            Math.floor(
                (timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
        );
        const minutes = computed(() =>
            Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
        );
        const seconds = computed(() =>
            Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
        );

        const milliseconds = computed(() =>
            Math.floor(timeRemaining.value % 1000)
        );

        const updateTime = () => {
            currentTime.value = new Date();
        };

        let interval: ReturnType<typeof setInterval>;

        onMounted(() => {
            // Mettre à jour le compte à rebours chaque seconde
            interval = setInterval(updateTime, 1000);
        });

        onBeforeUnmount(() => {
            // Arrêter de mettre à jour le compte à rebours lorsque le composant est détruit
            clearInterval(interval);
        });

        return {
            timeRemaining,
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
        };
    },
};
</script>

<style scoped>
/* Ajoutez ici votre style CSS personnalisé si nécessaire */
</style>
