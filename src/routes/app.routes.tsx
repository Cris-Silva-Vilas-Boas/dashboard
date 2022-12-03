import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Layout from '../components/Layout';

const AppRoutes: React.FC = () =>(
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/list/:type" exact component={List}/>
        </Switch>
    </Layout>
);

export default AppRoutes;