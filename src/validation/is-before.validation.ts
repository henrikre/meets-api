import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBefore(property: string, validationOptions?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'isBefore',
			propertyName,
			target: object.constructor,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					const relatedValue = (args.object as any)[relatedPropertyName];
					return new Date(value).valueOf() < new Date(relatedValue).valueOf();
				},
			},
		});
	};
}
