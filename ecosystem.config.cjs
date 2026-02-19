module.exports = {
    apps: [
        {
            name: 'studio.pphat.top:3104',
            port: 3104,
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                NODE_ENV: 'production',
                PORT: 3104,
            },
            // env_development: {
            //     NODE_ENV: 'development',
            //     PORT: 3104,
            // },
            // Logs
            error_file: './logs/error.log',
            out_file: './logs/output.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            merge_logs: true,
            // Restart policy
            max_restarts: 10,
            min_uptime: '10s',
            max_memory_restart: '500M',
            // Watch (disabled for production)
            watch: false,
            ignore_watch: ['node_modules', 'logs', '.nuxt', '.output'],
        },
    ],
};
