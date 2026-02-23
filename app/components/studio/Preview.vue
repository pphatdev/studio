<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStats } from "../../composables/useStats";
import IconCopy from "../icons/IconCopy.vue";
import IconCheck from "../icons/IconCheck.vue";
import IconSpinner from "../icons/IconSpinner.vue";
import IconAlertCircle from "../icons/IconAlertCircle.vue";
import Background from "../icons/background.vue";

const props = defineProps<{ zoom: number }>();

const emit = defineEmits<{ (e: "resetPosition"): void; (e: "update:zoom", value: number): void; }>();

const { statsUrl, selectedTemplate, currentTemplate } = useStats();

const isLoading = ref(true);
const hasError = ref(false);
const imageKey = ref(0);
const copied = ref(false);

// Drag state
const isDragging = ref(false);
const position = ref({ x: 0, y: 0 });
const dragStart = ref({ x: 0, y: 0 });

const handleLoad = () => {
    isLoading.value = false;
    hasError.value = false;
};

const handleError = () => {
    isLoading.value = false;
    hasError.value = true;
};

const retry = () => {
    isLoading.value = true;
    hasError.value = false;
    imageKey.value++;
};

const copyUrl = async () => {
    await navigator.clipboard.writeText(statsUrl.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};

// Drag handlers
const startDrag = (e: MouseEvent) => {
    isDragging.value = true;
    dragStart.value = {
        x: e.clientX - position.value.x,
        y: e.clientY - position.value.y,
    };
};

const onDrag = (e: MouseEvent) => {
    if (!isDragging.value) return;
    position.value = {
        x: e.clientX - dragStart.value.x,
        y: e.clientY - dragStart.value.y,
    };
};

const stopDrag = () => {
    isDragging.value = false;
};

// Reset position
const resetPosition = () => {
    position.value = { x: 0, y: 0 };
};

// Wheel zoom handler
const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(props.zoom + delta, 0.25), 3);
    emit("update:zoom", newZoom);
};

// Expose reset for parent
defineExpose({ resetPosition });

// Reset loading state when URL changes
watch(statsUrl, () => {
    isLoading.value = true;
    hasError.value = false;
    imageKey.value++;
});

// Also watch for template changes directly
watch(
    selectedTemplate,
    () => {
        isLoading.value = true;
        hasError.value = false;
        imageKey.value++;
    },
    { immediate: false },
);

// Trigger initial load on client
onMounted(() => {
    imageKey.value++;
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
});
</script>

<template>
    <div class="relative w-full h-full flex flex-col overflow-hidden bg-[#f8f8f8]">
        <!-- URL Display -->
        <div
            class="p-2 bg-muted/50 border-b border-border text-xs text-muted-foreground flex items-center gap-2"
        >
            <span class="font-mono flex-1 truncate">{{ statsUrl }}</span>
            <button
                @click="copyUrl"
                class="shrink-0 p-1.5 rounded hover:bg-accent transition-colors cursor-pointer"
                :title="copied ? 'Copied!' : 'Copy URL'"
            >
                <IconCopy v-if="!copied" />
                <IconCheck v-else />
            </button>
        </div>

        <!-- Canvas Area -->
        <div
            class="flex-1 relative flex items-center justify-center overflow-auto"
            @wheel.prevent="handleWheel"
        >
            <!-- Grid Pattern Background -->
            <Background/>

            <!-- Loading Indicator -->
            <div
                v-if="isLoading"
                class="absolute inset-0 flex items-center justify-center z-10"
            >
                <div class="flex items-center gap-2 text-muted-foreground">
                    <IconSpinner width="20" height="20" />
                    <span class="text-sm">Loading preview...</span>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-if="hasError && !isLoading"
                class="absolute inset-0 flex items-center justify-center z-10"
            >
                <div class="text-center text-muted-foreground">
                    <IconAlertCircle width="48" height="48" />
                    <p class="text-sm">Failed to load preview</p>
                    <p class="text-xs mt-1 mb-3">
                        Check the username and try again
                    </p>
                    <button
                        @click="retry"
                        class="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                    >
                        Retry
                    </button>
                </div>
            </div>

            <!-- SVG Preview -->
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
                @mousedown.prevent="startDrag"
            >
                <img
                    :key="imageKey"
                    :src="statsUrl"
                    :alt="`GitHub ${currentTemplate?.title || 'Stats'} Preview`"
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
        </div>
    </div>
</template>
