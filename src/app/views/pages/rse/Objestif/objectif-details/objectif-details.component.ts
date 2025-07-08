import { Component, ElementRef, Input, ViewChild } from '@angular/core';
// @ts-ignore
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-objectif-details',
  templateUrl: './objectif-details.component.html',
  styleUrls: ['./objectif-details.component.scss']
})
export class ObjectifDetailsComponent {

    @Input() objectif: any;  // Les données passées depuis le parent
 today: Date = new Date();
 logoUrl: string = 'assets/logo.png'; 
  @ViewChild('content', { static: false }) content!: ElementRef;

  downloadPdf() {
        const element = document.getElementById('printable');
    const options = {
      margin: 10,
      filename: `Objectif-${this.objectif.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  }
  ngOnInit(): void {
    console.log('Objectif à afficher :', this.objectif);
  }

}
