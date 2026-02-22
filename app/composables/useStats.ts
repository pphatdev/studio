export interface Stats {
  username: string;
  hide_title?: boolean;
  hide_rank?: boolean;
  custom_title?: string;
  avatar_mode?: 'none' | 'radar';
  data_border_style?: 'solid' | 'frame';
  data_border_frame_position?: 'in' | 'out';
  theme?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  titleColor?: string;
  // Graph options
  graph_theme?: string;
  year?: string;
  animate?: string;
  size?: string;
  show_title?: boolean;
  show_total_contribution?: boolean;
  show_background?: boolean;
  // Languages options
  lang_theme?: string;
  show_info?: boolean;
  type?: 'card' | 'pie';
  lang_bgColor?: string;
  lang_borderColor?: string;
  lang_textColor?: string;
  lang_titleColor?: string;
}

export const useStats = () => {
  const stats = useState<Stats>('stats', () => ({
    username: '',
    hide_title: false,
    hide_rank: false,
    custom_title: '',
    avatar_mode: 'radar',
    data_border_style: 'solid',
    data_border_frame_position: 'in',
    theme: '',
    bgColor: '',
    borderColor: '',
    textColor: '',
    titleColor: '',
    // Graph options
    graph_theme: 'aurora',
    year: '',
    animate: 'glow',
    size: 'default',
    show_title: true,
    show_total_contribution: true,
    show_background: true,
    // Languages options
    lang_theme: '',
    show_info: true,
    type: 'card',
    lang_bgColor: '',
    lang_borderColor: '',
    lang_textColor: '',
    lang_titleColor: '',
  }));

  const buildQueryString = computed(() => {
    const params = new URLSearchParams();

    Object.entries(stats.value).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== false) {
        params.append(key, String(value));
      }
    });

    return params.toString();
  });

  // Build query string for stats endpoint
  const buildStatsQueryString = computed(() => {
    const params = new URLSearchParams();
    const statsKeys = ['username', 'hide_title', 'hide_rank', 'custom_title', 'avatar_mode',
      'data_border_style', 'data_border_frame_position', 'theme',
      'bgColor', 'borderColor', 'textColor', 'titleColor'];

    Object.entries(stats.value).forEach(([key, value]) => {
      if (statsKeys.includes(key) && value !== undefined && value !== null && value !== '' && value !== false) {
        params.append(key, String(value));
      }
    });

    return params.toString();
  });

  // Build query string for languages endpoint
  const buildLanguagesQueryString = computed(() => {
    const params = new URLSearchParams();
    params.append('username', stats.value.username);

    if (stats.value.lang_theme) params.append('theme', stats.value.lang_theme);
    if (stats.value.show_info !== undefined) params.append('show_info', String(stats.value.show_info));
    if (stats.value.type && stats.value.type !== 'card') params.append('type', stats.value.type);
    if (stats.value.lang_bgColor) params.append('bgColor', stats.value.lang_bgColor);
    if (stats.value.lang_borderColor) params.append('borderColor', stats.value.lang_borderColor);
    if (stats.value.lang_textColor) params.append('textColor', stats.value.lang_textColor);
    if (stats.value.lang_titleColor) params.append('titleColor', stats.value.lang_titleColor);

    return params.toString();
  });

  // Build query string for graph endpoint
  const buildGraphQueryString = computed(() => {
    const params = new URLSearchParams();
    params.append('username', stats.value.username);

    if (stats.value.graph_theme) params.append('theme', stats.value.graph_theme);
    if (stats.value.year) params.append('year', stats.value.year);
    if (stats.value.animate && stats.value.animate !== 'glow') params.append('animate', stats.value.animate);
    if (stats.value.size && stats.value.size !== 'default') params.append('size', stats.value.size);
    if (stats.value.show_title !== undefined) params.append('show_title', String(stats.value.show_title));
    if (stats.value.show_total_contribution !== undefined) params.append('show_total_contribution', String(stats.value.show_total_contribution));
    if (stats.value.show_background !== undefined) params.append('show_background', String(stats.value.show_background));

    return params.toString();
  });

  const statsUrl = computed(() => {
    return `https://stats.pphat.top/stats?${buildStatsQueryString.value}`;
  });

  const languagesUrl = computed(() => {
    return `https://stats.pphat.top/languages?${buildLanguagesQueryString.value}`;
  });

  const graphUrl = computed(() => {
    return `https://stats.pphat.top/graph?${buildGraphQueryString.value}`;
  });

  return {
    stats,
    buildQueryString,
    buildStatsQueryString,
    buildLanguagesQueryString,
    buildGraphQueryString,
    statsUrl,
    languagesUrl,
    graphUrl,
  };
};
