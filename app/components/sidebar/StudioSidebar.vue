<script setup lang="ts">
import { computed } from "vue";
import SidebarHeader from "./SidebarHeader.vue";
import UsernameInput from "./UsernameInput.vue";
import TemplatesSelection from "./TemplatesSelection.vue";
import TemplateOptions from "./TemplateOptions.vue";

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
        class="w-72 h-screen bg-sidebar-background border border-r flex flex-col overflow-hidden"
    >
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
