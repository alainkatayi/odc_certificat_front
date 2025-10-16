import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthentificationsService } from '../../core/services/authentifications/authentifications.service';
import { AuthLoginData, AuthLoginResponse } from '../../core/models/auth';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading= false
  showToast=false
  toastType:'error'|'success' = 'success'
  toastMessage=''
  private router = inject(Router)


  constructor(private fb:FormBuilder, private authService:AuthentificationsService, private userLocalService:UserLocalService){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit():void{
    this.isLoading = true
    const data:AuthLoginData = this.loginForm.value

    this.authService.login(data).subscribe({
      next:(response:AuthLoginResponse)=>{
        this.isLoading = false
        this.showToast = true
        this.toastMessage = "Connexion réussis"
        this.toastType ='success'
        this.userLocalService.storeUserLocal(response)
        setTimeout(()=>{
          this.showToast = false
          this.router.navigate(['/dashboard'])
      }, 2000)
        console.log("Login Response: ", response)
      },

      error:(error)=>{
        this.isLoading = false
        this.showToast = true
        this.toastType ='error'
        this.toastMessage = "Email ou mot de passe incorrect"
        setTimeout(()=>{
          this.showToast = false
      }, 2000)
        console.log("Login Error", error)
      }
    })
  }

}
