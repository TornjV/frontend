import React from 'react';
import { Router } from 'react-router';
import { history } from '../constants';
import { requireAuth } from '../utils';
import Services from '../components/pages/service-list';
import Clusters from '../components/pages/cluster-list';
import Provisions from '../components/pages/provision-list';
import Login from '../components/pages/login';
import NotFound from '../components/pages/not-found';
import Layout from '../components/layouts/layout';
import '../sass/reset.scss';
import '../sass/global.scss';


function Component(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

Component.propTypes = {
  children: React.PropTypes.node,
};


const routes = {
  component: Component,
  childRoutes: [
    {
      path: '/',
      component: Layout,
      onEnter: requireAuth,
      childRoutes: [
        Services,
        Clusters,
        Provisions,
      ],
    },
    {
      path: '/login/',
      component: Login,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};


function Main() {
  return (
    <Router history={history} routes={routes} />
  );
}

export default Main;
