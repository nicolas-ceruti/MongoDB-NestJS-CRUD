import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
            getAvatar: jest.fn(),
            create: jest.fn(),
            deleteAvatar: jest.fn(),
          }
        }
      ]
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Connection with https://reqres.in', () => {
    it('Should return an JSON object', async () => {
      const result = await axios.get(`https://reqres.in/api/users/1`)
      expect(result.data.data).toHaveProperty("email")
      expect(result.status).toEqual(200)
    })
  });

});
