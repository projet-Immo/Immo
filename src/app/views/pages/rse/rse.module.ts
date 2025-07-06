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
import { AddProjetComponent } from './projet/add-projet/add-projet.component';
import { SuiviProjetComponent } from './projet/suivi-projet/suivi-projet.component';
<<<<<<< HEAD
import { ObjectifListeComponent } from './Objestif/objectif-liste/objectif-liste.component';
import { ObjectifAddComponent } from './Objestif/objectif-add/objectif-add.component';
import { ObjectifEditComponent } from './Objestif/objectif-edit/objectif-edit.component';
=======
import { ListProjetComponent } from './projet/list-projet/list-projet.component';
import { EditProjetComponent } from './projet/edit-projet/edit-projet.component';
>>>>>>> prod


@NgModule({
  declarations: [
<<<<<<< HEAD
  
    RseListProjetComponent,
       AddProjetComponent,
       SuiviProjetComponent,
       ObjectifListeComponent,
       ObjectifAddComponent,
       ObjectifEditComponent
=======
      AddProjetComponent,
      SuiviProjetComponent,
      ListProjetComponent,
      EditProjetComponent
>>>>>>> prod
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
