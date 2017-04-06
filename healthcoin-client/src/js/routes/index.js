import React from 'react'
import {Route, IndexRedirect, Redirect} from 'react-router'

import Layout from './layout'
import SignIn from '../components/auth/sign-in'
import SignUp from '../components/auth/sign-up'
import Init from '../components/profile/init'
import Dashboard from '../components/dashboard'
import NotFound404 from '../components/not-found-404'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = (
  <Route path='/' component={Layout}>
    <IndexRedirect to='/dashboard'/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/sign-in' component={SignIn}/>
    <Route path='/sign-up' component={SignUp}/>
    <Route path='/init' component={Init}/>
    <Route path='/404' component={NotFound404} />
    <Redirect from='*' to='/404' />
  </Route>
)

export default routes
