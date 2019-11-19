import React from 'react';

const MainFlow = React.lazy(() => import('./views/MainFlow'));
const PressData = React.lazy(() => import('./views/data/PressData'));
const Alloy = React.lazy(() => import('./views/data/Alloy'));
const Surface = React.lazy(() => import('./views/data/Surface'));
const Complexity = React.lazy(() => import('./views/data/Complexity'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/mainflow', name: 'MainFlow', component: MainFlow },
  { path: '/alloy', exact: true, name: 'Alloy', component: Alloy },
  { path: '/press_data', name: 'PressData', component: PressData },
  { path: '/surface', name: 'Surface', component: Surface },
  { path: '/complexity', name: 'Complexity', component: Complexity }
];

export default routes;
