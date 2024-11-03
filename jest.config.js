module.exports = {
    projects: [
        {
            displayName: "server",
            testMatch: ["<rootDir>/server/__tests__/**/*.test.js"],
            testEnvironment: "node", // Node environment for server-side
        },
        {
            displayName: "client",
            testMatch: ["<rootDir>/client/__tests__/**/*.test.js"],
            testEnvironment: "jsdom", // Browser-like environment for client-side
        }
    ]
};