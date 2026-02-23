<script setup lang="ts">
import { computed } from "vue";

const { stats, selectedTemplate, templates, currentTemplate } = useStats();

// Get current template options
const currentOptions = computed(() => {
    return currentTemplate.value?.options || [];
});

// Helper to determine input type for options
const getInputType = (option: any): string => {
    if (Array.isArray(option.value)) {
        if (typeof option.value[0] === "object") return "select-object";
        return "select";
    }
    if (typeof option.value === "boolean") return "checkbox";
    if (typeof option.value === "object") return "color-picker";
    return "text";
};

// Handle username change
const onUsernameChange = (event: Event) => {
    const newUsername = (event.target as HTMLInputElement).value;
    stats.value.username = newUsername;
};

// Handle template change
const onTemplateChange = (templateName: string) => {
    selectedTemplate.value = templateName;
};
</script>

<template>
    <aside
        class="w-72 h-screen bg-sidebar-background border border-r flex flex-col overflow-hidden"
    >
        <!-- Header -->
        <div class="p-4 flex items-center gap-3 border-b">
            <img
                src="/logo/logo.png"
                alt="Logo"
                class="w-8 h-8 object-contain"
            />
            <h1
                class="text-2xl font-semibold font-ubuntu leading-8 text-sidebar-foreground"
            >
                Studio
            </h1>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
            <!-- Username (from data.json) -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-sidebar-foreground"
                    >Github Username</label
                >
                <input
                    :value="stats.username"
                    @change="onUsernameChange"
                    type="text"
                    placeholder="Enter GitHub username"
                    class="form-select"
                />
            </div>

            <!-- Templates Selection (from data.json) -->
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-sidebar-foreground">
                        Templates
                    </h3>
                    <span
                        class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                    >
                        {{ currentTemplate?.title || "Stats" }}
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button
                        v-for="template in templates"
                        :key="template.name"
                        @click="onTemplateChange(template.name)"
                        class="flex flex-col items-center gap-2 cursor-pointer text-xs font-medium rounded-xl transition-all border-2 relative"
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
                            class="w-full h-auto rounded-lg"
                        />
                        <!-- Active Badge -->
                        <span
                            v-if="selectedTemplate === template.name"
                            class="text-xs font-bold uppercase tracking-wide text-primary-foreground"
                        >
                            Active
                        </span>
                        <span
                            v-else
                            class="text-xs font-medium text-muted-foreground"
                        >
                            {{ template.title }}
                        </span>
                        <!-- Check icon for selected template -->
                        <div
                            v-if="selectedTemplate === template.name"
                            class="absolute top-0.5 left-0.5 bg-primary text-primary-foreground rounded-lg p-1 shadow-md"
                        >
                            <svg
                                class="size-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Dynamic Options (from data.json) -->
            <template v-if="currentTemplate">
                <div
                    v-for="option in currentOptions"
                    :key="option.name"
                    class="flex flex-col gap-2"
                >
                    <!-- Select for array values -->
                    <template v-if="getInputType(option) === 'select'">
                        <label
                            class="text-sm font-medium text-sidebar-foreground"
                            >{{ option.title }}</label
                        >
                        <select
                            :value="String(stats[option.name])"
                            @change="
                                (e) =>
                                    (stats[option.name] = (
                                        e.target as HTMLSelectElement
                                    ).value)
                            "
                            class="form-select"
                        >
                            <option
                                v-for="val in option.value as string[]"
                                :key="String(val)"
                                :value="String(val)"
                            >
                                {{ val }}
                            </option>
                        </select>
                    </template>

                    <!-- Select for object array values (like themes) -->
                    <template
                        v-else-if="getInputType(option) === 'select-object'"
                    >
                        <label
                            class="text-sm font-medium text-sidebar-foreground"
                            >{{ option.title }}</label
                        >
                        <select
                            :value="String(stats[option.name])"
                            @change="
                                (e) =>
                                    (stats[option.name] = (
                                        e.target as HTMLSelectElement
                                    ).value)
                            "
                            class="form-select"
                        >
                            <option value="">Custom</option>
                            <option
                                v-for="val in option.value as any[]"
                                :key="(val as any).name"
                                :value="(val as any).name"
                            >
                                {{ (val as any).name }}
                            </option>
                        </select>
                    </template>

                    <!-- Checkbox for boolean values -->
                    <template v-else-if="getInputType(option) === 'checkbox'">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input
                                :checked="Boolean(stats[option.name])"
                                @change="
                                    (e) =>
                                        (stats[option.name] = (
                                            e.target as HTMLInputElement
                                        ).checked)
                                "
                                type="checkbox"
                                class="w-4 h-4 rounded border-input text-primary focus:ring-ring"
                            />
                            <span class="text-sm text-sidebar-foreground">{{
                                option.title
                            }}</span>
                        </label>
                    </template>

                    <!-- Text input for string/null values -->
                    <template v-else-if="getInputType(option) === 'text'">
                        <label
                            class="text-sm font-medium text-sidebar-foreground"
                            >{{ option.title }}</label
                        >
                        <input
                            :value="String(stats[option.name] || '')"
                            @change="
                                (e) =>
                                    (stats[option.name] = (
                                        e.target as HTMLInputElement
                                    ).value)
                            "
                            type="text"
                            :placeholder="`Enter ${option.title.toLowerCase()}`"
                            class="form-select"
                        />
                    </template>
                </div>
            </template>
        </div>
    </aside>
</template>
