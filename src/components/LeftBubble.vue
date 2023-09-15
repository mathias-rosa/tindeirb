<template>
    <div class="chat chat-end">
        <div class="chat-header py-1 px-3" v-if="sender !== ''">
            {{ sender }}
        </div>
        <div
            class="chat-bubble shadow-sm text-md bg-white text-rose-500 font-medium"
        >
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    sender: String,
    message: {
        type: String,
        required: true,
    },
});
</script>
