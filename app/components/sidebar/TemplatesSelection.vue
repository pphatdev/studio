<script setup lang="ts">
import IconCheck from "../icons/IconCheck.vue";

defineProps<{
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
        <div class="grid grid-cols-2 gap-3">
            <button
                v-for="template in templates"
                :key="template.name"
                @click="emit('select', template.name)"
                class="flex flex-col items-center gap-2 cursor-pointer overflow-clip text-xs font-medium rounded-xl transition-all border-2 relative"
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
                    class="w-full h-auto rounded-xl"
                />
                <span
                    v-else
                    class="text-xs font-medium text-muted-foreground"
                >
                    {{ template.title }}
                </span>
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
</template>
