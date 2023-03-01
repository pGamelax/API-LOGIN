import {
  createUserService,
  findAllUserService,
  findByEmailService,
} from "../services/userService.js";
import z from "zod";

export async function createUser(request, response) {
  try {
    if (request.userRole == "ADMIN") {
      const modelUser = z.object({
        name: z.string().min(3),
        password: z.string().min(6).max(16),
        email: z.string().email(),
      });

      const { name, email, password } = modelUser.parse(request.body);

      const userFind = await findByEmailService(email);

      if (userFind) {
        return response.status(400).send({ message: "Email já cadastrado" });
      }
      const user = await createUserService(name, email, password);

      return response.status(201).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return response.status(403).send({ message: "Você não tem autorização" });
    }
  } catch (err) {
    return response.status(500).send({ message: err });
  }
}

export async function findAllUser(request, response) {
  try {
    if (request.userRole == "ADMIN") {
      const users = await findAllUserService();

      return response.status(200).json(users);
    } else {
      return response.status(403).send({ message: "Você não tem autorização" });
    }
  } catch (err) {
    return response.status(500).send({ message: err });
  }
}
