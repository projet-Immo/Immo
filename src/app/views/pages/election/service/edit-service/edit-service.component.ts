import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent {


  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() serviceToUpdate: any;
  @Input() isSearch: any;
  

  constructor(private serviceService: ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        description: new FormControl("",),
        date_creation: new FormControl("")
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.serviceToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.serviceToUpdate?.name);
      this.form?.get('description')?.setValue(this.serviceToUpdate.description);
      this.form?.get('date_creation')?.setValue(Helper.editDate(this.serviceToUpdate?.date_creation));
    }
  }

  update() {
    let service = this.form.value;
    // console.log('Service',service);
    this.serviceService.updateService(this.serviceToUpdate?.id, service).subscribe({
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
