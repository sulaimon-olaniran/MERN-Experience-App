import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Pusher from 'pusher-js'


import './styles/styles.scss'


import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home/HomePage'
import CreateExperiencePage from './pages/create_experience/CreateExperience'
import Experience from './pages/experience/Experience'
import Profile from './pages/profile/Profile'
import UserPage from './pages/user/UserPage'
import SignupPage from './pages/auth/signup/Signup'
import SigninPage from './pages/auth/signin/Signin'


import { getAccount } from './store/actions/auth'
import { getAllExperiences } from './store/actions/experiences'
import EditProfile from './pages/edit_profile/EditProfile'
import LogoLoader from './components/loaders/logo_loader/LogoLoader'
import ExperienceSnackbar from './components/snackbars/ExperienceSnackbar'
import ActionLoader from './components/loaders/action_loader/ActionLoader'
import AuthSnackbar from './components/snackbars/AuthSnackbar'
import VerificationPage from './pages/verification_page/VerificationPage'






function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllExperiences())
    dispatch(getAccount())

    const pusher = new Pusher('249f2df25e3d65b17fd7', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('experience')

    channel.bind('profile', function (data) {
      dispatch(getAccount())
      //console.log(data)
    })

    channel.bind('experience', function (data) {
      dispatch(getAllExperiences())
      //console.log(data)
    })


    return () => {
      channel.unbind('profile')
      channel.unbind('experience')
    }


  }, [dispatch])

  const fetchingAccount = useSelector((state) => state.auth.fetchingAccount)


  if (fetchingAccount) return <LogoLoader />
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pages-container">

          <Switch>

            <Route exact path='/' component={HomePage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/signin' component={SigninPage} />
            <Route exact path='/experience/:id' component={Experience} />
            <Route exact path='/create/experience' component={CreateExperiencePage} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/edit' component={EditProfile} />
            <Route exact path='/user/:id' component={UserPage} />
            <Route exact path='/user/email/verification' component={VerificationPage} />

          </Switch>

        </div>
        <ActionLoader />
        <ExperienceSnackbar />
        <AuthSnackbar />
      </div>
    </Router>

  );
}



export default App;
