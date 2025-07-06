import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuiviProjetComponent } from './projet/suivi-projet/suivi-projet.component';
<<<<<<< HEAD
=======
import { ListProjetComponent } from './projet/list-projet/list-projet.component';
>>>>>>> prod
import { ObjectifListeComponent } from './Objestif/objectif-liste/objectif-liste.component';

const routes: Routes = [
  {path: '', component: ListProjetComponent},
  {path: 'projets', component: ListProjetComponent},
  {path: 'projet/:projetName', component: SuiviProjetComponent},
  {path: 'object', component: ObjectifListeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RSERoutingModule { }
