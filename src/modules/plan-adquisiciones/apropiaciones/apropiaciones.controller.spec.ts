import { Test, TestingModule } from '@nestjs/testing';
import { ApropiacionesController } from './apropiaciones.controller';

describe('ApropiacionesController', () => {
  let controller: ApropiacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApropiacionesController],
    }).compile();

    controller = module.get<ApropiacionesController>(ApropiacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
