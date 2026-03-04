<script setup lang="ts">
import { ref, computed, watch } from "vue";
import IconCheck from "../icons/IconCheck.vue";

const props = defineProps<{
    templates: Array<{
        name: string;
        title: string;
        icon?: string;
    }>;
    selectedTemplate: string;
    currentTemplateTitle: string;
}>();

const emit = defineEmits<{
    (e: "select", templateName: string): void;
}>();

const currentIndex = ref(0);

// Sync carousel with selected template
watch(
    () => props.selectedTemplate,
    (newTemplate) => {
        const index = props.templates.findIndex(t => t.name === newTemplate);
        if (index !== -1) {
            currentIndex.value = index;
        }
    },
    { immediate: true }
);

const canGoPrev = computed(() => currentIndex.value > 0);
const canGoNext = computed(() => currentIndex.value < props.templates.length - 1);

const goToPrev = () => {
    if (canGoPrev.value) {
        currentIndex.value--;
        const template = props.templates[currentIndex.value];
        if (template) {
            emit('select', template.name);
        }
    }
};

const goToNext = () => {
    if (canGoNext.value) {
        currentIndex.value++;
        const template = props.templates[currentIndex.value];
        if (template) {
            emit('select', template.name);
        }
    }
};

const goToSlide = (index: number) => {
    currentIndex.value = index;
    const template = props.templates[index];
    if (template) {
        emit('select', template.name);
    }
};
</script>

<template>
    <div class="space-y-2">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-sidebar-foreground">
                Templates
            </h3>
            <span
                class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
            >
                {{ currentTemplateTitle }}
            </span>
        </div>
        <!-- Carousel Container -->
        <div class="relative">
            <!-- Carousel Slides -->
            <div class="overflow-hidden rounded-xl">
                <div 
                    class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                    <button
                        v-for="template in templates"
                        :key="template.name"
                        @click="emit('select', template.name)"
                        class="shrink-0 w-full flex flex-col items-center gap-2 cursor-pointer overflow-clip text-xs font-medium rounded-xl transition-all border-2 relative"
                        :class="
                            selectedTemplate === template.name
                                ? 'bg-primary text-primary-foreground shadow-sm border-primary'
                                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent'
                        "
                    >
                        <img
                            v-if="template.icon"
                            :src="template.icon"
                            :alt="template.title"
                            class="w-full h-32 bg-indigo-950 object-cover object-left rounded-xl"
                        />
                        <!-- <span class="text-sm font-medium">
                            {{ template.title }}
                        </span> -->
                        <!-- Check icon for selected template -->
                        <div
                            v-if="selectedTemplate === template.name"
                            class="absolute top-0 left-0 bg-primary rounded-lg rounded-t-none rounded-l-none p-1 shadow-md"
                        >
                            <IconCheck width="12" height="12" class-name="text-primary-foreground" />
                        </div>
                    </button>
                </div>
            </div>

            <!-- Navigation Arrows -->
            <button
                v-if="canGoPrev"
                @click="goToPrev"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button
                v-if="canGoNext"
                @click="goToNext"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <!-- Carousel Indicators -->
            <div class="flex justify-center gap-2 mt-4">
                <button
                    v-for="(template, index) in templates"
                    :key="`dot-${index}`"
                    @click="goToSlide(index)"
                    class="w-2 h-2 rounded-full transition-all"
                    :class="
                        currentIndex === index
                            ? 'bg-primary w-6'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    "
                    :aria-label="`Go to template ${index + 1}`"
                ></button>
            </div>
        </div>
    </div>
</template>
