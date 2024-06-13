import * as yup from 'yup';

export const signUpSchema: any = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%&?])[a-zA-Z0-9!#$%&?]{6,20}$/,
      'Пароль должен содержать минимум один спецсимвол, одну цифру, одну заглавную букву'
    ),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%&?])[a-zA-Z0-9!#$%&?]{6,20}$/,
      'Пароль должен содержать минимум один спецсимвол, одну цифру, одну заглавную букву'
    ),
  name: yup.string().required(),
  username: yup.string().required(),
});

export const signInSchema: any = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%&?])[a-zA-Z0-9!#$%&?]{6,20}$/,
      'Пароль должен содержать минимум один спецсимвол, одну цифру, одну заглавную букву'
    ),
});
