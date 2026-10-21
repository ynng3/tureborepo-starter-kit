export type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

export type LoginUserInput = {
  email?: string;
  password?: string;
};
