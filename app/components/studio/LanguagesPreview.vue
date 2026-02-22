<script setup lang="ts">
const props = defineProps<{
    zoom: number;
}>();

const emit = defineEmits<{
    (e: 'resetPosition'): void;
    (e: 'update:zoom', value: number): void;
}>();

const { stats, buildQueryString } = useStats();

const isLoading = ref(true);
const hasError = ref(false);
const imageKey = ref(0);
const copied = ref(false);

// Drag state
const isDragging = ref(false);
const position = ref({ x: 0, y: 0 });
const dragStart = ref({ x: 0, y: 0 });

// Build languages URL
const languagesUrl = computed(() => {
    return `https://stats.pphat.top/languages?${buildQueryString.value}`;
});

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
    await navigator.clipboard.writeText(languagesUrl.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};

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

const resetPosition = () => {
    position.value = { x: 0, y: 0 };
    emit('resetPosition');
};

// Wheel zoom handler
const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(props.zoom + delta, 0.25), 3);
    emit('update:zoom', newZoom);
};

// Watch for URL changes to reload image
watch(() => languagesUrl.value, () => {
    retry();
});

defineExpose({
    resetPosition,
});

// Trigger initial load on client
onMounted(() => {
    imageKey.value++;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
    <div class="relative w-full h-full flex flex-col overflow-hidden bg-[#f8f8f8]">
        <!-- URL Display -->
        <div class="p-2 bg-muted/50 border-b border-border text-xs text-muted-foreground flex items-center gap-2">
            <span class="font-mono flex-1 truncate">{{ languagesUrl }}</span>
            <button @click="copyUrl" class="shrink-0 p-1.5 rounded hover:bg-accent transition-colors cursor-pointer"
                :title="copied ? 'Copied!' : 'Copy URL'">
                <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                    <path d="M20 6 9 17l-5-5" />
                </svg>
            </button>
        </div>

        <!-- Canvas Area -->
        <div class="flex-1 relative flex items-center justify-center overflow-auto" @wheel.prevent="handleWheel">
            <!-- Grid Pattern Background -->
            <div
                class="absolute inset-0 bg-[radial-gradient(circle,#d1d1d1_1px,transparent_1px)] bg-size-[20px_20px]" />

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-10">
                <div class="flex items-center gap-2 text-muted-foreground">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="text-sm">Loading preview...</span>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="hasError && !isLoading" class="absolute inset-0 flex items-center justify-center z-10">
                <div class="text-center text-muted-foreground">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 opacity-50">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p class="text-sm">Failed to load preview</p>
                    <p class="text-xs mt-1 mb-3">Check the username and try again</p>
                    <button @click="retry"
                        class="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                        Retry
                    </button>
                </div>
            </div>

            <!-- SVG Preview -->
            <div class="relative z-0 select-none" :class="{
                'cursor-grabbing': isDragging,
                'cursor-grab': !isDragging,
                'transition-transform duration-200 ease-out': !isDragging
            }" :style="{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }"
                @mousedown.prevent="startDrag">
                <img :key="imageKey" :src="languagesUrl" alt="GitHub Top Languages Preview"
                    class="max-w-none shadow-lg rounded-lg pointer-events-none" referrerpolicy="no-referrer"
                    @load="handleLoad" @error="handleError" onerror="this.onerror=null;this.style.display='none';"
                    draggable="false" />
            </div>
        </div>
    </div>
</template>
