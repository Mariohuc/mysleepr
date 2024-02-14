import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  /**
   * This method tells Mongoose to register new schemas for our document models
   * Invoke this method in each application module that implement new document models and need to inject them into services or repositories
   * otherwise, mongoose wont' be able to recognize new document models we're trying to inject
   */
  static forFeature(models: ModelDefinition[]){
    return MongooseModule.forFeature(models);
  }
}
