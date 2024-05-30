import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { loginDto } from './dtos/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.createUser(createUserDto)
  }

  @Post('/login')
  async validateUser(
    @Body() loginDto: loginDto
  ) {
    return this.userService.validateUser(loginDto)
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers()
  }

}   
