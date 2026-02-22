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

  const statsUrl = computed(() => {
    return `https://stats.pphat.top/stats?${buildQueryString.value}`;
  });

  return {
    stats,
    buildQueryString,
    statsUrl,
  };
};
