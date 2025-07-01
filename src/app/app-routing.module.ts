import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

// const routes: Routes = [
//   { path:'', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
//   { path: 'contrats/suivi', component: SuiviComponent },
//   {
//   path: 'contrats/:id',
//   component: ContratDetailComponent
// },

// ];


const routes: Routes = [
  { path:'', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },

  {
    path: 'admin',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'rse',
        loadChildren: () => import('./views/pages/rse/rse.module').then(m => m.RSEModule)
      },
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
