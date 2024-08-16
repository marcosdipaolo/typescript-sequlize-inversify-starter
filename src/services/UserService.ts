import { injectable } from "inversify";
import User from "../models/User";
import { createLogger } from "../logger";
import { Logger } from "winston";

class UserNotFountError extends Error {}

export interface IUserService {
  createUser: (body: { name: string; email: string }) => Promise<User>;
  getUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (
    id: string,
    body: { name?: string; email?: string },
  ) => Promise<User>;
}

@injectable()
export class UserService implements IUserService {
  constructor(private logger: Logger = createLogger("UserService")) {}

  createUser = async (body: { name: string; email: string }) => {
    const { name, email } = body;
    const user = await User.create<User>({ name, email });
    if (user) {
      this.logger.info(`User created. ${name}, ${email}.`);
    }
    return user;
  };

  getUsers = async () => User.findAll();
  getUser = async (id: string) => User.findByPk(id);

  updateUser = async (id: string, body: { name?: string; email?: string }) => {
    const user: User | null = await User.findByPk(id);
    if (!user) {
      throw new UserNotFountError();
    }
    Object.keys(body).forEach((key: string) => {
      const value = body[key as keyof typeof body];
      if (value) {
        Object.assign(user, { [key]: value });
      }
    });
    await user.save();
    return user.reload();
  };
}
