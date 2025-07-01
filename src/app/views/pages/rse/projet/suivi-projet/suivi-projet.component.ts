import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet/projet.service';

@Component({
  selector: 'app-suivi-projet',
  templateUrl: './suivi-projet.component.html',
  styleUrls: ['./suivi-projet.component.scss']
})
export class SuiviProjetComponent {

  projetName: String;
  option: number = 2;
  projet : any;

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private projetServices : ProjetService){}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projetName = params['projetName'];
    });

    this.getProjet()
  }

  
  getProjet() {
      this.projetServices.getProjetName(this.projetName).subscribe(
      {
        next: response => {
          this.projet = response.payload;
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

}
