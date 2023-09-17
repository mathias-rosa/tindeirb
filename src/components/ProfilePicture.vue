<template>
    <svg
        class="w-full h-full aspect-square object-cover"
        v-html="avatar(seed)"
    ></svg>
</template>

<script setup lang="ts">
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

defineProps({
    seed: {
        type: String,
        required: true,
    },
});

const avatar = (id: string) => {
    return createAvatar(funEmoji, {
        seed: id,
        radius: 50,
        mouth: [
            "plain",
            "lilSmile",
            "cute",
            "wideSmile",
            "smileTeeth",
            "smileLol",
            "tongueOut",
            "faceMask",
        ],
    });
};
</script>
