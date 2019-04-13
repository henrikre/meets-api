import { Test, TestingModule } from 'src/modules/event/node_modules/@nestjs/testing';
import { RoomController } from './room.controller';

describe('Rooms Controller', () => {
	let controller: RoomController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RoomController],
		}).compile();

		controller = module.get<RoomController>(RoomController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
