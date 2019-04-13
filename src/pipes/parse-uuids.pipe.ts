import { Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { UuidParamsDto } from './uuid-params.dto';
import { validate } from 'class-validator';
import * as R from 'ramda';

@Injectable()
export class ParseUuidsPipe implements PipeTransform<string, Promise<string[]>> {
	async transform(value: string) {
		const ids = R.pipe(
			R.split(','),
			R.reject(R.isEmpty),
		)(value);
		const params = Object.assign(new UuidParamsDto(), { ids });

		return validate(params)
			.then(errors => {
				if (errors.length > 0) {
					throw new UnprocessableEntityException(errors);
				}

				return ids;
			});
	}
}
