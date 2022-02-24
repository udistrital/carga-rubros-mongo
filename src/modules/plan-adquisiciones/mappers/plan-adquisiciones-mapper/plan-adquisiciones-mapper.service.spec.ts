import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesMapperService } from './plan-adquisiciones-mapper.service';

describe('PlanAdquisicionesMapperService', () => {
  let service: PlanAdquisicionesMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesMapperService],
    }).compile();

    service = module.get<PlanAdquisicionesMapperService>(PlanAdquisicionesMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
