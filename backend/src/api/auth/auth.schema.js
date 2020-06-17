const yup = require("yup");

const sharedFields = {
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must contain an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
};

const signupSchema = yup.object().shape({
  ...sharedFields,
  name: yup.string().trim().min(2).required(),
});

const signinSchema = yup.object().shape({
  ...sharedFields,
});

module.exports = { signupSchema, signinSchema };
