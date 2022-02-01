export const required = (value: string) =>
  value ? undefined : 'this field is required';

export const minLength = (min: number) => (value: string) =>
  value.length >= min ? undefined : `should be longer than ${min} symbols`;

export const isEmail = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'invalid email address'
    : undefined;

export const isSame = (firsPass: string) => (value: string) =>
  firsPass === value ? undefined : 'passwords does not match';

export const composeValidators =
  (...validators: any) =>
  (value: any) =>
    validators.reduce(
      (error: any, validator: (arg0: any) => any) => error || validator(value),
      undefined,
    );
