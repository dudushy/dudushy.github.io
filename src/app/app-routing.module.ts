import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
// import { TestComponent } from './pages/test/test.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  // { path: 'test', component: TestComponent },
  // { path: 'not-found', component: NotFoundComponent },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'not-found' }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
