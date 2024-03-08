
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongo_url: process.env.MONGO_URL,
    port: process.env.PORT || 3001,
    defaultlimit: process.env.DEFAULT_LIMIT || 10
})