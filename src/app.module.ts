import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonSchema } from './schemas/person.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://julio:d0KYGD1wDFivgGIL@escalab.wkje36d.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{name:'person',schema:PersonSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
