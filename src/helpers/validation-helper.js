const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateEmail = (text) => (
  text && EMAIL_REGEX.test(text)
    ? undefined
    : 'Informe um endereço e-mail válido'
);

export const validatePassword = (text) => (
  text?.length >= 8 && text?.length <= 16
    ? undefined
    : 'A senha deve possuir de 8 a 16 caracteres'
);

export const validateName = (text) => (
  text?.length >= 5 && text?.length <= 200
    ? undefined
    : 'O nome deve possuir de 5 a 200 caracteres'
);

export const validateTaskTitle = (text) => (
  text?.length >= 1 && text?.length <= 1000
    ? undefined
    : 'O título deve possuir de 1 a 1000 caracteres'
);
