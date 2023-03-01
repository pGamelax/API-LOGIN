import bcrypt from "bcrypt";
import { findByEmailService, generateToken } from "../services/authService.js";

export async function login(request, response) {
  try {
    const { email, password } = request.body;

    const user = await findByEmailService(email);

    if (!user) {
      return response
        .status(404)
        .send({ message: "Usuario ou senha está inválido!" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.passowrd);

    if (!passwordIsValid) {
      return response
        .status(404)
        .send({ message: "Usuário ou senha está inválido!" });
    }

    const token = await generateToken(user.id, user.role);

    return response.send({ token: token });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
}
