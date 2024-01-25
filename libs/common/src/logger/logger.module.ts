import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports:[
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', // pino-pretty take care of formatting our logs
          options: {
            singleLine: true, // our logs come out in a sigle and there's no break here
          }
        },
      },
    }),
  ]
})
export class LoggerModule {}
