import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RSERoutingModule } from './rse-routing.module';
import { RseListProjetComponent } from './rse-list-projet/rse-list-projet.component';
import { AddProjetComponent } from './projet/add-projet/add-projet.component';
import { SuiviProjetComponent } from './projet/suivi-projet/suivi-projet.component';
import { ListProjetComponent } from './projet/list-projet/list-projet.component';


@NgModule({
  declarations: [
  
    RseListProjetComponent,
       AddProjetComponent,
       SuiviProjetComponent,
       ListProjetComponent
  ],
  imports: [
    CommonModule,
    RSERoutingModule,
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

export class RSEModule { }
