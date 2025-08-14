// auth.d.ts

declare module "#auth-utils" {
    interface User {
        id: number;
        email: string;
        emailVerified: boolean;
        providerId: number;
        name: string;
        roleId: number | null;
    }
}

export { };