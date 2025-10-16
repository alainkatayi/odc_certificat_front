import { Component, inject } from '@angular/core';
import { AuthLoginResponse } from '../../../core/models/auth';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { AuthentificationsService } from '../../../core/services/authentifications/authentifications.service';
import { Router,  } from '@angular/router';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";



@Component({
  selector: 'app-dashboard',
  imports: [ SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!:AuthLoginResponse | null
  articleNumber!:number
  erroMessage=''

  private router = inject(Router)
  constructor(private userLocalService: UserLocalService, private authentificationService:AuthentificationsService ){}
  
  ngOnInit(){
    this.user = this.userLocalService.getUser()
    console.log("User",this.user)
  }

  logOut(){
    this.authentificationService.logOut()
    this.router.navigate(['/article-list'])
  }
}