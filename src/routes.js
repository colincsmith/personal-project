import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Feed from './components/Feed/Feed'
import Form from './components/Form/Form'
import UserReviews from './components/UserReviews/UserReviews'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/reviews' component={UserReviews}/>
        <Route path='/create' component={Form}/>
    </Switch>
)