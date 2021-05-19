import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Form, Field, withFormik, } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import BarLoader from "react-spinners/BarLoader"




import { SignInValidationSchema } from '../../../components/validation_schema/ValidationSchema'
import { signInUser } from '../../../store/actions/auth'






const SigninPage = ({ touched, errors, serverError }) => {

    const isAuth = useSelector((state) => state.auth.isAuth)
    const signingIn = useSelector((state) => state.auth.signingIn)

    if(isAuth) return <Redirect to='/profile' />
    return (
        <div className="auth-form-component-container">

            <Form className="auth-form-component-form">

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


                <Field
                    as={Button}
                    type="submit"
                    variant="outlined"
                    id='submit_button'
                    style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                >
                    Sign In
                </Field >

                {/* {serverError && <small className="auth-error-text">{serverError}</small>} */}
                {signingIn && <BarLoader color="#0B7C62" />}

            </Form>


        </div>
    )
}


export const FormikSignInPage = withFormik({
    mapPropsToValues() {
        return {
            "email": "",
            "password": "",
        }
    },

    validationSchema: SignInValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        const { signInUser, history } = props

        signInUser(values, history)

    }
})(SigninPage)




const mapStateToProps = state => {
    return {
        serverError: state.auth.signInError
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (user, history) => dispatch(signInUser(user, history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormikSignInPage))
