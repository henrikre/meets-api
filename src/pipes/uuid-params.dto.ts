import { IsUUID } from "class-validator";

export class UuidParamsDto {

	@IsUUID('4', { each: true })
	ids: string[];

}
