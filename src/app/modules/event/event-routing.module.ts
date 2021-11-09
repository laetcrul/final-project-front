import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventListComponent } from './components/event-list/event-list.component';

const routes: Routes = [
    {path: 'list', component: EventListComponent}
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventRoutingModule { }