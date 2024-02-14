import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, UserDocument, UserSchema } from '@app/common';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name, // injection token
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  // All the module's injectable classes go in the providers array
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
