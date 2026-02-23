<script setup lang="ts">
defineProps<{
    username: string;
}>();

const emit = defineEmits<{
    (e: "update:username", value: string): void;
}>();
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground"
            >Github Username</label
        >
        <input
            :value="username"
            @change="emit('update:username', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Enter GitHub username"
            class="form-select"
        />
    </div>
</template>
