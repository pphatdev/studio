<script setup lang="ts">
import { cn } from '../../utils/utils';
defineProps<{
    width?: number | string;
    height?: number | string;
    className?: string;
}>();
</script>

<template>
    <svg
        :width="width || 16"
        :height="height || 16"
        viewBox="0 0 24 24"
        fill="none"
        :class="cn(className)"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
</template>
