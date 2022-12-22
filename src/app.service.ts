import { Injectable } from '@nestjs/common';
import { Person, PersonDocument } from './schemas/person.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('person') private readonly userModel: Model<PersonDocument>,
  ) {}

  //creating a person
  async createPerson(person: Person): Promise<Person> {
    const newPerson = new this.userModel(person);
    return newPerson.save();
  }
  //reading person collection
  async readPerson() {
    return this.userModel
      .find({})
      .then((people) => {
        return people;
      })
      .catch((err) => console.log(err));
  }

  //update person
  async updatePerson(id, data): Promise<Person> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  //delete person
  async deletePerson(id) {
    return this.userModel.findByIdAndDelete(id);
  }
}
