import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListElectionComponent } from './election/list-election/list-election.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';

const routes: Routes = [
  {path: '', component: ListElectionComponent},
  {path: 'elections', component: ListElectionComponent},
  {path: 'services', component: ListServiceComponent},
  {path: 'employes', component: ListEmployeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionRoutingModule { }
