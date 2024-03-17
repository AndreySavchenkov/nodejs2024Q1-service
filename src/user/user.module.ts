import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DbModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
