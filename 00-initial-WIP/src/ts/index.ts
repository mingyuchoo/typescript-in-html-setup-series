/* sum */
export const sum = (a: number, b: number) => {
  return a + b;
};

/* msg */
export const msg = () => {
  alert('Hello, JavaScript!');
};

/* isValidPwdRegex */
export const isValidPwdRegex = (pwd: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
};
