import { defineNitroPlugin } from "#imports";

export default defineNitroPlugin((nitroApp) => {
    // Optional: centralize error logging without changing response formatting
    nitroApp.hooks.hook("error", (error) => {
        console.error(error);
    });
});

