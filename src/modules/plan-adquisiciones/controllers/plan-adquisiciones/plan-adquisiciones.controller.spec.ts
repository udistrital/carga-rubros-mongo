import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesController } from './plan-adquisiciones.controller';

describe('PlanAdquisicionesController', () => {
  let controller: PlanAdquisicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanAdquisicionesController],
    }).compile();

    controller = module.get<PlanAdquisicionesController>(PlanAdquisicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
