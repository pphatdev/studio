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
        :width="width || 48"
        :height="height || 48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="cn('mx-auto mb-3 opacity-50', className)"
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
</template>
