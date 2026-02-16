import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collections } from './entities/collection.entity';
import { SavedItem } from 'src/saved-items/entities/saved-item.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collections, User, SavedItem]), UserModule],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService]
})
export class CollectionModule {}
