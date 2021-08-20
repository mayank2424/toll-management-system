const { PORT, ENV, DB_URI, SECRET_KEY } = process.env;
module.exports = {
    SERVER_PORT: PORT || 3000,
    ENV,
    DATABASE: {
        URI:DB_URI
    },
    JWT_SECRET: '$&&__toll_system_&&$%@#$@&!@#',
    SECRET_KEY,
}