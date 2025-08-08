import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPeriod(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPeriod',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])$/.test(value)
          );
        },
        defaultMessage() {
          return 'Period must be in YYYY-MM format with valid year (1900-2099) and month (01-12)';
        },
      },
    });
  };
}
