<script setup lang="ts">
import IconCopy from "../icons/IconCopy.vue";
import IconCheck from "../icons/IconCheck.vue";

defineProps<{ url: string; copied: boolean }>();
const emit = defineEmits<{ (e: "copy"): void }>();

</script>

<template>
    <div class="p-2 bg-muted/50 border-b border-border text-xs text-muted-foreground flex items-center gap-2">
        <span class="font-mono flex-1 truncate">{{ url }}</span>
        <button
            @click="emit('copy')"
            class="shrink-0 p-1.5 rounded hover:bg-accent transition-colors cursor-pointer"
            :title="copied ? 'Copied!' : 'Copy URL'"
        >
            <IconCopy v-if="!copied" />
            <IconCheck v-else />
        </button>
    </div>
</template>
