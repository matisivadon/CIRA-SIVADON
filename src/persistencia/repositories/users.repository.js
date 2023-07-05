import UsersDBDTO from "../DTOs/usersDB.dto.js"
import {UserRespDTO, UsersRespDTO} from "../DTOs/usersResp.dto.js"

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    async createUser(user) {
        try {
            const userDBDTO = new UsersDBDTO(user)
            const userDao = await this.dao.createUser(userDBDTO)
            return userDao
        } catch (error) {
            console.log(error)
        }
    }

    async findOneUser(_id){
        try {
            const user = await this.dao.findOneUser(_id)
            const userRespDTO = new UserRespDTO(user)
            return userRespDTO
        } catch (error) {
            console.log(error)
        }
    }

    async findAllUsers(){
        try {
            const users = await this.dao.findAllUsers()
            const usersRespDTO = new UsersRespDTO(users)
            return usersRespDTO.users
        } catch (error) {
            console.log(error)
        }
    }
}