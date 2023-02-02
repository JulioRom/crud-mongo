import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './person/entities/person.entity';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/escalab'),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [AppController,PersonController],
  providers: [AppService, PersonService],
})
export class AppModule {}
