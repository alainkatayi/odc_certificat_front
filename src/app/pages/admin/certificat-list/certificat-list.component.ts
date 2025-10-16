import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { CertificatService } from '../../../core/services/certificat/certificat.service';
import { Certificat } from '../../../core/models/certificat';
import { environnement } from '../../../../environnemnts/environnement';
import { CommonModule } from '@angular/common';
import { PaginationLink, PaginationMeta, PaginationUrls } from '../../../core/models/pagination';

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
  paginationMeta:PaginationMeta | null = null
  currentPage:number = 1
  links!: PaginationUrls
  

  constructor( private certificatService:CertificatService){

  }

  ngOnInit(){
    this.loadCertificats(this.currentPage)
  }

  loadCertificats(page:number){
    this.isLoadingCertificat = true
    this.certificatService.getCertificats(page).subscribe({
      next:(response)=>{
        this.isLoadingCertificat = false
        this.certificats = response.data
        console.log(this.certificats)
        this.paginationMeta = response.meta
        this.links = response.links
        this.currentPage = response.meta.current_page
      },
      error:(error)=>{
        this.isLoadingCertificat = false
        console.log(error)
      }
    })
  }

  onPageClick(link: PaginationLink) {
      if (!link.url) return;
  
      const url = new URL(link.url);
      const pageParam = url.searchParams.get('page');
      const page = pageParam ? parseInt(pageParam, 10) : 1;
  
      this.loadCertificats(page);
  }
}
