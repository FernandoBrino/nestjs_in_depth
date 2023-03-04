import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Param, Post, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CreateCostumerDto } from 'src/costumers/dtos/CreateCostumer.dto';
import { CostumersService } from 'src/costumers/services/costumers/costumers.service';

@Controller('costumers')
export class CostumersController {
  constructor(private costumersService: CostumersService) {}

  @Get(':id')
  getCostumers(@Param('id', ParseIntPipe) id: number) {
    const costumer = this.costumersService.findCostumerById(id);

    if (!costumer) {
      throw new HttpException('Costumer not found!', HttpStatus.BAD_REQUEST);
    }

    return costumer;
  }

  @Get('/search/:id')
  searchCostumersById(@Param('id', ParseIntPipe) id: number) {
    const costumer = this.costumersService.findCostumerById(id);

    if (costumer) return costumer;
    else throw new HttpException('Costumer not found!', HttpStatus.BAD_REQUEST);
  }

  @Get('')
  getAllCostumers() {
    return this.costumersService.getCostumers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCostumer(@Body() createCostumerDto: CreateCostumerDto) {
    this.costumersService.createCostumer(createCostumerDto);
  }
}
