import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly appService: PersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPerson(@Body() createPersonDto: CreatePersonDto) {
    let newPerson = await this.appService.createPerson(createPersonDto);
    return newPerson;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPeople() {
    return await this.appService.getPerson();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updatePerson(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    return this.appService.updatePerson(id, updatePersonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deletePerson(@Param('id') id: string): Promise<Person> {
    return this.appService.deletePerson(id);
  }
}
