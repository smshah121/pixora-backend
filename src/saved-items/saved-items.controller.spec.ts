import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemController } from './saved-items.controller';
import { SavedItemService } from './saved-items.service';

describe('SavedItemsController', () => {
  let controller: SavedItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedItemController],
      providers: [SavedItemService],
    }).compile();

    controller = module.get<SavedItemController>(SavedItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
