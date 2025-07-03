import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuiviProjetComponent } from './projet/suivi-projet/suivi-projet.component';
import { ListProjetComponent } from './projet/list-projet/list-projet.component';

const routes: Routes = [
  {path: '', component: ListProjetComponent},
  {path: 'projets', component: ListProjetComponent},
  {path: 'projet/:projetName', component: SuiviProjetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RSERoutingModule { }
