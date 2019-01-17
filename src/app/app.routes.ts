import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home';
import { NoContentComponent } from './components/no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
