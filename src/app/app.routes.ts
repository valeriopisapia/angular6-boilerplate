import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: NoContentComponent },
  { path: 'home',  loadChildren: './home/home.module#HomeModule' },
  { path: '**',    component: NoContentComponent },
];
