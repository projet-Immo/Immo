import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectifService } from 'src/app/services/objectif/objectif.service';

@Component({
  selector: 'app-objectif-add',
  templateUrl: './objectif-add.component.html',
  styleUrls: ['./objectif-add.component.scss']
})
export class ObjectifAddComponent {

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
    private objectifService: ObjectifService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      typeObjectif: ['', Validators.required],
      dateDebutPrevue: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      projetId: [this.projetId] // ✅ Utilise projetId direct
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
    // ✅ Vérifie dates : format yyyy-MM-dd
    // Ton backend attend String pour DTO, donc c'est OK

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
