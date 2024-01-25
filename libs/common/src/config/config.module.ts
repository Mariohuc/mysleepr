import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';
/**
 * We are using a config module to wrap the Nest one,
 * so in this way if we were to change the underlying config module (the Nest one) we only need to do in one place
 * It's always a great idea to abstract these third party dependencies when we can
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
