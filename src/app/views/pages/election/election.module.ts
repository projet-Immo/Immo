import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { AddElectionComponent } from './election/add-election/add-election.component';
import { EditElectionComponent } from './election/edit-election/edit-election.component';
import { ListElectionComponent } from './election/list-election/list-election.component';
import { ElectionRoutingModule } from './election-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
  
    ListServiceComponent,
       AddServiceComponent,
       EditServiceComponent,
       ListEmployeComponent,
       AddEmployeComponent,
       EditEmployeComponent,
       AddElectionComponent,
       EditElectionComponent,
       ListElectionComponent
  ],
  imports: [
    CommonModule,
    ElectionRoutingModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class ElectionModule { }
