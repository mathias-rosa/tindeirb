<template>
    <div class="chat chat-end">
        <div class="chat-header py-1 px-3" v-if="sender">
            {{ sender }}
        </div>
        <div
            class="chat-bubble shadow-sm text-md bg-white text-gray-800 font-medium text-right"
            style="word-break: break-word"
        >
            {{ message.replace(/\\n/g, '<br />') }}
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
