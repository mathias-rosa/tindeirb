<template>
    <div class="chat chat-start">
        <div class="chat-header py-1 px-3" v-if="sender !== ''">
            {{ sender }}
        </div>
        <div class="chat-bubble shadow-sm text-md text-white font-medium">
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
</script>
