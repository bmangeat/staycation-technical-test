export interface User {
    id: number;
    firstName: string;
}

export interface UserRow {
    id: number;
    first_name: string;
}

export const toUser = (userRow: UserRow): User => {
    return {
        id: userRow["id"],
        firstName: userRow["first_name"],
    }
}