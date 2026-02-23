<script setup lang="ts">
import IconAlertCircle from "../icons/IconAlertCircle.vue";

defineEmits<{
    (e: "retry"): void;
}>();
</script>

<template>
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <div class="text-center text-muted-foreground">
            <IconAlertCircle width="48" height="48" />
            <p class="text-sm">Failed to load preview</p>
            <p class="text-xs mt-1 mb-3">
                Check the username and try again
            </p>
            <button
                @click="$emit('retry')"
                class="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
                Retry
            </button>
        </div>
    </div>
</template>
