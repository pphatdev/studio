<script setup lang="ts">
defineProps<{
    isDragging: boolean;
    zoom: number;
    position: { x: number; y: number };
    imageKey: number;
    imageUrl: string;
    imageAlt: string;
}>();

const emit = defineEmits<{
    (e: "startDrag", event: MouseEvent): void;
    (e: "load"): void;
    (e: "error"): void;
}>();

const handleMouseDown = (e: MouseEvent) => {
    emit("startDrag", e);
};

const handleLoad = () => {
    emit("load");
};

const handleError = () => {
    emit("error");
};
</script>

<template>
    <div
        class="relative z-0 select-none"
        :class="{
            'cursor-grabbing': isDragging,
            'cursor-grab': !isDragging,
            'transition-transform duration-200 ease-out': !isDragging,
        }"
        :style="{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
        }"
        @mousedown.prevent="handleMouseDown"
    >
        <img
            :key="imageKey"
            :src="imageUrl"
            :alt="imageAlt"
            class="max-w-none shadow-lg rounded-lg pointer-events-none"
            referrerpolicy="no-referrer"
            @load="handleLoad"
            @error="handleError"
            onerror="
                this.onerror = null;
                this.style.display = 'none';
            "
            draggable="false"
        />
    </div>
</template>
