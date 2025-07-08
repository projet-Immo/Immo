import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent {


  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() employeToUpdate: any;
  @Input() isSearch: any;
  @Input() services: any;

  constructor(private employeService: EmployeService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        surname: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required),
        poste: new FormControl("", Validators.required),
        salaire: new FormControl("", Validators.required),
        date_insertion: new FormControl(""),
        serviceId: new FormControl("", Validators.required)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.employeToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.employeToUpdate?.name);
      this.form?.get('surname')?.setValue(this.employeToUpdate.surname);
      this.form?.get('poste')?.setValue(this.employeToUpdate.phone);
      this.form?.get('phone')?.setValue(this.employeToUpdate.phone);
      this.form?.get('salaire')?.setValue(this.employeToUpdate.salaire);
      this.form?.get('date_insertion')?.setValue(Helper.editDate(this.employeToUpdate?.date_insertion));
      this.form?.get('serviceId')?.setValue(this.employeToUpdate?.serviceId);
    }
  }

  update() {
    let employe = this.form.value;
    // console.log('Employe',employe);
    this.employeService.updateEmploye(this.employeToUpdate?.id, employe).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      },
      complete: () => {
        this.close()
      }
    })
  }

  close() {
    this.modalService.dismissAll();
  }

  doSearch() {
    this.search.emit(this.form.value)
  }

  emitSubmit() {
    this.submit.emit(true);
  }
}
