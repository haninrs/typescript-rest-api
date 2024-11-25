import { User } from "@prisma/client";

// model itu buat YnG Kita butuh req.body

// register request model
export type CreateUserRequest = {
  username: string;
  password: string;
  name: string;
};

// login request model
export type LoginUserRequest = {
  username: string;
  password: string;
};

// update request model
export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

// response
export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};


// function untuk mengkonversi model dr schema prisma jadi UserResponse
export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
