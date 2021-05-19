import React, { useState } from 'react'
import { Form, Field, withFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import FileBase from 'react-file-base64'
import { green } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'








const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'scroll',
    },

    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));




const EditProfileModal = ({ openModal, handleCloseModal, errors, touched, serverError, setFieldValue }) => {
    const [newImage, setNewImage] = useState(null)
    const [fileName, setFileName] = useState(null)
    const styles = useStyles()


    const handleFileBaseDone = (file) =>{
        const fName = file.name.substr(0, 20)
        setNewImage(file.base64)
        setFileName(fName)
        setFieldValue(setFieldValue("profileImage", file.base64))
    }


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className="edit-profile-modal-container">

                <div className="edit-profile-modal-nav-container">
                    <ArrowBackIosIcon
                        onClick={handleCloseModal}
                    />
                </div>

                <Form className="edit-profile-modal-form-container">
                    <Avatar
                        className={styles.large}
                        src={newImage ? newImage : "https://i.pinimg.com/736x/a1/a1/95/a1a1952c5994e3ecb1be48a919290426.jpg"}
                    />

                    <label>

                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={(file) => handleFileBaseDone(file)}
                        />

                        <div className="custom-input-file-container">

                            <div className="button-container">
                                <p>Profile Image </p><InsertPhotoIcon style={{ color: "white", marginLeft: "5px" }} />
                            </div>

                            <div className="file-name-container">
                                <p>{fileName ? fileName : "No Image Selected"}</p>
                            </div>

                        </div>


                    </label>

                    <Field as={TextField}
                        type="text" name="firstName"
                        label="First Name" id="firstName"
                        variant="outlined"
                        error={touched.firstName && errors.firstName ? true : false}
                        helperText={touched.firstName && errors.firstName ? errors.firstName : null}
                        style={{ width: "95%" }}
                    />

                    <Field as={TextField}
                        type="text" name="lastName"
                        label="Last Name" id="lastName"
                        variant="outlined"
                        error={touched.lastName && errors.lasNname ? true : false}
                        helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                        style={{ width: "95%" }}
                    />

                    <Field as={TextField}
                        type="text" name="about"
                        label="About You" id="about"
                        variant="outlined"
                        error={touched.about && errors.about ? true : false}
                        helperText={touched.about && errors.about ? errors.about : null}
                        style={{ width: "95%" }}
                    />



                    <Field as={TextField}
                        type="text" name="website"
                        label="Your Website Link" id="website"
                        variant="outlined"
                        style={{ width: "95%" }}
                    />



                    <Field as={TextField}
                        type="text" name="instagram"
                        label="Your Instagram Link" id="instagram"
                        variant="outlined"
                        style={{ width: "95%" }}
                    />


                    <Field as={TextField}
                        type="text" name="twitter"
                        label="Your Twitter Link" id="twitter"
                        variant="outlined"
                        style={{ width: "95%" }}
                    />




                    <Field as={TextField}
                        type="text" name="facebook"
                        label="Your Facebook Link" id="facebook"
                        variant="outlined"
                        style={{ width: "95%" }}
                    />



                    <Field
                        as={Button}
                        type="submit"
                        variant="outlined"
                        id='submit_button'
                        style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                    >
                        Update Profile
                    </Field >

                    {serverError !== null && <small className="auth-error-text">{serverError}</small>}



                </Form>

            </div>

        </Modal>
    )
}




const FormikEditProfile = withFormik({
    mapPropsToValues() {
        return {
            "firstName": "",
            "lastName": "",
            "profileImage": "",
            "facebook": "",
            "instagram": "",
            "twitter": "",
            "about": "",
            "website": ""
        }
    },

    //validationSchema: SignUpValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        //const { signUpUser } = props
        //const { firstName, lastName, email, password } = values

        console.log(values)

    }
})(EditProfileModal)


const mapStateToProps = state => {
    return {
        serverError: state.auth.signUpError
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        //signUpUser: user => dispatch(signUpUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormikEditProfile)