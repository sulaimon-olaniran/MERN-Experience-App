import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Form, Field, withFormik, } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import FileBase from 'react-file-base64'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'



import { CreateExperienceValidationSchema } from '../../components/validation_schema/ValidationSchema'
import MySelectComponent from './select_component/SelectComponent'
import { createExperience } from '../../store/actions/experiences'







const CreateExperiencePage = ({ setFieldValue, touched, errors, values }) => {
    
    
    const handleFileBaseDone = (file) =>{
        const imageName = file.name.substr(0, 20)
       
        setFieldValue("imageName", imageName)
        setFieldValue("imageUrl", file.base64)
    }

    
    const isAuth = useSelector((state) => state.auth.isAuth)




    if(!isAuth) return <Redirect to='/signin' />

    return (
        <div className="create-experience-page-form-container">


            <div className="create-experience-form-section-container">
                <div className="create-experience-page-form-image-div" />
                <Form>

                    <MySelectComponent
                        setFieldValue={setFieldValue}
                        touched={touched}
                        errors={errors}
                        values={values}
                    />


                    <Field
                        as={TextField}
                        type="text" name="title"
                        label="Title" id="outlined-basic"
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={touched.title && errors.title ? true : false}
                        helperText={touched.title && errors.title ? errors.title : null}
                    />


                    <Field as={TextField} type="text" name="summary" label="Summary"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={touched.summary && errors.summary ? true : false}
                        helperText={touched.summary && errors.summary ? errors.summary : null}
                    />

                    <label>

                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={(file) => handleFileBaseDone(file)}
                        />

                        <div 
                            className="custom-input-file-container"
                            style={ touched.imageUrl && errors.imageUrl &&  {borderColor : "red"}}
                        
                        >

                            <div className="button-container">
                                <p>Add Image </p><InsertPhotoIcon style={{ color: "white", marginLeft: "5px" }} />
                            </div>

                            <div className="file-name-container">
                               <p>{values.imageName ? values.imageName  : "No Image Selected"}</p> 
                            </div>

                        </div>

                        { touched.imageUrl && errors.imageUrl && <small>Please add an image</small>}
                    </label>


                    <Field
                        as={Button}
                        type="submit"
                        variant="outlined"
                        style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                    >
                        Share Experience
                    </Field >

                    

                </Form>
            </div>
        </div>
    )
}



const FormikCreateExperiencePage = withFormik({
    mapPropsToValues({ user }) {
        return {
            "category": "",
            "title": "",
            "summary": "",
            "createdBy": user?._id,
            "imageUrl": "",
            "imageName" : "",
        }
    },

    validationSchema: CreateExperienceValidationSchema,

    handleSubmit(values, { props, resetForm }) {
        
        const { createExperience } = props

        createExperience(values, resetForm)
        

    }
})(CreateExperiencePage)


const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}


//MADE USE OF CONNECT SO I CAN ACCESS THE REDUX STATE IN FORMIK SUBMIT FUNCTION
const mapDispatchToProps = (dispatch) =>{
    return{
        createExperience : (data, resetForm) => dispatch(createExperience(data, resetForm)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormikCreateExperiencePage)


