export default defineNuxtRouteMiddleware(async (to) => {
    const { loggedIn } = useUserSession();
    if (!loggedIn.value && to.path !== "/login") {
        return navigateTo("/login");
    }
});