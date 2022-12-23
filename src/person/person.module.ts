import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './entities/person.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://julio:IOFQcp7ussu5suw4@escalab.wkje36d.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{name:Person.name,schema:PersonSchema}]),
    PersonModule
  ],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
