<script setup lang="ts">
defineProps<{
    width?: number | string;
    height?: number | string;
}>();
</script>

<template>
    <svg
        :width="width || 14"
        :height="height || 14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        />
    </svg>
</template>
