import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/Auth'
import { CreatePage } from './pages/Create'
import { DetailPage } from './pages/Detail'
import { LinksPage } from './pages/Links'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
    return (
        <Switch>
        <Route path="/links" exact>
            <LinksPage />
        </Route>
        <Route path="/create" exact>
            <CreatePage />
        </Route>
        <Route path="/detail/:id">
            <DetailPage />
        </Route>
        <Redirect to="/create" />
        </Switch>
    )
    }

    return (
    <Switch>
        <Route path="/" exact>
        <AuthPage />
        </Route>
        <Redirect to="/" />
    </Switch>
    )
}