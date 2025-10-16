import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { CertificatService } from '../../../core/services/certificat/certificat.service';
import { Certificat } from '../../../core/models/certificat';
import { environnement } from '../../../../environnemnts/environnement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificat-list',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './certificat-list.component.html',
  styleUrl: './certificat-list.component.css'
})
export class CertificatListComponent {
  certificats!:Certificat[]
  url = environnement.Url
  isLoadingCertificat:Boolean = false
  

  constructor( private certificatService:CertificatService){

  }

  ngOnInit(){
    this.getCertificats()
  }

  getCertificats(){
    this.isLoadingCertificat = true
    this.certificatService.getCertificats().subscribe({
      next:(response)=>{
        this.isLoadingCertificat = false
        this.certificats = response.data
        console.log(this.certificats)
      },
      error:(error)=>{
        this.isLoadingCertificat = false
        console.log(error)
      }
    })
  }
}
