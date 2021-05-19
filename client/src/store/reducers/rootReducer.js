import { combineReducers } from 'redux'

import experiences from './experiences'
import auth from './auth'


export default combineReducers({
    auth,
    experiences,
})