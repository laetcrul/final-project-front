import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../services/event.service";
import {TopicService} from "../../../../services/topic.service";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {RoleModel} from "../../../../models/role.model";
import {RoleService} from "../../../../services/role.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  element: number | undefined;
  topicId: number | undefined;
  eventId: number | undefined;
  searchText = "";
  allRoles : RoleModel[] = [];

  userList : User[] = [];

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private topicService: TopicService,
              private userService: UserService,
              private roleService: RoleService,
              ) {

    this.route.data.subscribe((element) => {
      this.element= element.element;
    });
    if(this.element == 0){
      const topicId = parseInt(this.route.snapshot.paramMap.get("id") || "");
      if(!isNaN(topicId)){
        this.topicId = topicId;
      }
    }

    if(this.element == 1){
      const eventId = parseInt(this.route.snapshot.paramMap.get("id") || "");
      if(!isNaN(eventId)){
        this.eventId = eventId;
      }
    }

    this.roleService.getAll().subscribe(list => {
      this.allRoles = list;
      console.log(this.allRoles);
    });
    this.refresh();
  }

  ngOnInit(): void {
  }

  public refresh(){
    if(this.topicId) {
      this.topicService.getOneById(this.topicId).subscribe(topic => {
        this.userList = topic.subscribedUsers;
      });
    }

    if(this.eventId){
      this.eventService.getOneById(this.eventId).subscribe(event => {
        this.userList = event.participants;
      })
    }

    if(!this.eventId && !this.topicId){
      this.userService.getAll().subscribe(list => {
        this.userList = list;
      });
    }
  }

  public removeRole(roleId: number, userId: number){

  }

  public addRole(roleId: number, userId: number){
    this.userService.addRole(roleId, userId).subscribe(x => console.log("role ", roleId, " added to user ", userId));
  }

  public hasRole(user: User, role: RoleModel){
    return user.roles.find(res => res.label == role.label) != undefined;
  }
}
