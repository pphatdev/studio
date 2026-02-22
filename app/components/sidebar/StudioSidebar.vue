<script setup lang="ts">
import { themes, themeNames } from '~/utils/themes';

const { stats } = useStats();
const router = useRouter();

// Selected template type
const selectedTemplate = useState<string>('selectedTemplate', () => 'stats');

// Template items with preview images
const templateItems = [
  {
    name: 'Stats',
    type: 'stats',
    preview: '/template/stats.webp'
  },
  {
    name: 'Graph',
    type: 'graph',
    preview: '/template/graph.webp'
  },
];

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
  const newUsername = (event.target as HTMLInputElement).value;
  stats.value.username = newUsername;

  // Update URL query parameter
  router.push({
    query: { username: newUsername }
  });
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
  <aside class="w-72 h-screen bg-sidebar-background border border-r flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="p-4 flex items-center gap-3 border-b">
      <img src="/logo/logo.png" alt="Logo" class="w-8 h-8 object-contain" />
      <h1 class="text-2xl font-semibold font-ubuntu leading-8 text-sidebar-foreground">
        Studio
      </h1>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Username -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-sidebar-foreground">Username</label>
        <input :value="stats.username" @change="onUsernameChange" type="text" placeholder="Enter GitHub username"
          class="form-select" />
      </div>

      <!-- Templates Selection -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-sidebar-foreground">Templates</h3>
        <div class="grid grid-cols-2 gap-3">
          <button v-for="template in templateItems" :key="template.type" @click="selectedTemplate = template.type"
            class="flex flex-col items-center gap-2 cursor-pointer text-xs font-medium rounded-xl transition-all border-2 relative"
            :class="selectedTemplate === template.type
              ? 'bg-primary text-primary-foreground shadow-sm border-primary'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent'">
            <img :src="template.preview" :alt="template.name" class="w-full h-auto rounded-lg" />
            <!-- Check icon for selected template -->
            <div v-if="selectedTemplate === template.type" class="absolute top-0.5 left-0.5 bg-primary text-primary-foreground rounded-lg p-1 shadow-md">
              <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Graph Options (only show when graph template is selected) -->
      <template v-if="selectedTemplate === 'graph'">
        <!-- Graph Theme -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Graph Theme</label>
          <select v-model="stats.graph_theme" class="form-select">
            <option value="aurora">🌌 Aurora</option>
            <option value="matrix">💚 Matrix</option>
            <option value="inferno">🔥 Inferno</option>
            <option value="ocean">🌊 Ocean</option>
            <option value="neon">💜 Neon</option>
            <option value="solar">☀️ Solar</option>
            <option value="galaxy">🌠 Galaxy</option>
            <option value="github-dark">🐙 GitHub Dark</option>
          </select>
        </div>

        <!-- Year -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Year</label>
          <input v-model="stats.year" type="text" placeholder="e.g. 2024 (default: last 365 days)"
            class="form-select" />
        </div>

        <!-- Animation -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Animation</label>
          <select v-model="stats.animate" class="form-select">
            <option value="glow">Glow (default)</option>
            <option value="wave">Wave</option>
            <option value="pulse">Pulse</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Size -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Size</label>
          <select v-model="stats.size" class="form-select">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="default">Default</option>
            <option value="large">Large</option>
          </select>
        </div>

        <!-- Graph Display Options -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-sidebar-foreground">
            Display Options
          </h3>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="stats.show_title" type="checkbox"
              class="w-4 h-4 rounded border-input text-primary focus:ring-ring" />
            <span class="text-sm text-sidebar-foreground">Show Title</span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="stats.show_total_contribution" type="checkbox"
              class="w-4 h-4 rounded border-input text-primary focus:ring-ring" />
            <span class="text-sm text-sidebar-foreground">Show Total Contributions</span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="stats.show_background" type="checkbox"
              class="w-4 h-4 rounded border-input text-primary focus:ring-ring" />
            <span class="text-sm text-sidebar-foreground">Show Background</span>
          </label>
        </div>
      </template>

      <!-- Stats Options (only show when stats template is selected) -->
      <template v-if="selectedTemplate === 'stats'">
        <!-- Display Options -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-sidebar-foreground">
            Display Options
          </h3>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="stats.hide_title" type="checkbox"
              class="w-4 h-4 rounded border-input text-primary focus:ring-ring" />
            <span class="text-sm text-sidebar-foreground">Hide Title</span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="stats.hide_rank" type="checkbox"
              class="w-4 h-4 rounded border-input text-primary focus:ring-ring" />
            <span class="text-sm text-sidebar-foreground">Hide Rank</span>
          </label>
        </div>

        <!-- Custom Title -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Custom Title</label>
          <input v-model="stats.custom_title" type="text" placeholder="Enter custom title" class="form-select" />
        </div>

        <!-- Avatar Mode -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Avatar Mode</label>
          <select v-model="stats.avatar_mode" class="form-select">
            <option v-for="option in avatarModeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Border Style -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-sidebar-foreground">Border Style</label>
          <select v-model="stats.data_border_style" class="form-select">
            <option v-for="option in borderStyleOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Frame Position -->
        <div class="flex flex-col gap-2" v-if="stats.data_border_style === 'frame'">
          <label class="text-sm font-medium text-sidebar-foreground">Frame Position</label>
          <select v-model="stats.data_border_frame_position" class="form-select">
            <option v-for="option in framePositionOptions" :key="option.value" :value="option.value">
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
              <input v-model="stats.bgColor" type="text" placeholder="#ffffff" class="form-select" />
              <input :value="bgColorPicker" @change="onBgColorChange" type="color"
                class="w-10 h-10 rounded-md border border-input cursor-pointer" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm text-muted-foreground">Border Color</label>
            <div class="flex gap-2">
              <input v-model="stats.borderColor" type="text" placeholder="#e4e2e2" class="form-select" />
              <input :value="borderColorPicker" @change="onBorderColorChange" type="color"
                class="w-10 h-10 rounded-md border border-input cursor-pointer" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm text-muted-foreground">Text Color</label>
            <div class="flex gap-2">
              <input v-model="stats.textColor" type="text" placeholder="#333333" class="form-select" />
              <input :value="textColorPicker" @change="onTextColorChange" type="color"
                class="w-10 h-10 rounded-md border border-input cursor-pointer" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="titleColor" class="text-sm text-muted-foreground">Title Color</label>
            <div class="flex gap-2 relative">
              <input v-model="stats.titleColor" type="text" id="titleColor" placeholder="#2f80ed" class="form-select" />
              <input :value="titleColorPicker" @change="onTitleColorChange" type="color" id="titleColorPicker"
                class="w-10 h-10 rounded-md border border-input cursor-pointer" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </aside>
</template>
