<script setup lang="ts">
import { themes, themeNames } from '~/utils/themes';

const { stats } = useStats();

const avatarModeOptions = [
  { value: "none", label: "None", selected: true },
  { value: "radar", label: "Radar" },
];

const borderStyleOptions = [
  { value: "frame", label: "Frame" },
  { value: "solid", label: "Solid" },
];

const framePositionOptions = [
  { value: "in", label: "Inside" },
  { value: "out", label: "Outside" },
];

// Username change handler
const onUsernameChange = (event: Event) => {
  stats.value.username = (event.target as HTMLInputElement).value;
};

// Apply theme colors on change
const onThemeChange = (event: Event) => {
  const themeName = (event.target as HTMLSelectElement).value;
  if (themeName && themes[themeName]) {
    const theme = themes[themeName];
    stats.value.bgColor = theme.bgColor;
    stats.value.borderColor = theme.borderColor;
    stats.value.textColor = theme.textColor;
    stats.value.titleColor = theme.titleColor;
  }
};

// Color picker helpers - type="color" requires valid hex format
const bgColorPicker = computed(() => stats.value.bgColor || "#ffffff");
const borderColorPicker = computed(() => stats.value.borderColor || "#e4e2e2");
const textColorPicker = computed(() => stats.value.textColor || "#333333");
const titleColorPicker = computed(() => stats.value.titleColor || "#2f80ed");

// Color change handlers
const onBgColorChange = (event: Event) => {
  stats.value.bgColor = (event.target as HTMLInputElement).value;
};
const onBorderColorChange = (event: Event) => {
  stats.value.borderColor = (event.target as HTMLInputElement).value;
};
const onTextColorChange = (event: Event) => {
  stats.value.textColor = (event.target as HTMLInputElement).value;
};
const onTitleColorChange = (event: Event) => {
  stats.value.titleColor = (event.target as HTMLInputElement).value;
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
      <h1 class="text-2xl font-semibold font-ubuntu leading-8 text-sidebar-foreground">
        Studio
      </h1>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Username -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground"
          >Username</label
        >
        <input
          :value="stats.username"
          @change="onUsernameChange"
          type="text"
          placeholder="Enter GitHub username"
          class="form-select"
        />
      </div>

      <!-- Display Options -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-sidebar-foreground">
          Display Options
        </h3>

        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="stats.hide_title"
            type="checkbox"
            class="w-4 h-4 rounded border-input text-primary focus:ring-ring"
          />
          <span class="text-sm text-sidebar-foreground">Hide Title</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="stats.hide_rank"
            type="checkbox"
            class="w-4 h-4 rounded border-input text-primary focus:ring-ring"
          />
          <span class="text-sm text-sidebar-foreground">Hide Rank</span>
        </label>
      </div>

      <!-- Custom Title -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground"
          >Custom Title</label
        >
        <input
          v-model="stats.custom_title"
          type="text"
          placeholder="Enter custom title"
          class="form-select"
        />
      </div>

      <!-- Avatar Mode -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground"
          >Avatar Mode</label
        >
        <select v-model="stats.avatar_mode" class="form-select">
          <option
            v-for="option in avatarModeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Border Style -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground"
          >Border Style</label
        >
        <select v-model="stats.data_border_style" class="form-select">
          <option
            v-for="option in borderStyleOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Frame Position -->
      <div class="flex flex-col gap-2" v-if="stats.data_border_style === 'frame'">
        <label class="text-sm font-medium text-sidebar-foreground"
          >Frame Position</label
        >
        <select v-model="stats.data_border_frame_position" class="form-select">
          <option
            v-for="option in framePositionOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Color Customization -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-sidebar-foreground">Colors</h3>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-muted-foreground">Theme</label>
          <select v-model="stats.theme" @change="onThemeChange" class="form-select">
            <option value="">Custom</option>
            <option v-for="name in themeNames" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-muted-foreground">Background Color</label>
          <div class="flex gap-2">
            <input
              v-model="stats.bgColor"
              type="text"
              placeholder="#ffffff"
              class="form-select"
            />
            <input
              :value="bgColorPicker"
              @change="onBgColorChange"
              type="color"
              class="w-10 h-10 rounded-md border border-input cursor-pointer"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-muted-foreground">Border Color</label>
          <div class="flex gap-2">
            <input
              v-model="stats.borderColor"
              type="text"
              placeholder="#e4e2e2"
              class="form-select"
            />
            <input
              :value="borderColorPicker"
              @change="onBorderColorChange"
              type="color"
              class="w-10 h-10 rounded-md border border-input cursor-pointer"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-muted-foreground">Text Color</label>
          <div class="flex gap-2">
            <input
              v-model="stats.textColor"
              type="text"
              placeholder="#333333"
              class="form-select"
            />
            <input
              :value="textColorPicker"
              @change="onTextColorChange"
              type="color"
              class="w-10 h-10 rounded-md border border-input cursor-pointer"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="titleColor" class="text-sm text-muted-foreground">Title Color</label>
          <div class="flex gap-2 relative">
            <input
              v-model="stats.titleColor"
              type="text"
              id="titleColor"
              placeholder="#2f80ed"
              class="form-select"
            />
            <input
              :value="titleColorPicker"
              @change="onTitleColorChange"
              type="color"
              id="titleColorPicker"
              class="w-10 h-10 rounded-md border border-input cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
