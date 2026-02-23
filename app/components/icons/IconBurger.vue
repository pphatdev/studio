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
        :width="width || 24"
        :height="height || 24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="cn('text-foreground/50 size-5', className)"
    >
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
</template>
