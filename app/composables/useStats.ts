import sidebarData from "~/utils/data.json";
import { watch } from "vue";

export interface Stats {
    username: string;
    [key: string]: any;
}

export const useStats = () => {
    const { sidebar } = sidebarData;
    const statsBaseUrl = sidebar.statsUrl;

    // Get all templates from data.json
    const templatesMenu = sidebar.menu.find((m: any) => m.name === "templates");
    const templates = templatesMenu?.items || [];

    // Initialize stats object with default values from data.json
    const getDefaultStats = (): Stats => {
        const defaults: Stats = { username: "" };

        templates.forEach((template: any) => {
            template.options?.forEach((option: any) => {
                if (option.value !== null && option.value !== undefined) {
                    if (Array.isArray(option.value)) {
                        // For arrays, check if first element is an object
                        if (
                            typeof option.value[0] === "object" &&
                            option.value[0]?.name
                        ) {
                            // Array of objects - use the name property
                            defaults[option.name] = option.value[0].name;
                        } else {
                            // Array of primitives - use first value
                            defaults[option.name] = option.value[0];
                        }
                    } else if (
                        typeof option.value === "object" &&
                        !Array.isArray(option.value)
                    ) {
                        // Single object value - use the name property
                        if (option.value.name) {
                            defaults[option.name] = option.value.name;
                        }
                    } else if (typeof option.value === "boolean") {
                        defaults[option.name] = option.value;
                    }
                }
            });
        });

        return defaults;
    };

    // Reset template-specific options to defaults
    const resetTemplateOptions = (templateName: string) => {
        const template = templates.find((t: any) => t.name === templateName);
        if (!template) return;

        template.options?.forEach((option: any) => {
            if (option.value !== null && option.value !== undefined) {
                if (Array.isArray(option.value)) {
                    // For arrays, check if first element is an object
                    if (
                        typeof option.value[0] === "object" &&
                        option.value[0]?.name
                    ) {
                        // Array of objects - use the name property
                        stats.value[option.name] = option.value[0].name;
                    } else {
                        // Array of primitives - use first value
                        stats.value[option.name] = option.value[0];
                    }
                } else if (
                    typeof option.value === "object" &&
                    !Array.isArray(option.value)
                ) {
                    // Single object value - use the name property
                    if (option.value.name) {
                        stats.value[option.name] = option.value.name;
                    }
                } else if (typeof option.value === "boolean") {
                    stats.value[option.name] = option.value;
                }
            }
        });
    };

    const stats = useState<Stats>("stats", () => getDefaultStats());
    const selectedTemplate = useState<string>(
        "selectedTemplate",
        () => templates[0]?.name || "stats",
    );

    // Reset template options when template changes
    watch(selectedTemplate, (newTemplate) => {
        resetTemplateOptions(newTemplate);
    });

    // Get current template
    const currentTemplate = computed(() => {
        return templates.find((t: any) => t.name === selectedTemplate.value);
    });

    // Build query string dynamically based on selected template and options
    const buildQueryString = computed(() => {
        const params = new URLSearchParams();
        const template = currentTemplate.value;

        if (!template) return "";

        // Add username
        if (stats.value.username) {
            params.append("username", stats.value.username);
        }

        // Add all option values for current template
        template.options?.forEach((option: any) => {
            const value = stats.value[option.name];

            // Skip empty, null, undefined, and false values
            if (
                value !== undefined &&
                value !== null &&
                value !== "" &&
                value !== false
            ) {
                params.append(option.name, String(value));
            }
        });

        return params.toString();
    });

    // Build complete URL based on selected template
    const statsUrl = computed(() => {
        const template = currentTemplate.value;
        if (!template || !stats.value.username) return statsBaseUrl;

        const baseUrl = statsBaseUrl.endsWith("/")
            ? statsBaseUrl.slice(0, -1)
            : statsBaseUrl;
        const prefix = template.prefix;
        const queryString = buildQueryString.value;

        return `${baseUrl}/${prefix}?${queryString}`;
    });

    return {
        stats,
        selectedTemplate,
        templates,
        currentTemplate,
        statsBaseUrl,
        buildQueryString,
        statsUrl,
    };
};
