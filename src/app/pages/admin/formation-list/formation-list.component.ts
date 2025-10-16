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
import { PaginationMeta, PaginationUrls } from '../../../core/models/pagination';


@Component({
  selector: 'app-formation-list',
  imports: [SidebarComponent, RouterLink, CommonModule],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent {

  constructor(private formationService: FormationService, private userLocalService: UserLocalService) { }
  formations!: Formation[]
  user!: AuthLoginResponse | null
  isLoading: boolean = false
  next_page_url!:string | null



  ngOnInit() {
    this.loadFormations()
    this.user = this.userLocalService.getUser()
    console.log(this.user)
  }

  loadFormations(page: number = 1) {
    this.isLoading = true;
    this.formationService.getFormations(page).subscribe({
      next: (response) => {
        console.log(response)
        this.formations = response.data
        console.log("data",this.formations)
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;

      }
    })
  }
}
