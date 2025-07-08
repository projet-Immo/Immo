import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectifService } from 'src/app/services/objectif/objectif.service';
import { ProjetService } from 'src/app/services/projet/projet.service'; // <-- AJOUT

@Component({
  selector: 'app-objectif-add',
  templateUrl: './objectif-add.component.html',
  styleUrls: ['./objectif-add.component.scss']
})
export class ObjectifAddComponent implements OnInit {

  @Input() isSearch: boolean = false;
  @Output() search = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Input() projetId: number | null = null;

  form: FormGroup;
  isOldChecked = false;
  objectifForm: any;
  projets: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private objectifService: ObjectifService,
    private projetService: ProjetService // ✅ AJOUT
  ) {
    
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      typeObjectif: ['', Validators.required],
      description: ['', Validators.required],
      dateDebutPrevue: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      projetId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      typeObjectif: ['', Validators.required],
      dateDebutPrevue: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      projetId: [this.projetId]
    });
    

  // ✅ Toujours charger la liste
this.projetService.getAllProjets().subscribe({
  next: (data) => {
    console.log('Projets chargés :', data);
    this.projets = data.payload || data;

    // Pré-remplir si projetId fourni
    if (this.projetId) {
      this.form.patchValue({ projetId: this.projetId });
    }
  },
  error: (err) => console.error('Erreur chargement projets', err)
});

  }

  toggleOldDates() {
    this.isOldChecked = !this.isOldChecked;
    if (!this.isOldChecked) {
      this.form.patchValue({
        dateDebutReelle: null,
        dateFinReelle: null
      });
    }
  }

  create() {
    if (this.form.invalid) return;

    const payload = { ...this.form.value };
    this.objectifService.createObjectifs(payload).subscribe({
      next: () => this.submit.emit(),
      error: (err) => console.error('Erreur création objectif:', err)
    });
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

  close() {
    this.submit.emit();
  }

  onSearch() {
    const criteria = {
      typeObjectif: this.objectifForm.value.typeObjectif,
      dateDebut: this.objectifForm.value.dateDebut,
      dateFin: this.objectifForm.value.dateFin
    };
    this.search.emit(criteria);
  }
}
