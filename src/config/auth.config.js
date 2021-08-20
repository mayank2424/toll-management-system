/**
 * Auth Config for App
 */
module.exports = {
    PASSPORT_AUTH_TYPES: {
        LOGIN: 'login',
        JWT_AUTH: 'jwt',
    },
    PASSWORD_HASH_SALT:10,
    CRYPTO_CONFIG: {
        algorithm: "aes-256-ctr",
        password: '_$%*nyoni*%$@&^@&@T%#$_',
        ENC_KEYS: {
            "+" : '-',
            "/": "_",
            "=": "."
        },
        DEC_KEYS: {
            '-': "+",
            "_": "/",
            ".": "="
        }
    },
}