import * as yup from 'yup'


export const SignUpValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Email is Required'),

    password: yup.string()
        .required("Password is required")
        .min(8, "Min of 8 characters"),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords don't match!")
        .required("Password Confirmation is required")
        .min(8, "Min of 8 characters"),

    firstName: yup.string()
        .required('First name cannot be empty')
        .min(2, 'Must contain Min of 2 Letters')
        .test('alphabets', 'Name must only contain alphabets', (value) => {
            return /^[a-zA-Z\s]+$/.test(value)
        }),

    lastName: yup.string()
        .required('Last name cannot be empty')
        .min(2, 'Must contain Min of 2 Letters')
        .test('alphabets', 'Name must only contain alphabets', (value) => {
            return /^[a-zA-Z\s]+$/.test(value)
        }),
})





export const SignInValidationSchema = yup.object().shape({
    email: yup.string()
    .email('Invalid email')
    .required('Email field cannot be empty'),

    password: yup.string()
    .required("Password field cannot be empty")

})






export const CreateExperienceValidationSchema = yup.object().shape({
    category: yup.string()
    .required('Select a category'),

    title: yup.string()
    .required("Add a title"),

    summary: yup.string()
    .required('Summarise your experience'),

    imageUrl: yup.string()
    .required("Add an image")

})