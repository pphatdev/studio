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
        :width="width || 20"
        :height="height || 20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="cn('text-foreground/50', className)"
    >
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
</template>
