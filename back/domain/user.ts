export interface User {
  id: number;
  firstName: string;
}

export interface DbUserRow {
  id: number;
  first_name: string;
}

export const toUser = (userRow: DbUserRow): User => {
  return {
    id: userRow.id,
    firstName: userRow.first_name,
  };
};
