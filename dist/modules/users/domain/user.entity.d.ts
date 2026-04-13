export interface UserProps {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class User {
    private props;
    constructor(props: UserProps);
    get id(): string | undefined;
    get email(): string;
    get password(): string;
    get firstName(): string | null | undefined;
    get lastName(): string | null | undefined;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
    toJSON(): {
        id: string | undefined;
        email: string;
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        createdAt: Date | undefined;
        updatedAt: Date | undefined;
    };
}
