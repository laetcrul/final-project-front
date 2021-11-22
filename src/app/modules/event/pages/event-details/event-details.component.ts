import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import {User} from "../../../../models/user.model";
import {AuthService} from "../../../../services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserListComponent} from "../../../user/components/user-list/user-list.component";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event! : EventModel;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '', undefined);
      eventService.getOneById(id).subscribe((event: EventModel) => this.event = event);
   }

  ngOnInit(): void {}

  public isRegistered(event: EventModel) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return event.participants.find((found) => found.id === user.id) != undefined;
  }
  public register(event: EventModel){
    this.eventService.register(event).subscribe(() => {window.location.reload();});
  }

  public unregister(event: EventModel){
    this.eventService.unregister(event).subscribe(() => {window.location.reload();});
  }

  public isOwner(event: EventModel){
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");
    return user.id == event.creator.id;
  }

  public edit(event: EventModel){
    if(!this.isOwner(event) && this.isAdmin()){
      if(confirm("Are you sure you want to edit " + event.creator.username + "'s topic?")){
        this.router.navigate(["event/edit/" + event.id]);
      } return;
    }
    this.router.navigate(["event/edit/" + event.id]);
  }

  public delete(event: EventModel){
    if(!this.isOwner(event) && this.isAdmin()){
      if(confirm("Are you sure you want to delete " + event.creator.username + "'s topic?")){
        this.eventService.delete(event.id).subscribe(() => this.router.navigate(["event/all"]));
      } return;
    }
    if(confirm("Delete this topic?")){
      this.eventService.delete(event.id).subscribe(() => this.router.navigate(["event/created"]));
    }
  }

  public isAdmin(){
    return this.authService.isAdmin();
  }

  public isAllowedToRegister(event: EventModel){
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    if(event.limitedToTeam){
      return event.creator.team.id == user.team.id;
    }
    if(event.limitedToDepartment){
      return event.creator.team.department.id == user.team.department.id;
    }
    return true;
  }
}
