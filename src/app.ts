import express from 'express';
import { User } from './domain/entities/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { makeCreateUserController } from './presentation/controllers/user.controller';
import { makeUserRoutes } from './presentation/routes/user.routes';
import { UserRepositoryInMemory } from './infrastructure/repositories/user.repository.in-memory';
import { errorMiddleware } from './infrastructure/http/middlewares/error.middlware';
import { bcryptHasher } from './infrastructure/services/bcrypt-hasher.service';
import { uuidIdGenerator } from './infrastructure/services/uuid-id-generator.service';

const app = express();
app.use(express.json());

// mocks/deps
const db: {
    users: User[],
} = {
    users: [],
};

const userRepository = new UserRepositoryInMemory(db.users);

// use-case e controller
const createUserUseCase = CreateUserUseCase({
    userRepository,
    hashPassword: bcryptHasher,
    idGenerator: uuidIdGenerator,
});

// controller
const createUserController = makeCreateUserController(createUserUseCase);

// rotas
app.use(makeUserRoutes({ createUserController }));
app.get('/health-check', (_, res) => res.send('Health!'));

// middleware de erros
app.use(errorMiddleware);

export { app };
