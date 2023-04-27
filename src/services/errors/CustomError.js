export default class CustomError {
    static createCustomError({name, message, cause}) {
        const newError = new Error(message, {cause})
        newError.name = name
        console.log(newError);
        throw newError
    }
}