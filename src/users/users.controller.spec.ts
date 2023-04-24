require('dotenv/config');
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';

describe('UsersController', () => {
  // eslint-disable-next-line 
  let userController: UsersController;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        MongooseModule.forRoot(`${process.env.MONGODB_ATLAS_URI}`),
      ],
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
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  describe('Connection with https://reqres.in', () => {
    it('Should return an JSON object', async () => {
      const result = await axios.get(`https://reqres.in/api/users/1`)
      expect(result.data.data).toHaveProperty("email")
      expect(result.status).toEqual(200)
    })
  });


});
