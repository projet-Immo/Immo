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
import { ObjectifListeComponent } from './Objestif/objectif-liste/objectif-liste.component';
import { ObjectifAddComponent } from './Objestif/objectif-add/objectif-add.component';
import { ObjectifEditComponent } from './Objestif/objectif-edit/objectif-edit.component';


@NgModule({
  declarations: [
  
    RseListProjetComponent,
       AddProjetComponent,
       SuiviProjetComponent,
       ObjectifListeComponent,
       ObjectifAddComponent,
       ObjectifEditComponent
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
  NgSelectModule
]
})

export class RSEModule { }
