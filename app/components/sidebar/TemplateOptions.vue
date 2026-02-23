<script setup lang="ts">
defineProps<{
    options: Array<any>;
    stats: Record<string, any>;
}>();

const emit = defineEmits<{
    (e: "updateOption", name: string, value: any): void;
}>();

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
</script>

<template>
    <div v-for="option in options" :key="option.name" class="flex flex-col gap-2">
        <!-- Select for string array values -->
        <template v-if="getInputType(option) === 'select'">
            <label class="text-sm font-medium text-sidebar-foreground"
                >{{ option.title }}</label
            >
            <select
                :value="String(stats[option.name])"
                @change="
                    emit(
                        'updateOption',
                        option.name,
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="form-select"
                suppressHydrationWarning
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
        <template v-else-if="getInputType(option) === 'select-object'">
            <label class="text-sm font-medium text-sidebar-foreground"
                >{{ option.title }}</label
            >
            <select
                :value="String(stats[option.name])"
                @change="
                    emit(
                        'updateOption',
                        option.name,
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="form-select"
                suppressHydrationWarning
            >
                <option value="">Custom</option>
                <option
                    v-for="val in option.value as any[]"
                    :key="(val as any).name"
                    :value="(val as any).name"
                >
                    {{ (val as any).title }}
                </option>
            </select>
        </template>

        <!-- Checkbox for boolean values -->
        <template v-else-if="getInputType(option) === 'checkbox'">
            <label class="flex items-center gap-3 cursor-pointer">
                <input
                    :checked="Boolean(stats[option.name])"
                    @change="
                        emit(
                            'updateOption',
                            option.name,
                            ($event.target as HTMLInputElement).checked
                        )
                    "
                    type="checkbox"
                    class="w-4 h-4 rounded border-input text-primary focus:ring-ring"
                    suppressHydrationWarning
                />
                <span class="text-sm text-sidebar-foreground">{{
                    option.title
                }}</span>
            </label>
        </template>

        <!-- Text input for string/null values -->
        <template v-else-if="getInputType(option) === 'text'">
            <label class="text-sm font-medium text-sidebar-foreground"
                >{{ option.title }}</label
            >
            <input
                :value="String(stats[option.name] || '')"
                @change="
                    emit(
                        'updateOption',
                        option.name,
                        ($event.target as HTMLInputElement).value
                    )
                "
                type="text"
                :placeholder="`Enter ${option.title.toLowerCase()}`"
                class="form-select"
                suppressHydrationWarning
            />
        </template>
    </div>
</template>
