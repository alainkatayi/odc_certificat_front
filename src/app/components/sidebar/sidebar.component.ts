import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { User } from '../../core/models/user';
import { AuthLoginResponse } from '../../core/models/auth';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user!:AuthLoginResponse | null
  constructor(private userLocalService:UserLocalService){}
  ngOnInit(){
    this.user = this.userLocalService.getUser()
  }
}
