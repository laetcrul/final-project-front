import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventListComponent } from './components/event-list/event-list.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';

const routes: Routes = [
    {path: 'list', component: EventListComponent},
    {path: 'create', component: CreateEventComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventRoutingModule { }
