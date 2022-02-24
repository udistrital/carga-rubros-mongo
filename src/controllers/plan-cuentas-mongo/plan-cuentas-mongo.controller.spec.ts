import { Test, TestingModule } from '@nestjs/testing';
import { PlanCuentasMongoController } from './plan-cuentas-mongo.controller';

describe('PlanCuentasMongoController', () => {
  let controller: PlanCuentasMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanCuentasMongoController],
    }).compile();

    controller = module.get<PlanCuentasMongoController>(PlanCuentasMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
