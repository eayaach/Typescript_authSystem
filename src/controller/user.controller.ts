import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../service/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) {
    const body = req.body;
    try {
        const user = await createUser(body);
        await sendEmail({
            to: user.email,
            from: "noreply@yourapp.com",
            subject: "Welcome to Our App!",
            text: `Hello ${user.firstName},\n\nThank you for creating an account with us! We're excited to have you on board.\n\nBest,\nThe Team`
        });
        return res.status(201).json(user);
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).json({ message: "Account already exists" });
        }
        return res.status(500).json(e);
    }
}

