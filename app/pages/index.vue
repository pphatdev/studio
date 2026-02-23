<script setup lang="ts">
import { ref, onMounted } from "vue";
import confetti from "canvas-confetti";
import { useStats } from "../composables/useStats";

useSeoMeta({
    title: "GitHub Stats Studio - Create Beautiful Statistics Cards",
    ogTitle: "GitHub Stats Studio - Create Beautiful Statistics Cards",
    description:
        "Design and create stunning statistics cards for your projects with GitHub Stats Studio. Easy-to-use visual editor with real-time preview.",
    ogDescription:
        "Design and create stunning statistics cards for your projects with GitHub Stats Studio.",
    ogImage:
        "https://stats.pphat.top/stats?username=pphatdev&avatar_mode=radar&format=webp",
    twitterCard: "summary_large_image",
});

const route = useRoute();
const { stats, selectedTemplate, currentTemplate } = useStats();

const zoom = ref(1);
const previewRef = ref<{ resetPosition: () => void } | null>(null);
const showUsernameModal = ref(false);
const usernameInput = ref("");

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

// Check for username in URL params on mount
onMounted(() => {
    const usernameParam = route.query.username as string;
    if (usernameParam) {
        stats.value.username = usernameParam;
    } else if (!stats.value.username) {
        showUsernameModal.value = true;
    }
});
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-background">
        <!-- Sidebar -->
        <SidebarStudioSidebar />

        <!-- Main Content -->
        <main class="flex-1 flex flex-col overflow-hidden">
            <!-- Header with Zoom Controls -->
            <header
                class="flex items-center justify-between px-6 py-3 border-b border-border"
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
                <StudioZoomControls v-model:zoom="zoom" @reset="resetZoom" />
            </header>

            <!-- Canvas Area -->
            <div
                class="flex-1 overflow-hidden"
                :class="
                    selectedTemplate === 'stats'
                        ? 'bg-blue-50/5'
                        : selectedTemplate === 'languages'
                          ? 'bg-purple-50/5'
                          : 'bg-green-50/5'
                "
            >
                <StudioPreview ref="previewRef" v-model:zoom="zoom" />
            </div>
        </main>

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
