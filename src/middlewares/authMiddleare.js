import jwt from 'jsonwebtoken';
import { findByIdService } from '../services/userService.js';

export const authMiddleware = (request, response, next) => {
    try {
        const { authorization } = request.headers;

        if (!authorization) {
            return response.status(401).send({ message: "You do not have authorization" })
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return response.status(401).send({ message: "You do not have authorization" })
        }
        const [schema, token] = parts

        if (schema !== "Bearer") {
            return response.status(401).send({ message: "You do not have authorization" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return response.status(401).send({ message: "Invalid token" })
            }
            
            const user = await findByIdService(decoded.id)

            if (!user || !user.id) {
                return response.status(401).send({ message: "Invalid token" })
            }
            
            request.userRole = decoded.role
            request.userId = user.id;

            return next();
        })



    } catch (err) {
        response.status(500).send(({ message: err.message }))
    }

}