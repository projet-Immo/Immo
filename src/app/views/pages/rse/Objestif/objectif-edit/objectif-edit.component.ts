import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectifService } from 'src/app/services/objectif/objectif.service';

@Component({
  selector: 'app-objectif-edit',
  templateUrl: './objectif-edit.component.html',
  styleUrls: ['./objectif-edit.component.scss']
})
export class ObjectifEditComponent {
    @Input() objectifId!: number; // ou string selon ton type
  @Output() submit = new EventEmitter<any>();
<<<<<<< HEAD
  @Input() isSearch: boolean = false;
  @Input() projetId: number | null = null;
=======
>>>>>>> master

  form!: FormGroup;
  isOldChecked = false;

  constructor(
    private fb: FormBuilder,
    private objectifService: ObjectifService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle: [],
      description:[],
      typeObjectif: [],
      dateDebutPrevue: [],
      dateFinPrevue: [],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      projetId: []
    });

    this.loadObjectif();
  }

  loadObjectif() {
    this.objectifService.getObjectifsId(this.objectifId).subscribe({
      next: (res) => {
        const obj = res.payload;

        this.form.patchValue({
          libelle: obj.libelle,
          description: obj.description,
          typeObjectif: obj.typeObjectif,
          dateDebutPrevue: this.formatDate(obj.dateDebutPrevue),
          dateFinPrevue: this.formatDate(obj.dateFinPrevue),
          dateDebutReelle: obj.dateDebutReelle ? this.formatDate(obj.dateDebutReelle) : null,
          dateFinReelle: obj.dateFinReelle ? this.formatDate(obj.dateFinReelle) : null,
          projetId: obj.projet?.id
        });

        this.isOldChecked = !!obj.dateDebutReelle || !!obj.dateFinReelle;
      },
      error: (err) => console.error('Erreur chargement objectif', err)
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return dateString.split('T')[0];
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

<<<<<<< HEAD
 update() {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  // Si projetId est défini, remplace la valeur du champ
  if (this.projetId) {
    formValue.projetId = this.projetId;
  }

  this.objectifService.updateObjectifs(this.objectifId, formValue).subscribe({
    next: () => this.submit.emit(),
    error: (err) => console.error('Erreur modification objectif', err)
  });
}


=======
  update() {
    if (this.form.invalid) return;

    this.objectifService.updateObjectifs(this.objectifId, this.form.value).subscribe({
      next: () => this.submit.emit(),
      error: (err) => console.error('Erreur modification objectif', err)
    });
  }

>>>>>>> master
  close() {
    this.submit.emit();
  }

 
  

}
