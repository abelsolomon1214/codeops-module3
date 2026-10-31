export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In-memory demo
  role: "customer" | "staff";
  createdAt: string;
};

declare global {
  var __addisEatsUsers: User[] | undefined;
}

const initialUsers: User[] = [
  {
    id: "user_abel",
    name: "Abel Solomon",
    email: "abel@example.com",
    passwordHash: "password123",
    role: "customer",
    createdAt: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "user_hana",
    name: "Hana Tesfaye",
    email: "hana@example.com",
    passwordHash: "password123",
    role: "customer",
    createdAt: "2026-10-01T00:00:00.000Z",
  },
];

function getUsers(): User[] {
  if (!globalThis.__addisEatsUsers) {
    globalThis.__addisEatsUsers = [...initialUsers];
  }
  return globalThis.__addisEatsUsers;
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function registerUser(name: string, email: string, password: string):User {
  const existing = findUserByEmail(email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    passwordHash: password,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  getUsers().push(newUser);
  return newUser;
}
