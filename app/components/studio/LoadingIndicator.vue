<script setup lang="ts">
import IconSpinner from "../icons/IconSpinner.vue";
</script>

<template>
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <div class="flex items-center gap-2 text-muted-foreground">
            <IconSpinner width="20" height="20" />
            <span class="text-sm">Loading preview...</span>
        </div>
    </div>
</template>
