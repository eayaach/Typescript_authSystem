import {modelOptions, prop, Severity , pre, index, getModelForClass} from "@typegoose/typegoose"
import type { DocumentType as TGDocumentType } from '@typegoose/typegoose';
import argon2 from "argon2";
import log from "../utils/logger"
import { nanoid } from "nanoid";


export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];


@pre<User>("save", async function() {
    if (!this.isModified("password")) {
        return;
    }

    const hash = await argon2.hash(this.password);
    this.password = hash; // simplemente cada vez que el usuario se guarde, su password se hasheara
    return;
})
@modelOptions({ schemaOptions: { timestamps: true}, options: { allowMixed: Severity.ALLOW } })


export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email!: string;

    @prop({ required: true })
    firstName!: string;

    @prop({ required: true })
    lastName!: string;

    @prop({ required: true })
    password!: string;

    @prop({ required: true, default: () => nanoid() })
    verificationCode!: string;

    @prop()
    passwordResetCode!: string | null;

    @prop({ default: false })
    verified!: boolean;

    // importante para funturo al decit this: TGDocumentType<User> estamos diciendo que el this es del tipo documento de mongoose
    // por lo tanto tenemos acceso a los metodos de mongoose como isModified etc
    // y sabemos que tendra email, password etc
    // esta parte es modificable dependiendo de si usamor postgres, mysql etc
    async validatePassword(this: TGDocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;