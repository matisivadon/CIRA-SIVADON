import UsersDBDTO from "../DTOs/usersDB.dto.js"
import UsersRespDTO from "../DTOs/usersResp.dto.js"

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
            const users = await this.dao.findOneUser(_id)
            const userRespDTO = new UsersRespDTO(users)
            return userRespDTO
        } catch (error) {
            console.log(error)
        }
    }
}