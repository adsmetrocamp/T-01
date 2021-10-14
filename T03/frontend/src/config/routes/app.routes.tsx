import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Home } from '../../pages/Home';
import { Event } from '../../pages/Event';
import { EventRegister } from '../../pages/EventRegister';

interface Props {}

export const AppRoutes = (props: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Home} exact />
                <Route path="/event/register" component={EventRegister} exact />
                <Route path="/event/:id" component={Event} exact />
                <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    );
};
