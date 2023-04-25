import { UsersDao } from "../DAOs/factory.js"
import UsersRepository from "./users.repository.js"

export const usersDao = new UsersRepository(new UsersDao())