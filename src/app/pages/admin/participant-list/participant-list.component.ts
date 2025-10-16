import { ParticipantService } from './../../../core/services/participant/participant.service';
import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { Participant } from '../../../core/models/participant';
import { CommonModule } from '@angular/common';
import { PaginationMeta } from '../../../core/models/pagination';

@Component({
  selector: 'app-participant-list',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.css'
})
export class ParticipantListComponent {
  constructor(private participantService: ParticipantService) { }
  participants!: Participant[]
  isLoading: boolean = false

  ngOnInit() {
    this.loadParticipants()
  }

  loadParticipants() {
    this.isLoading = true
    this.participantService.getParticipants().subscribe({
      next: (response) => {
        console.log(response)
        this.isLoading = false
        this.participants = response.data
        console.log(this.participants)
   
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
