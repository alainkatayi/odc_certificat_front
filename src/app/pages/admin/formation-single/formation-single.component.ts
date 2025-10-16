import { FormationService } from './../../../core/services/formation/formation.service';
import { Formation } from './../../../core/models/formation';
import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
import { ParticipantService } from '../../../core/services/participant/participant.service';
import { Participant } from '../../../core/models/participant';
import { CertificatService } from '../../../core/services/certificat/certificat.service';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { CommonModule } from '@angular/common';
import { Certificat } from '../../../core/models/certificat';
import { environnement } from '../../../../environnemnts/environnement';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formation-single',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './formation-single.component.html',
  styleUrl: './formation-single.component.css'
})
export class FormationSingleComponent {
  formation!: Formation
  formationId!: number
  data!: FormData
  certificats!: Certificat[]
  participants!: Participant[]
  isGenerating: Boolean = false
  isLoadingParticipants: Boolean = false
  isLoadingCertificats: Boolean = false
  isLoadingFormation: Boolean = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  addParticipantModalOpen: Boolean = false
  createParticipantForm!: FormGroup
  url = environnement.Url


  constructor(private formationService: FormationService, private route: ActivatedRoute, private participantService: ParticipantService, private certificatService: CertificatService, private fb: FormBuilder) { }


  ngOnInit() {
    this.formationId = +this.route.snapshot.paramMap.get('id')!
    this.loadFormation()
    this.loadParticipants()
    this.loadCertificat()
    this.createParticipantForm = this.fb.group({
      first_name: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      formation_id: [this.formationId]
    })
  }

  //ouvrir modal d'ajout de participant
  openParticipantModal() {
    this.addParticipantModalOpen = true
  }

  //fermer le modal d'ajout de participant
  closeParticipantModal() {
    this.addParticipantModalOpen = false
  }


  onSubmit() {
    if (this.createParticipantForm.invalid) {
      console.log("formulaire invalide")
      this.toastType = 'error'
      this.toastMessage = "Echec d'ajout du participant ❌ "
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 2000)
    }

    const formValuer = this.createParticipantForm.value
    const formData = new FormData

    formData.append('name', formValuer.name)
    formData.append('first_name', formValuer.first_name)
    formData.append('phone', formValuer.phone)
    formData.append('email', formValuer.email)
    formData.append('formation_id', formValuer.formation_id)

    this.participantService.createParticipant(formData).subscribe({
      next: (response) => {
        console.log(response)
        this.toastType = 'success'
        this.toastMessage = "Participant ajouté ✅ "
        this.showToast = true
        this.closeParticipantModal()

        setTimeout(() => {
          this.showToast = false
          this.loadParticipants()
        }, 2000)
      },
      error: (error) => {
        console.log(error)
        this.toastType = 'error'
        this.toastMessage = "Echec d'ajout du participant ❌ "
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 2000)
      }
    })

  }

  //charger la formation
  loadFormation(): void {
    this.isLoadingFormation = true
    this.formationService.getFormation(this.formationId).subscribe({
      next: (response) => {
        this.formation = response.Formation
        console.log(this.formation)
        console.log(this.formationId)
        this.isLoadingFormation = false

      },
      error: (error) => {
        console.log(error)

      }
    })
  }

  //charger les participants
  loadParticipants() {
    this.isLoadingParticipants = true
    this.participantService.getParticipantsByFormation(this.formationId).subscribe({
      next: (response) => {
        this.isLoadingParticipants = false
        this.participants = response.Participants
        console.log(response.Participants)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //generer les certificats
  genererCertificats() {
    this.isGenerating = true
    this.certificatService.genererCertificat(this.formationId, this.data).subscribe({
      next: (response) => {
        this.isGenerating = false
        console.log(response)
        this.toastType = 'success'
        this.toastMessage = "Certifcat genénerer ✅ "
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
          this.loadCertificat()
        }, 2000)

      },
      error: (error) => {
        this.isGenerating = false
        console.log(error)
        this.toastType = 'error'
        this.toastMessage = "Echec ❌ "
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 2000)

      }
    })
  }

  //charger les certificats
  loadCertificat() {
    this.isLoadingCertificats = true
    this.certificatService.getCertificatbyFormation(this.formationId).subscribe({
      next: (response) => {
        this.certificats = response
        console.log(this.certificats)
        this.isLoadingCertificats = false
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
