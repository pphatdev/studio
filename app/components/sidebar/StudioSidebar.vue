<script setup lang="ts">
import { computed } from "vue";
import SidebarHeader from "./SidebarHeader.vue";
import UsernameInput from "./UsernameInput.vue";
import TemplatesSelection from "./TemplatesSelection.vue";
import TemplateOptions from "./TemplateOptions.vue";
import IconX from "../icons/IconX.vue";

// Props
const props = defineProps<{
    isOpen: boolean;
}>();

// Emits
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const { stats, selectedTemplate, templates, currentTemplate } = useStats();

// Get current template options
const currentOptions = computed(() => {
    return currentTemplate.value?.options || [];
});

// Handle username change
const onUsernameChange = (newUsername: string) => {
    stats.value.username = newUsername;
};

// Handle template change
const onTemplateChange = (templateName: string) => {
    selectedTemplate.value = templateName;
};

// Handle option change
const onOptionChange = (name: string, value: any) => {
    stats.value[name] = value;
};
</script>

<template>
    <aside
        :class="[
            'w-72 h-screen bg-background flex flex-col overflow-hidden',
            'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300',
            props.isOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:relative lg:translate-x-0'
        ]"
    >
        <!-- Mobile Close Button -->
        <button
            @click="emit('close')"
            class="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            aria-label="Close sidebar"
        >
            <IconX :width="16" :height="16" />
        </button>

        <!-- Header -->
        <SidebarHeader />

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
            <!-- Username Input -->
            <UsernameInput
                :username="stats.username"
                @update:username="onUsernameChange"
            />

            <!-- Templates Selection -->
            <TemplatesSelection
                :templates="templates"
                :selectedTemplate="selectedTemplate"
                :currentTemplateTitle="currentTemplate?.title || 'Stats'"
                @select="onTemplateChange"
            />

            <!-- Dynamic Options -->
            <TemplateOptions
                v-if="currentTemplate"
                :options="currentOptions"
                :stats="stats"
                @updateOption="onOptionChange"
            />
        </div>
    </aside>
</template>
