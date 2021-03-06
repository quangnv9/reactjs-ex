import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';

import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const Register = lazy(() => import('./modules/auth/pages/SignUpPage/SignUpPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage/LoginPage2'));
const Photo = lazy(() => import('./modules/photos/index'));
const Table = lazy(() => import('./modules/tables/index'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.register} component={Register} />
        <Route path={ROUTES.photo} component={Photo} />
        <Route path={ROUTES.table} component={Table} />

        <Route path="/" component={LoginPage} exact />
      </Switch>
    </Suspense>
  );
};
