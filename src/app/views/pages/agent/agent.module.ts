import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddPosteAgentComponent } from './poste/add-poste-agent/add-poste-agent.component';

import { AddContratComponent } from './contrat/add-contrat/add-contrat.component';
import { EditContratComponent } from './contrat/edit-contrat/edit-contrat.component';
import { AddMissionAgentComponent } from './mission/add-mission-agent/add-mission-agent.component';
import { EditMissionAgentComponent } from './mission/edit-mission-agent/edit-mission-agent.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { ContratDetailComponent } from './contrat/contrat-detail/contrat-detail.component';
import { AddSalaireComponent } from './salaire/add-salaire/add-salaire.component';
import { EditSalaireComponent } from './salaire/edit-salaire/edit-salaire.component';
import { ListSalaireComponent } from './salaire/list-salaire/list-salaire.component';
import { ListPosteAgentComponent } from './poste/list-poste-agent/list-poste-agent.component';
import { SuiviAgentComponent } from './suivi-agent/suivi-agent.component';
import { EditPosteAgentComponent } from './poste/edit-poste-agent/edit-poste-agent.component';
import { ListMissionAgentComponent } from './mission/list-mission-agent/list-mission-agent.component';



@NgModule({
  declarations: [
    ListAgentComponent,
    AddAgentComponent,
    EditAgentComponent,
    ContratDetailComponent,
    
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule,
    

]
})

export class AgentModule { }
