module.exports = {
    devServer: {
        proxy: {
            '^/api/v1': {
                target: process.env.VUE_APP_ExTERNAL_API_BASE_URL,
                ws: true,
                changeOrigin: true
                //pathRewrite: { '^/deso': '' },
            }
        }
    }
};
