/// <refernce types="@clerk/express" />

export {};

export type Role = 'admin' | 'user' | 'guest';

declare global {
    namespace Express {
        interface JWTPayload {
            metadata: {
                role?: Role;
            };
        }
    }
}