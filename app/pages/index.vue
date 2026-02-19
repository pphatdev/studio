<script setup lang="ts">
useSeoMeta({
  title: 'GitHub Stats Studio - Create Beautiful Statistics Cards',
  ogTitle: 'GitHub Stats Studio - Create Beautiful Statistics Cards',
  description: 'Design and create stunning statistics cards for your projects with GitHub Stats Studio. Easy-to-use visual editor with real-time preview.',
  ogDescription: 'Design and create stunning statistics cards for your projects with GitHub Stats Studio.',
  ogImage: 'https://stats.pphat.top/stats?username=pphatdev&avatar_mode=radar&format=webp',
  twitterCard: 'summary_large_image',
});

const zoom = ref(1);
const previewRef = ref<{ resetPosition: () => void } | null>(null);

const resetZoom = () => {
  zoom.value = 1;
  previewRef.value?.resetPosition();
};
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Sidebar -->
    <SidebarStudioSidebar />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header with Zoom Controls -->
      <header class="flex items-center justify-end px-6 py-3 border-b border-border bg-background">
        <StudioZoomControls
          v-model:zoom="zoom"
          @reset="resetZoom"
        />
      </header>

      <!-- Canvas Area -->
      <div class="flex-1 overflow-hidden">
        <StudioStatsPreview ref="previewRef" v-model:zoom="zoom" />
      </div>
    </main>
  </div>
</template>
