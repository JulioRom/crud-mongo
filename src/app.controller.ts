import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Person } from './schemas/person.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createPerson(@Body() userDto: Person) {
    return this.appService.createPerson(userDto);
  }

  @Get()
  readPeople() {
    return this.appService.readPerson();
  }

  @Put(':id')
  async updatePeople(@Param('id') id: string, @Body() userDto: Person): Promise<Person> {
    return this.appService.updatePerson(id, userDto);
  }

  @Delete(':id')
  async deletePeople(@Param('id') id: string): Promise<Person> {
    return this.appService.deletePerson(id);
  }
}
