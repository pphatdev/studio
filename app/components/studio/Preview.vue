<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStats } from "../../composables/useStats";
import URLDisplay from "./URLDisplay.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import ErrorState from "./ErrorState.vue";
import PreviewCanvas from "./PreviewCanvas.vue";
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
        <URLDisplay
            :url="statsUrl"
            :copied="copied"
            @copy="copyUrl"
        />

        <!-- Canvas Area -->
        <div
            class="flex-1 relative flex items-center justify-center overflow-auto"
            @wheel.prevent="handleWheel"
        >
            <!-- Grid Pattern Background -->
            <Background/>

            <!-- Loading Indicator -->
            <LoadingIndicator v-if="isLoading" />

            <!-- Error State -->
            <ErrorState
                v-if="hasError && !isLoading"
                @retry="retry"
            />

            <!-- SVG Preview -->
            <PreviewCanvas
                :isDragging="isDragging"
                :zoom="zoom"
                :position="position"
                :imageKey="imageKey"
                :imageUrl="statsUrl"
                :imageAlt="`GitHub ${currentTemplate?.title || 'Stats'} Preview`"
                @startDrag="startDrag"
                @load="handleLoad"
                @error="handleError"
            />
        </div>
    </div>
</template>
