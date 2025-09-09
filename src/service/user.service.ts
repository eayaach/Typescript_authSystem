// funciones para hablar con la base de datos
// logica de negocio
// src/service/user.service.ts
import UserModel from "../model/user.model";

async function createUser(input: { email: string; firstName: string; lastName: string; password: string }) {
    try {
        // al final el Usermodel es el modelo de mongoose que podemos usar para crear, buscar, etc
        // y el input es el body que viene del req.body ya validado por zod
        // entonces simplemente hacemos UserModel.create(input) y mongoose se encarga de crear el usuario en la base de datos
        // si hay un error de duplicado de email, mongoose lanzara un error con code 11000 que manejamos en el controller
        // y si todo va bien, devolvemos el usuario creado
        const user = await UserModel.create(input);
        return user;
    } catch (e) {
        throw e;
    }
}

export { createUser };