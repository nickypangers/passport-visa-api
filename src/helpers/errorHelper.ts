export default function generateError(error: any) {
    return {
        status: false,
        error: `${error}`,
        last_updated: new Date().toISOString(),
    }
}