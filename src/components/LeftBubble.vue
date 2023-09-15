<template>
    <div class="chat chat-end">
        <div class="chat-header py-1 px-3">
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
