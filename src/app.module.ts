import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { SavedItemsModule } from './saved-items/saved-items.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { SavedItem } from './saved-items/entities/saved-item.entity';
import { Collections } from './collection/entities/collection.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // very important, so we can access env everywhere
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, SavedItem, Collections],
        synchronize: false, // migrations use karenge
        ssl: config.get<boolean>('DB_SSL')
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    // App modules
    UserModule,
    CollectionModule,
    SavedItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
