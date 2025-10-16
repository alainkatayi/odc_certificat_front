import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { FormationService } from '../../../core/services/formation/formation.service';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-formation-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './formation-create.component.html',
  styleUrl: './formation-create.component.css'
})
export class FormationCreateComponent {
  createFormationForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
 
  private router = inject(Router)

  constructor(private formationService:FormationService, private fb: FormBuilder, private userLocalService: UserLocalService) { }

  async ngOnInit() {
    this.createFormationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      certificat_file: ['', Validators.required],
      participant_file: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    })

  }

  selectedCertificatFile!: File;
  onCertificatFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCertificatFile = file;
      this.createFormationForm.patchValue({ certificat_file: file });
      this.createFormationForm.get('certificat_file')?.updateValueAndValidity();
    }
  }

  selectedParticipantFile!: File;
  onParticipantFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedParticipantFile = file;
      this.createFormationForm.patchValue({ participant_file: file });
      this.createFormationForm.get('participant_file')?.updateValueAndValidity();
    }
  }
  
  onSubmit() {
    this.isSubmited = true

    if (this.createFormationForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Remplissez correctement le formulaire"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("erreur lors de création")
    }

    const formValuer = this.createFormationForm.value
    const formData = new FormData

    formData.append('name', formValuer.name)
    formData.append('description', formValuer.description)
    formData.append('start_date', formValuer.start_date)
    formData.append('end_date', formValuer.end_date)
    if (this.selectedCertificatFile) {
      formData.append('certificat_file', this.selectedCertificatFile);
    }
    if (this.selectedParticipantFile) {
      formData.append('participant_file', this.selectedParticipantFile);
    }

    this.formationService.createFormation(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Formation créer avec success"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/formation-list'])
        }, 2000)
        console.log("formation créer", response)
      },

      error: (error) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Remplissez correctement le formulaire"
        this.toastType = 'error'
        console.log("error", error)
      }
    })
  }
}
