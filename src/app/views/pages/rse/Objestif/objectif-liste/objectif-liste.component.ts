import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ObjectifService } from 'src/app/services/objectif/objectif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-objectif-liste',
  templateUrl: './objectif-liste.component.html',
  styleUrls: ['./objectif-liste.component.scss']
})
export class ObjectifListeComponent implements OnInit {

  objectifs: any[] = [];
  selectedObjectifId: any = null;
  @Input() projetId: number | null = null; // Optionnel, si vous souhaitez filtrer par projet
   
  displayedColumns: string[] = [
    'id',
    'libelle',
    'description',
    'typeObjectif',
    'dateDebutPrevue',
    'dateFinPrevue',
    'dateDebutReelle',
  'dateFinReelle',
    'projet',
    'actions'
  ];


  constructor(private objectifService: ObjectifService,
         private modalService: NgbModal
  )
   { }

 ngOnInit(): void {
  if (this.projetId) {
    this.displayedColumns = [
      'libelle',
      'description',
      'typeObjectif',
      'dateDebutPrevue',
      'dateFinPrevue',
      'dateDebutReelle',
<<<<<<< HEAD
      'dateFinReelle',
=======
  'dateFinReelle',
>>>>>>> prod
      'actions'
    ];
  } else {
    this.displayedColumns = [
      'id',
      'libelle',
      'description',
      'typeObjectif',
      'dateDebutPrevue',
      'dateFinPrevue',
      'dateDebutReelle',
<<<<<<< HEAD
      'dateFinReelle',
=======
  'dateFinReelle',
>>>>>>> prod
      'projet',
      'actions'
    ];
  }

  this.loadObjectifs();
}

/*
  loadObjectifs(): void {
    this.objectifService.getAllObjectifs().subscribe({
      next: (response) => {
        console.log(response); // vérifie la structure
        this.objectifs = response.payload || response;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des objectifs :', error);
      }
    });
  }*/

loadObjectifs(): void {
  if (this.projetId) {
    this.objectifService.getObjectifsByProjetId(this.projetId).subscribe({
      next: (response) => {
        this.objectifs = response.payload || response;
      },
      error: (error) => console.error('Erreur lors du chargement des objectifs du projet :', error)
    });
  } else {
    this.objectifService.getAllObjectifs().subscribe({
      next: (response) => {
        this.objectifs = response.payload || response;
      },
      error: (error) => console.error('Erreur lors du chargement de tous les objectifs :', error)
    });
  }
}



 openSearchObjectif(modal: any) {
  console.log("Ouverture modal recherche");
  this.modalService.open(modal, { size: 'lg' });
}

  openAddObjectif(modal: any) {
  this.modalService.open(modal, { size: 'lg' });
}

   openEditObjectif(modal: TemplateRef<any>, objectif: any) {
    console.log('ID envoyé au modal :', objectif.id);
    this.selectedObjectifId = objectif.id;
    this.modalService.open(modal, { size: 'lg' });
  }

  deleteObjectif(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet objectif ?')) {
      this.objectifService.deleteObjectifs(id).subscribe({
        next: () => {
          console.log('Objectif supprimé');
          this.loadObjectifs();
        },
        error: (error) => console.error('Erreur suppression :', error)
      });
    }
  }

 doSearch(criteria: any) {
  console.log('Critères reçus :', criteria);

  const typeObjectif = criteria.typeObjectif || '';
  const dateDebut = criteria.dateDebutPrevue || '';
  const dateFin = criteria.dateFinPrevue || '';

  this.objectifService.searchObjectifs(typeObjectif, dateDebut, dateFin).subscribe({
    next: (response) => {
      console.log('Résultat recherche :', response);
      this.objectifs = response.payload || response;
    },
    error: (error) => console.error('Erreur recherche :', error)
  });
}


  viewDetails(objectif: any) {
    // Ici ton code pour afficher les détails
    console.log('Voir détails :', objectif);
  }

ngOnChanges(changes: SimpleChanges): void {
  console.log('Changes détectés :', changes);
  if (changes['objectifId'] && this.objectifs) {
    this.loadObjectifs();
  }
}


}
