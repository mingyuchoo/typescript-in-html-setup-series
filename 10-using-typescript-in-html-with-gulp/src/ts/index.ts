/* sum */
export const sum = (a: number, b: number): number => {
  return a + b;
};

/* msg */
export const msg = (): void => {
  alert('Hello, JavaScript!');
};

export const helloWorld = (): string => {
  return 'Hello, World!';
};

/* isValidPwdRegex */
export const isValidPwdRegex = (pwd: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
};
