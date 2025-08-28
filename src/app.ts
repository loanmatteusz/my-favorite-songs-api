import express from 'express';
import { User } from './domain/entities/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { makeCreateUserController } from './presentation/controllers/user.controller';
import { makeUserRoutes } from './presentation/routes/user.routes';
import { UserRepositoryInMemory } from './infrastructure/repositories/user.repository.in-memory';
import { errorMiddleware } from './infrastructure/http/middlewares/error.middlware';

const app = express();
app.use(express.json());

// mocks/deps
const usersDb: User[] = [];
const userRepository = new UserRepositoryInMemory(usersDb);
const hashPassword = async (plain: string) => "Test178746*&";
const idGenerator = () => "huiaudgiah738uagiga";

// use-case e controller
const createUserUseCase = CreateUserUseCase({
    userRepository,
    hashPassword,
    idGenerator,
});

// controller
const createUserController = makeCreateUserController(createUserUseCase);

// rotas
app.use(makeUserRoutes({ createUserController }));
app.get('/health-check', (_, res) => res.send('Health!'));

// middleware de erros
app.use(errorMiddleware);

export { app };
