module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@/*': '*',
                        '@assets': './src/assets',
                        '@hooks': './src/hooks',
                    },
                },
            ],
        ],
    };
};