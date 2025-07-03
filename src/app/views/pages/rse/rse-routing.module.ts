import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RseListProjetComponent } from './rse-list-projet/rse-list-projet.component';
import { SuiviProjetComponent } from './projet/suivi-projet/suivi-projet.component';
import { ObjectifListeComponent } from './Objestif/objectif-liste/objectif-liste.component';

const routes: Routes = [
  {path: '', component: RseListProjetComponent},
  {path: 'projet/:projetName', component: SuiviProjetComponent},
  {path: 'object', component: ObjectifListeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RSERoutingModule { }
