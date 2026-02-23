<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import confetti from "canvas-confetti";
import { useStats } from "../composables/useStats";

useSeoMeta({
    title: "GitHub Stats Studio - Create Beautiful Statistics Cards",
    ogTitle: "GitHub Stats Studio - Create Beautiful Statistics Cards",
    description: "Design and create stunning statistics cards for your projects with GitHub Stats Studio. Easy-to-use visual editor with real-time preview.",
    ogDescription: "Design and create stunning statistics cards for your projects with GitHub Stats Studio.",
    ogImage: "https://stats.pphat.top/stats?username=pphatdev&avatar_mode=radar&format=webp",
    twitterCard: "summary_large_image",
});

const route = useRoute();
const { stats, selectedTemplate, currentTemplate, buildQueryString } = useStats();

const zoom = ref(1);
const previewRef = ref<{ resetPosition: () => void } | null>(null);
const showUsernameModal = ref(false);
const usernameInput = ref("");
const isInitialized = ref(false);

const resetZoom = () => {
    zoom.value = 1;
    previewRef.value?.resetPosition();
};

const celebrate = () => {
    // Burst from center (modal position)
    const count = 200;
    const defaults = {
        origin: { x: 0.5, y: 0.5 },
        zIndex: 100,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};

const submitUsername = () => {
    if (usernameInput.value.trim()) {
        stats.value.username = usernameInput.value.trim();
        celebrate();

        const searchParams = new URLSearchParams();
        searchParams.set("username", usernameInput.value.trim());
        history.pushState(null, "", `?${searchParams.toString()}`);

        setTimeout(() => {
            showUsernameModal.value = false;
        }, 500);
    }
};

// Update search params when template or stats change (only after initial load)
watch(
    [selectedTemplate, buildQueryString],
    () => {
        if (stats.value.username && isInitialized.value) {
            const searchParams = new URLSearchParams();
            searchParams.set("username", stats.value.username);

            // Add template if not the default 'stats'
            if (selectedTemplate.value !== "stats") {
                searchParams.set("template", selectedTemplate.value);
            }

            // Add all option values for current template
            currentTemplate.value?.options?.forEach((option: any) => {
                const value = stats.value[option.name];
                if (
                    value !== undefined &&
                    value !== null &&
                    value !== "" &&
                    value !== false
                ) {
                    searchParams.append(option.name, String(value));
                }
            });

            history.pushState(null, "", `?${searchParams.toString()}`);
        }
    },
    { deep: true },
);

// Check for username and template in URL params on mount
onMounted(async () => {
    const usernameParam = route.query.username as string;
    const templateParam = route.query.template as string;

    // Load username
    if (usernameParam) {
        stats.value.username = usernameParam;
    } else if (!stats.value.username) {
        showUsernameModal.value = true;
    }

    // Set template
    if (templateParam) {
        selectedTemplate.value = templateParam;
    }

    // Wait for template reactive effects to settle
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Load option values from search params
    currentTemplate.value?.options?.forEach((option: any) => {
        const paramValue = route.query[option.name];
        if (paramValue !== undefined && paramValue !== null) {
            stats.value[option.name] = paramValue;
        }
    });

    // Mark as initialized so watches will fire for subsequent changes
    isInitialized.value = true;
});
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-background">
        <!-- Loading Overlay -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="!isInitialized"
                    class="fixed inset-0 z-100 flex items-center justify-center bg-background"
                >
                    <div class="flex flex-col items-center gap-4">
                        <svg
                            class="animate-spin h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p class="text-sm text-muted-foreground">Loading studio...</p>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Content (only show after initialization) -->
        <template v-if="isInitialized">
            <!-- Sidebar -->
            <SidebarStudioSidebar />

            <!-- Main Content -->
            <main class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header
                class="flex items-center justify-between px-6 py-2.5 border-b border-border"
                :class="
                    selectedTemplate === 'stats'
                        ? 'bg-blue-50/30 dark:bg-blue-950/20'
                        : selectedTemplate === 'languages'
                            ? 'bg-purple-50/30 dark:bg-purple-950/20'
                            : 'bg-green-50/30 dark:bg-green-950/20'
                "
            >
                <!-- Active Template Name -->
                <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold text-sidebar-foreground">
                        {{ currentTemplate?.title || "Stats" }} Preview
                    </span>
                    <span
                        class="text-xs px-3 py-1.5 rounded-full font-medium"
                        :class="
                            selectedTemplate === 'stats'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : selectedTemplate === 'languages'
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                                    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                        "
                    >
                        {{ selectedTemplate }}
                    </span>
                </div>
            </header>

            <!-- Canvas Area -->
            <div
                class="flex-1 overflow-hidden"
                :class="selectedTemplate === 'stats' ? 'bg-blue-50/5' : selectedTemplate === 'languages' ? 'bg-purple-50/5' : 'bg-green-50/5'"
            >
                <StudioPreview ref="previewRef" v-model:zoom="zoom" @reset="resetZoom" />
            </div>
            </main>
        </template>

        <!-- Username Modal -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="showUsernameModal"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <Transition
                        appear
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 scale-95 translate-y-4"
                        enter-to-class="opacity-100 scale-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 scale-100 translate-y-0"
                        leave-to-class="opacity-0 scale-95 translate-y-4"
                    >
                        <div
                            v-if="showUsernameModal"
                            class="bg-background border border-border rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
                        >
                            <div class="flex justify-center mb-4">
                                <img
                                    src="https://media1.tenor.com/m/S2UQLBNBBH8AAAAC/mr-bean-wave.gif"
                                    alt="Wave"
                                    class="w-20 h-20 rounded-full object-cover"
                                />
                            </div>
                            <h2
                                class="text-xl font-semibold text-foreground mb-2 text-center"
                            >
                                Welcome to GitHub Stats Studio
                            </h2>
                            <p
                                class="text-muted-foreground text-sm mb-4 text-center"
                            >
                                Enter your GitHub username to get started
                            </p>
                            <form @submit.prevent="submitUsername">
                                <input
                                    v-model="usernameInput"
                                    type="text"
                                    placeholder="Enter GitHub username"
                                    class="form-select w-full mb-4"
                                    autofocus
                                />
                                <button
                                    type="submit"
                                    class="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
