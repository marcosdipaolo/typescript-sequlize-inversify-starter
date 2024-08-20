import { injectable } from "inversify";
import User from "../models/User";
import { createLogger } from "../logger";
import { Logger } from "winston";
import BaseService from "./BaseService";

export class UserNotFoundError extends Error {
  message = "User not found.";
}

export interface IUserService {
  createUser: (body: { name: string; email: string }) => Promise<User>;
  getUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (
    user: User,
    body: { name?: string; email?: string },
  ) => Promise<User>;
  deleteUser: (id: string) => Promise<boolean>;
}

@injectable()
export class UserService extends BaseService implements IUserService {
  createUser = async (body: { name: string; email: string }) => {
    const { name, email } = body;
    const user = await User.create<User>({ name, email });
    if (user) {
      this.logger.info(`User created. ${name}, ${email}.`);
    }
    return user;
  };

  getUsers = async () => {
    this.logger.info("Hey there from User service.");
    return User.findAll();
  };
  getUser = async (id: string) => {
    const user = await User.findByPk(id, {
      include: [
        {
          association: "orders",
          include: ["products"],
        },
      ],
    });
    if (!user) {
      throw new UserNotFoundError();
    } else {
      return user;
    }
  };

  updateUser = async (user: User, body: { name?: string; email?: string }) => {
    Object.keys(body).forEach((key: string) => {
      const value = body[key as keyof typeof body];
      if (value) {
        Object.assign(user, { [key]: value });
      }
    });
    await user.save();
    return user.reload();
  };

  deleteUser = async (id: string): Promise<boolean> => {
    const rows = await User.destroy({
      where: { id },
    });
    return Boolean(rows);
  };
}
