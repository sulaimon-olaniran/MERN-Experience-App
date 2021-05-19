import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'






const MySelectComponent = ({ setFieldValue, errors, touched, values }) => {
   

    const handleChange = (e) => {

        //MANUALLY SET CATEGORY'S VALUE IN FORMIK TO TARGET VALUE
        setFieldValue("category", e.target.value, true)
    }

    return (

        <FormControl 
            variant="outlined" 
            style={{ width: "100%" }}
            error={touched.category && errors.category ? true : false}
        >

            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>

            <Select
                native
                onChange={handleChange}
                label="Category"
                inputProps={{
                    name: 'category',
                    id: 'outlined-age-native-simple',
                }}
                value={values.category}
            >
                <option aria-label="None" value="" />
                <option value="Sports">Sports</option>
                <option value="Adventure">Adventure</option>
                <option value="Work">Work</option>
                <option value="Food" >Food</option>
                <option value="Travels">Nature</option>
                <option value="Vacation">Vacation</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Travels">Travels</option>
                <option value="Emotional">Emotional</option>
                <option value="Religious">Religious</option>
                <option value="Educational">Educational</option>
                <option value="Others">Others</option>
            </Select>

            {touched.category && errors.category && <small>{errors.category}</small> }

        </FormControl>
    )
}





export default MySelectComponent