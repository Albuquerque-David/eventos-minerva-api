import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('AppController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loginController.getHello()).toBe('Hello World!');
    });
  });
});
