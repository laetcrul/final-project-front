import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';
import {Topic} from "../../../../models/topic.model";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList: EventModel[] = [];
  pathFilter : number | undefined;
  inputFilter : number = -1;

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe((filter) => {
      this.pathFilter = filter.filter;
    });
    this.refresh();
  }

  ngOnInit(): void {
  }

  public refresh(){

    const topicId = parseInt(this.route.snapshot.paramMap.get('id') || "");

    if(this.pathFilter == undefined){
      this.getAll();
    }

    if(this.pathFilter == 0){
      this.getAllSubscribed();
    }

    if(this.pathFilter ==1){
      this.getAllCreated();
    }

    if (topicId){
      this.eventService.getAllByTopic(topicId).subscribe(events => this.eventList = events);
    }
  }

  public getAllCreated(){
    if(this.inputFilter == 1) {
      this.eventService.getAllCreated().subscribe((events) => {
        this.eventList = this.filterByTeam(events);
      })
    }
    else if(this.inputFilter == 2){
      this.eventService.getAllCreated().subscribe((events) => {
        this.eventList= this.filterByDepartment(events);
      })
    }
    else this.eventService.getAllCreated().subscribe(events => this.eventList = events);
  }

  public getAllSubscribed(){
    if(this.inputFilter == 1) {
      this.eventService.getAllRegistered().subscribe((events) => {
        this.eventList = this.filterByTeam(events);
      })
    }
    else if(this.inputFilter == 2){
      this.eventService.getAllRegistered().subscribe((events) => {
        this.eventList= this.filterByDepartment(events);
      })
    }
    else this.eventService.getAllRegistered().subscribe(events => this.eventList = events);
  }

  public getAll(){
    if(this.inputFilter == 1) {
      this.eventService.getAll().subscribe((events) => {
        this.eventList = this.filterByTeam(events);
      })
    }
    else if(this.inputFilter == 2){
      this.eventService.getAll().subscribe((events) => {
        this.eventList= this.filterByDepartment(events);
      })
    }
    else this.eventService.getAll().subscribe(events => this.eventList = events);
  }

  public filterByTeam(list: EventModel[]){
    return list.filter(event => event.limitedToTeam);
  }

  public filterByDepartment(list: EventModel[]){
    return list.filter(event => event.limitedToDepartment);
  }

  public isRegistered(event: EventModel) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return event.participants.find((found) => found.id === user.id) != undefined;
  }

  public register(event: EventModel){
    this.eventService.register(event).subscribe(() => {this.refresh();});
  }

  public unregister(event: EventModel){
    this.eventService.unregister(event).subscribe(() => {this.refresh();});
  }

  public isOwner(model: EventModel){
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");
    if(user){
      return user.id == model.creator.id;
    } else return false;
  }

  public seeDetails(event: EventModel){
    this.router.navigate(["/event/detail/" + event.id]);
  }

  public onChange(filter : HTMLSelectElement){
    console.log("onchange");
    this.inputFilter = parseInt(filter.value);
    this.refresh();
  }
}
