export default function generateResponse(data: any) {
    return {
        ...data,
        last_updated: new Date().toISOString(),
    }
}