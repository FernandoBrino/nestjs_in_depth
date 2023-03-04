import { Injectable } from '@nestjs/common';
import { CreateCostumerDto } from 'src/costumers/dtos/CreateCostumer.dto';
import { Costumer } from 'src/costumers/types/Costumer';

@Injectable()
export class CostumersService {
  private costumers: Costumer[] = [
    {
      id: 1,
      email: 'fernando@gmail.com',
      name: 'Fernando',
    },
    {
      id: 2,
      email: 'rodolfo@gmail.com',
      name: 'Rodolfo',
    },
    {
      id: 3,
      email: 'nathan@gmail.com',
      name: 'Nathan',
    },
  ];

  findCostumerById(id: number) {
    return this.costumers.find((user) => user.id === id);
  }

  createCostumer(costumerDto: CreateCostumerDto) {
    this.costumers.push(costumerDto);
  }

  getCostumers() {
    return this.costumers;
  }
}
