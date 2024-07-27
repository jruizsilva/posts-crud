interface User {
  id: number;
  name: string;
  email: string;
}

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export type { User, UserRequest };
