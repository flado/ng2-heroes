import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }, //Once you've finished setting up, the router will match that URL to path: 'heroes' and display the HeroesComponent.
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent } //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
];

@NgModule({
  //You first must initialize the router and start it listening for browser location changes.
  //The method is called forRoot() because you configure the router at the application's root level.
  imports: [ RouterModule.forRoot(routes) ],
  //Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
