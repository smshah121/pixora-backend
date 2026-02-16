import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { Collections } from 'src/collection/entities/collection.entity';
import { SavedItem } from 'src/saved-items/entities/saved-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Collections,SavedItem])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
