<script setup lang="ts">
import IconZoomOut from "../icons/IconZoomOut.vue";
import IconZoomIn from "../icons/IconZoomIn.vue";
import IconReset from "../icons/IconReset.vue";

const props = defineProps<{ zoom: number }>();

const emit = defineEmits<{ (e: "update:zoom", value: number): void; (e: "reset"): void }>();

const zoomIn = () => { const newZoom = Math.min(props.zoom + 0.1, 3); emit("update:zoom", newZoom) };

const zoomOut = () => { const newZoom = Math.max(props.zoom - 0.1, 0.25); emit("update:zoom", newZoom) };

const reset = () => { emit("reset"); };

const zoomPercentage = computed(() => Math.round(props.zoom * 100));
</script>

<template>
    <div class="flex items-center justify-end gap-1 bg-card border rounded-lg p-1" >
        <!-- Zoom Out -->
        <button
            @click="zoomOut"
            :disabled="zoom <= 0.25"
            class="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
        >
            <IconZoomOut />
        </button>

        <!-- Zoom Percentage -->
        <div class="px-3 py-1 text-sm font-medium text-foreground min-w-15 text-center">
            {{ zoomPercentage }}%
        </div>

        <!-- Zoom In -->
        <button
            @click="zoomIn"
            :disabled="zoom >= 3"
            class="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
        >
            <IconZoomIn/>
        </button>

        <!-- Divider -->
        <div class="w-px h-6 bg-border mx-1"></div>

        <!-- Reset -->
        <button
            @click="reset"
            class="p-2 rounded-md hover:bg-accent transition-colors"
            title="Reset Zoom"
        >
            <IconReset />
        </button>
    </div>
</template>
