import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'





import ExperienceCard from '../../components/experience_card/ExperienceCard'
import SpinnerLoader from '../../components/loaders/spinner_loader/SpinnerLoader'


const HomePage = () => {
    const [category, setCategory] = useState('All')


    const fetchingExperiences = useSelector((state) => state.experiences.fetchingExperiences)
    const experiences = useSelector((state) => state.experiences.experiences)


    const handleChange = (e) => {
        setCategory(e.target.value)
    }


    const filterExperiences = (data) => {
        if(category === "All") return data
        
        return data?.category.toLowerCase() === category.toLowerCase()
    }

    const filterdExperience = experiences?.filter(filterExperiences)


    if (fetchingExperiences) return <SpinnerLoader />
    return (
        <div className='home-page-container'>
            <div className="home-page-category-select-container">
                <FormControl
                    variant="outlined"
                    //style={{ width: "100%" }}
                >

                    <InputLabel htmlFor="outlined-age-native-simple">Choose Category</InputLabel>

                    <Select
                        native
                        onChange={handleChange}
                        label="Choose Category"
                        inputProps={{
                            name: 'category',
                            id: 'outlined-age-native-simple',
                        }}
                        value={category}
                    >
                        <option value="All">All</option>
                        <option value="Sports">Sports</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Work">Work</option>
                        <option value="Food" >Food</option>
                        <option value="Nature">Nature</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Travels">Travels</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Educational">Educational</option>
                        <option value="Emotional">Emotional</option>
                        <option value="Religious">Religious</option>
                        <option value="Others">Others</option>
                    </Select>

                </FormControl>
            </div>

            {
                filterdExperience?.length > 0 ? filterdExperience?.map(experience => {
                    return (
                        <ExperienceCard experience={experience} key={experience._id} />
                    )
                })
                :
                <div className ="homepage-no-experience-container">
                    <h1>No <span>{category}</span> Experience shared yet</h1>
                </div>
            }

        </div>
    )
}




export default HomePage