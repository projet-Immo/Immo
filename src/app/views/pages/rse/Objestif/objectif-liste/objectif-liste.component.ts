import { Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ObjectifService } from 'src/app/services/objectif/objectif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-objectif-liste',
  templateUrl: './objectif-liste.component.html',
  styleUrls: ['./objectif-liste.component.scss']
})
export class ObjectifListeComponent implements OnInit {

  objectifs: any[] = [];
    projets: any[] = []; 
  projetsMap: { [key: number]: string } = {};
  selectedObjectifId: any = null;
 selectedObjectif: any = null;

  @Input() projetId: number | null = null; 
  @ViewChild('DetailsObjectifModal') detailsModalRef!: TemplateRef<any>;
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
         private modalService: NgbModal,
          private projetService: ProjetService
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
      'dateFinReelle',
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
      'dateFinReelle',
      'projet',
      'actions'
    ];
  }

 


  this.projetService.getAllProjets().subscribe({
      next: (data) => {
        console.log('✅ Projets récupérés :', data);
        this.projets = data.payload || data;

        // Remplir la map ID → nom
        this.projets.forEach(projet => {
          this.projetsMap[projet.id] = projet.name;
        });
      },  error: (err) => console.error('Erreur getAllProjets :', err)
    });
  
     this.loadObjectifs();
}

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

        // ✅ Pour chaque objectif, récupérer le nom du projet si pas déjà fait
        this.objectifs.forEach(obj => {
          if (obj.projetId && !this.projetsMap[obj.projetId]) {
            this.projetService.getProjetById(obj.projetId).subscribe({
              next: (projet) => {
                this.projetsMap[obj.projetId] = projet.name;
              },
              error: (err) => console.error(`Erreur en récupérant le projet ${obj.projetId}`, err)
            });
          }
        });

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

deleteObjectif(objectifId: number) {
  Alertes.confirmAction(
    'Voulez-vous vraiment supprimer cet objectif ?',
    'Cet élément sera définitivement supprimé',
    () => {
      this.objectifService.deleteObjectifs(objectifId).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Suppression réussie');
        },
        error: (err) => {
          Alertes.alerteAddDanger(err.error.message || 'Erreur lors de la suppression');
        },
        complete: () => {
          this.loadObjectifs();
        }
      });
    }
  );
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
  this.selectedObjectif = objectif;
  this.modalService.open(this.detailsModalRef, { size: 'lg' });
}
  closeDetails() {
  this.selectedObjectif = null;
  this.modalService.dismissAll();}



ngOnChanges(changes: SimpleChanges): void {
  console.log('Changes détectés :', changes);
  if (changes['objectifId'] && this.objectifs) {
    this.loadObjectifs();
  }
}


}
