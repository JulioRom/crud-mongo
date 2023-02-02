import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './entities/person.entity';

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  //creating a person
  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    try {
      this.logger.log('Creating person...');
      let rut = await this.getRut(createPersonDto.rut);
      if (rut) {
        this.logger.error('Rut must be unique.');
        throw new HttpException('Duplicated unique rut', HttpStatus.CONFLICT);
      }

      var newPerson = new this.personModel(createPersonDto);
      var nPerson = newPerson.save();
      this.logger.log('Person created successfully');
      return nPerson;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
  //reading person collection
  async getPeople(): Promise<Person[]> {
    try {
      this.logger.log('Looking for people... ');
      const people = await this.personModel.find().exec();
      if (people.length === 0) {
        this.logger.error('People not found');
        throw new HttpException('People not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log('People found successfully');
      return people;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  //update person
  async updatePerson(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    try {
      this.logger.log('Updating person... ');
      const personUpdate = await this.personModel.findByIdAndUpdate(
        id,
        {
          ...updatePersonDto,
          update_date: new Date(),
        },
        { new: true },
      );
      this.logger.log('Person Updated');
      return personUpdate;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  //delete person
  async deletePerson(id: string): Promise<Person> {
    try {
      this.logger.log('Deleting person... ');
      const personDelete = await this.personModel.findByIdAndDelete(id);
      if (!personDelete) {
        this.logger.error('Person not found');
        throw new HttpException('PERSON_NOT_FOUND', HttpStatus.NOT_FOUND);
      } else {
        this.logger.log('Person Deleted');
        return personDelete;
      }
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`${e}`, HttpStatus.BAD_REQUEST);
    }
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
