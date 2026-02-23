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
        class="text-green-600"
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
</template>
