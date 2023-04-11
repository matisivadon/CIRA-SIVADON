import bcrypt from 'bcrypt'

export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareHashedData = async (data, hashedData) => {
    return bcrypt.compare(data, hashedData)
}