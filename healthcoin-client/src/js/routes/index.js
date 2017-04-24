import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import Layout from './layout'
import Landing from '../components/landing';
import SignIn from '../components/auth/sign-in'
import SignUp from '../components/auth/sign-up'
import Init from '../components/profile/init'
import Dashboard from '../components/dashboard'
import Coins from '../components/coins'
import BioHistory from '../components/bio-history'
import AdminSignIn from '../components/admin/sign-in'
import AdminDashboard from '../components/admin'
import AdminGroups from '../components/admin/groups'
import AdminGroupDetails from '../components/admin/group-details'
import NotFound404 from '../components/not-found-404'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Landing}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/sign-in' component={SignIn}/>
    <Route path='/sign-up' component={SignUp}/>
    <Route path='/init' component={Init}/>
    <Route path='/coins' component={Coins}></Route>
    <Route path='/bio-history' component={BioHistory}></Route>
    <Route path='/admin/sign-in' component={AdminSignIn}/>
    <Route path='/admin' component={AdminDashboard}/>
    <Route path='/admin/groups' component={AdminGroups}/>
    <Route path='/admin/group/:id' component={AdminGroupDetails}/>
    <Route path='/404' component={NotFound404} />
    <Redirect from='*' to='/404' />
  </Route>
)

export default routes
