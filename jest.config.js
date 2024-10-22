module.exports = {
    projects: [
        {
            displayName: "server",
            testMatch: ["<rootDir>/server/tests/**/*.test.js"],
            testEnvironment: "node", // Node environment for server-side
        },
        {
            displayName: "client",
            testMatch: ["<rootDir>/client/tests/**/*.test.js"],
            testEnvironment: "jsdom", // Browser-like environment for client-side
        }
    ]
};