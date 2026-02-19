<script setup lang="ts">
const props = defineProps<{
  zoom: number;
}>();

const emit = defineEmits<{
  (e: "update:zoom", value: number): void;
  (e: "reset"): void;
}>();

const zoomIn = () => {
  const newZoom = Math.min(props.zoom + 0.1, 3);
  emit("update:zoom", newZoom);
};

const zoomOut = () => {
  const newZoom = Math.max(props.zoom - 0.1, 0.25);
  emit("update:zoom", newZoom);
};

const reset = () => {
  emit("reset");
};

const zoomPercentage = computed(() => Math.round(props.zoom * 100));
</script>

<template>
  <div
    class="flex items-center justify-end gap-1 bg-card border border-border rounded-lg p-1 shadow-sm"
  >
    <!-- Zoom Out -->
    <button
      @click="zoomOut"
      :disabled="zoom <= 0.25"
      class="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title="Zoom Out"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </button>

    <!-- Zoom Percentage -->
    <div
      class="px-3 py-1 text-sm font-medium text-foreground min-w-15 text-center"
    >
      {{ zoomPercentage }}%
    </div>

    <!-- Zoom In -->
    <button
      @click="zoomIn"
      :disabled="zoom >= 3"
      class="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title="Zoom In"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </button>

    <!-- Divider -->
    <div class="w-px h-6 bg-border mx-1"></div>

    <!-- Reset -->
    <button
      @click="reset"
      class="p-2 rounded-md hover:bg-accent transition-colors"
      title="Reset Zoom"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>
  </div>
</template>
