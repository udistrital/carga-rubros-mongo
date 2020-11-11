import { Test, TestingModule } from '@nestjs/testing';
import { CreateRubroMongoService } from './create-rubro-mongo.service';

describe('CreateRubroMongoService', () => {
  let service: CreateRubroMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRubroMongoService],
    }).compile();

    service = module.get<CreateRubroMongoService>(CreateRubroMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
