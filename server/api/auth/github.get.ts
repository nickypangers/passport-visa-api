
export default defineOAuthGitHubEventHandler({
    async onSuccess(event, { user, tokens }) {
        console.log("GitHub OAuth user:", user);
        console.log("tokens", tokens)

        await setUserSession(event, { user })

        return sendRedirect(event, "/")
    }
})