import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Form, Field, withFormik, } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
//import { GoogleLogin } from 'react-google-login'
import { connect, useSelector } from 'react-redux'
import BarLoader from "react-spinners/BarLoader"




import { SignUpValidationSchema } from '../../../components/validation_schema/ValidationSchema'
import { signUpUser } from '../../../store/actions/auth'


//const googleClient = "587216852234plural-5prl8l58c95294u3uk13p2570p0mt8ee.apps.googleusercontent.com"



const SignupPage = ({ touched, errors }) => {

    //console.log(history)

    const isAuth = useSelector((state) => state.auth.isAuth)
    const signingUp = useSelector((state) => state.auth.signingUp)

    if(isAuth) return <Redirect to='/profile' />

    return (
        <div className="auth-form-component-container">

            <Form className="auth-form-component-form">
                <Field as={TextField}
                    type="text" name="firstName"
                    label="First Name" id="firstName"
                    variant="outlined"
                    error={touched.firstName && errors.firstName ? true : false}
                    helperText={touched.firstName && errors.firstName ? errors.firstName : null}
                    style={{ width: "90%" }}
                />

                <Field as={TextField}
                    type="text" name="lastName"
                    label="Last Name" id="lastName"
                    variant="outlined"
                    error={touched.lastName && errors.lastName ? true : false}
                    helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                    style={{ width: "90%" }}
                />

                <Field as={TextField}
                    type="email" name="email"
                    label="Email Address" id="email"
                    variant="outlined"
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email ? errors.email : null}
                    style={{ width: "90%" }}
                />


                <Field as={TextField}
                    type="password" name="password"
                    label="Password" id="password"
                    variant="outlined"
                    error={touched.password && errors.password ? true : false}
                    helperText={touched.password && errors.password ? errors.password : null}
                    style={{ width: "90%" }}
                />



                <Field as={TextField}
                    type="password" name="confirmPassword"
                    label="Confirm Password" id="confirmPassword"
                    variant="outlined"
                    error={touched.confirmPassword && errors.confirmPassword ? true : false}
                    helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                    style={{ width: "90%" }}
                />

                <Field
                    as={Button}
                    type="submit"
                    variant="outlined"
                    id='submit_button'
                    style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                    disabled={signingUp}
                >
                    Sign Up
                </Field >


                {/* {serverError !== null && <small className="auth-error-text">{serverError}</small>} */}
                {signingUp && <BarLoader color="#0B7C62" />}


            </Form>


        </div>
    )
}


const FormikSignUpPage = withFormik({
    mapPropsToValues() {
        return {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "confirmPassword": "",
        }
    },

    validationSchema: SignUpValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        const { signUpUser, history } = props
       
        signUpUser(values, history)

    }
})(SignupPage)


const mapStateToProps = state => {
    return {
        serverError: state.auth.signUpError
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: (user, history) => dispatch(signUpUser(user, history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormikSignUpPage))






