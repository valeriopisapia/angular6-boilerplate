import { Routes } from '@angular/router';
// import { HomeComponent } from './containers/home';
import { NoContentComponent } from './components/no-content';

export const ROUTES: Routes = [
  { path: '',      component: NoContentComponent },
  { path: 'home',  loadChildren: './components/home/home.module#HomeModule' },
  //{ path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
