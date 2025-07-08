import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent {

  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() employeToUpdate:any;
  @Input() isSearch: any;
  @Input() services: any;


  constructor(private employeService:EmployeService,
    private modalEmploye: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    if (!this.isSearch) {
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
    }else{
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
    }
  }

  create() {
    let employe = this.form.value;
    // console.log('Employe',employe);
    this.employeService.createEmploye(employe).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      },
      complete:()=>{
        this.close()
      }
    })
  }

  close(){
    this.modalEmploye.dismissAll();
  }
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
