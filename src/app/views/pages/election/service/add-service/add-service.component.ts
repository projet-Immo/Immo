import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {

  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() serviceToUpdate:any;
  @Input() isSearch: any;

  constructor(private serviceService:ServiceService,
    private modalService: NgbModal,
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
          description: new FormControl("",),
          date_creation: new FormControl("")
        }
      );
    }else{
      this.form = new FormGroup(
        {
          name: new FormControl(""),
          description: new FormControl(""),
          date_creation: new FormControl(),
        }
      );
    }
  }

  create() {
    let service = this.form.value;
    // console.log('Service',service);
    this.serviceService.createService(service).subscribe({
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
    this.modalService.dismissAll();
  }
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
