import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { Formation } from '../../../core/models/formation';
import { FormationService } from '../../../core/services/formation/formation.service';
import { response } from 'express';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { AuthLoginResponse } from '../../../core/models/auth';
import { RouterLink } from '@angular/router';
import { environnement } from '../../../../environnemnts/environnement';
import { CommonModule } from '@angular/common';
import { PaginationLink, PaginationMeta, PaginationUrls } from '../../../core/models/pagination';


@Component({
  selector: 'app-formation-list',
  imports: [SidebarComponent, RouterLink, CommonModule],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent {

  constructor(private formationService: FormationService, private userLocalService: UserLocalService) { }
  formations!: Formation[]
  formationIdToDelete:number = -1
  user!: AuthLoginResponse | null
  isLoading: boolean = false
  paginationMeta:PaginationMeta | null = null
  currentPage:number = 1
  links!: PaginationUrls
  deleteModalOpen:boolean = false



  ngOnInit() {
    this.loadFormations(this.currentPage)
    this.user = this.userLocalService.getUser()
    console.log(this.user)
  }

  loadFormations(page: number) {
    this.isLoading = true;
    this.formationService.getFormations(page).subscribe({
      next: (response) => {
        console.log(response)
        this.formations = response.data
        console.log("data",this.formations)
        this.paginationMeta = response.meta
        this.links = response.links
        this.currentPage = response.meta.current_page
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;

      }
    })
  }

  onPageClick(link: PaginationLink) {
      if (!link.url) return;
  
      const url = new URL(link.url);
      const pageParam = url.searchParams.get('page');
      const page = pageParam ? parseInt(pageParam, 10) : 1;
  
      this.loadFormations(page);
  }
  deleteformation(){
    this.formationService.deleteFormation(this.formationIdToDelete).subscribe({
      next:(response)=>{
        console.log("Formation supprimer")
        console.log(response)
      },
      error:(error) =>{
        console.log("error", error)
      }
    })
  }

  confirmationDelete(){
    this.deleteformation()
    this.closeDeleteModal()
    this.loadFormations(this.currentPage)

  }

  openDeleteModal(id:number){
    this.deleteModalOpen = true
    this.formationIdToDelete = id
  }

  closeDeleteModal(){
    this.deleteModalOpen = false
  }
}
