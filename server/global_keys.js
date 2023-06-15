module.exports = {
    JWT_SECRET_KEY: "benchw!ck-jwt@2023$",
    HASH_SALT_ROUND: 10, // rounds=10: ~10 hashes/sec
    DEBUGGER_MODE: process.env.DEBUGGER_MODE === "true"
}