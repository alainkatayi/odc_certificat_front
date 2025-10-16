import { ParticipantService } from './../../../core/services/participant/participant.service';
import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { Participant } from '../../../core/models/participant';
import { CommonModule } from '@angular/common';
import { PaginationLink, PaginationMeta, PaginationUrls } from '../../../core/models/pagination';

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
  paginationMeta:PaginationMeta | null = null
  currentPage:number = 1
  links!: PaginationUrls

  ngOnInit() {
    this.loadParticipants(this.currentPage)
  }

  loadParticipants(page:number) {
    this.isLoading = true
    this.participantService.getParticipants(page).subscribe({
      next: (response) => {
        console.log(response)
        this.isLoading = false
        this.participants = response.data
        this.paginationMeta = response.meta
        this.links = response.links
        console.log("links",this.links)
        console.log("response meat",response.meta)
        console.log("response sans meta",response)
        console.log("pagination meat",this.paginationMeta)
        this.currentPage = response.meta.current_page
        console.log("current page",this.currentPage)
        console.log(this.participants)
   
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onPageClick(link: PaginationLink) {
    if (!link.url) return;

    const url = new URL(link.url);
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    this.loadParticipants(page);
}
}
