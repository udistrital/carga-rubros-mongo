import { Test, TestingModule } from '@nestjs/testing';
import { InfoPlanAdquisicionesHelperService } from './info-plan-adquisiciones-helper.service';

describe('InfoPlanAdquisicionesHelperService', () => {
  let service: InfoPlanAdquisicionesHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoPlanAdquisicionesHelperService],
    }).compile();

    service = module.get<InfoPlanAdquisicionesHelperService>(InfoPlanAdquisicionesHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
