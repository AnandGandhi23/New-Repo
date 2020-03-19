import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EventsComponent } from './events/events.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/service/auth.guard';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
        {
          path: "",
          redirectTo: "/Auth",
          pathMatch: 'full'
        },
        {
          path: "Home",
          component: HomeComponent,
          canActivate: [AuthGuard]

        },
        {
          path: "Auth",
          component: AuthComponent
        },
        {
          path: "Events",
          component: EventsComponent,
          canActivate: [AuthGuard]
        },
        {
          path: "Bookings",
          component: BookingsComponent,
          canActivate: [AuthGuard]
        },
        {
          path: "Signup",
          component: SignupComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
