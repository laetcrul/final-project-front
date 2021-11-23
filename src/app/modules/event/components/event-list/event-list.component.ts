import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from 'src/app/models/event.model';
import {User} from 'src/app/models/user.model';
import {EventService} from 'src/app/services/event.service';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList: EventModel[] = [];
  pathFilter: number | undefined;
  inputFilter: number = -1;
  topicPresent: boolean = false;
  searchText = "";

  constructor(private eventService: EventService,
              private authService: AuthService,
              private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe((filter) => {
      this.pathFilter = filter.filter;
    });
    this.refresh();
  }

  ngOnInit(): void {
  }

  public refresh() {

    const topicId = parseInt(this.route.snapshot.paramMap.get('id') || "");

    if (this.pathFilter == undefined && !topicId) {
      this.getAll();
    }

    if (this.pathFilter == 0) {
      this.getAllSubscribed();
    }

    if (this.pathFilter == 1) {
      this.getAllCreated();
    }

    if(this.pathFilter == 2){
      this.getAllAdmin();
    }

    if (topicId) {
      this.getAllByTopic(topicId);
    }
  }

  public getAllCreated() {
    if (this.inputFilter == 1) {
      this.eventService.getAllCreated().subscribe((events) => {
        this.eventList = this.filterByTeam(events).sort((a,b) => this.sort(a,b));
      })
    } else if (this.inputFilter == 2) {
      this.eventService.getAllCreated().subscribe((events) => {
        this.eventList = this.filterByDepartment(events).sort((a,b) => this.sort(a,b));
      })
    } else this.eventService.getAllCreated().subscribe(events => {
      this.eventList = events.sort((a,b) => this.sort(a,b));
    });
  }

  public getAllSubscribed() {
    if (this.inputFilter == 1) {
      this.eventService.getAllRegistered().subscribe((events) => {
        this.eventList = this.filterByTeam(events).sort((a,b) => this.sort(a,b));
      })
    } else if (this.inputFilter == 2) {
      this.eventService.getAllRegistered().subscribe((events) => {
        this.eventList = this.filterByDepartment(events).sort((a,b) => this.sort(a,b));
      })
    } else this.eventService.getAllRegistered().subscribe(events => this.eventList = events.sort((a,b) => this.sort(a,b)));
  }

  public getAll() {
    if (this.inputFilter == 1) {
      this.eventService.getAll().subscribe((events) => {
        this.eventList = this.filterByTeam(events).sort((a,b) => this.sort(a,b));
      })
    } else if (this.inputFilter == 2) {
      this.eventService.getAll().subscribe((events) => {
        this.eventList = this.filterByDepartment(events).sort((a,b) => this.sort(a,b));
      })
    } else this.eventService.getAll().subscribe(events => this.eventList = events.sort((a,b) => this.sort(a,b)));
  }

  public getAllAdmin(){
    this.eventService.getAllAdmin().subscribe((events) =>
      {
        this.eventList = events.sort((a,b) => this.sort(a,b));
      }
    )
  }

  public getAllByTopic(topicId: number) {
    if (this.inputFilter == 1) {
      this.eventService.getAllByTopic(topicId).subscribe((events) => {
        this.eventList = this.filterByTeam(events).sort((a,b) => this.sort(a,b));
      })
    } else if (this.inputFilter == 2) {
      this.eventService.getAllByTopic(topicId).subscribe((events) => {
        this.eventList = this.filterByDepartment(events).sort((a,b) => this.sort(a,b));
      })
    } else this.eventService.getAllByTopic(topicId).subscribe(events => this.eventList = events.sort((a,b) => this.sort(a,b)));
  }

  public filterByTeam(list: EventModel[]) {
    return list.filter(event => event.limitedToTeam).sort((a,b) => this.sort(a,b));
  }

  public filterByDepartment(list: EventModel[]) {
    return list.filter(event => event.limitedToDepartment).sort((a,b) => this.sort(a,b));
  }

  public isRegistered(event: EventModel): boolean {
    const user: User = this.authService.getCurrentUser();

    return event.participants.find((found) => found.id === user.id) != undefined;
  }

  public register(event: EventModel) {
    this.eventService.register(event).subscribe(() => {
      this.refresh();
    });
  }

  public unregister(event: EventModel) {
    this.eventService.unregister(event).subscribe(() => {
      this.refresh();
    });
  }

  public isOwner(model: EventModel) {
    const user: User = this.authService.getCurrentUser();
    if (user) {
      return user.id == model.creator.id;
    } else return false;
  }

  public seeDetails(event: EventModel) {
    this.router.navigate(["/event/detail/" + event.id]);
  }

  public onChange(filter: HTMLSelectElement) {
    this.inputFilter = parseInt(filter.value);
    this.refresh();
  }

  public sort(a: EventModel, b: EventModel) {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  }

  public isSoon(event: EventModel){
    let eventDate = new Date(event.date);
    let threeDays = 259_200_000;
    let timeRemaining = eventDate.valueOf() - Date.now().valueOf();
    if(timeRemaining < threeDays && timeRemaining > 0){
      return true;
    }
    return false;
  }

  public getDateFilter(){
    if(this.inputFilter == 3){
      return 1;
    } else return 2;
  }

  public pastList(){
    return this.inputFilter == 3;
  }

  public adminView(){
    return this.pathFilter == 2;
  }
}
