import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto } from './dtos/login.dto';

@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async createUser( data: Prisma.UserCreateInput ) {
        return this.prisma.user.create({
            data,
        })
    }

    async validateUser( loginDto: loginDto ) {
        const user = await this.prisma.user.findUnique({ where: { username: loginDto.username } });
        if(!user) throw new UnauthorizedException('Invalid Credentials')
        if(user.password != loginDto.password) throw new UnauthorizedException('Invalid credentials')
        return user
    }

}
