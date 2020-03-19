import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from '../dialog/createEvent/createEvent.component'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openCreateEventModal() {
    console.log('calling modal')
    const modalRef = this.modalService.open(CreateEventComponent);
  }
}
