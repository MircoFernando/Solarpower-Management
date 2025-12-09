export type Role = 'admin' | 'user' | 'guest';

export type UserPublicMetadata = {
    role?: Role;
}