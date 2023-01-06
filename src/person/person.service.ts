import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  //creating a person
  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    let rut = await this.getRut(createPersonDto.rut);
    if (rut) {
      throw new ConflictException('Rut must be unique');
    }

    const newPerson = new this.personModel(createPersonDto);
    try {
      var nPerson = newPerson.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (!nPerson) {
      throw new ConflictException('Person not created');
    }
    return nPerson;
  }
  //reading person collection
  async getPeople(): Promise<Person[]> {
    return await this.personModel.find().exec();
  }

  //update person
  async updatePerson(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    return await this.personModel.findByIdAndUpdate(
      id,
      {
        ...updatePersonDto,
        update_date: new Date(),
      },
      { new: true },
    );
  }

  //delete person
  async deletePerson(id: string): Promise<Person> {
    return await this.personModel.findByIdAndDelete(id);
  }

  // get rut validation
  async getRut(rut: number) {
    let rutExist: number;
    try {
      rutExist = await this.personModel.findOne({ rut });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return rutExist;
  }
}
