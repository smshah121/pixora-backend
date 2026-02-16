import { Module } from '@nestjs/common';
import { SavedItemController } from './saved-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedItem } from './entities/saved-item.entity';
import { User } from 'src/user/entities/user.entity';
import { Collections } from 'src/collection/entities/collection.entity';
import { SavedItemService } from './saved-items.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SavedItem,User, Collections]), UserModule],
  controllers: [SavedItemController],
  providers: [SavedItemService],
  exports: [SavedItemService]
})
export class SavedItemsModule {}
