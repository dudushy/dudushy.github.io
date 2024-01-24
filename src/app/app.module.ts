import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TestComponent } from './pages/test/test.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SvgRendererComponent } from './components/svg-renderer/svg-renderer.component';

import { FormationComponent } from './windows/formation/formation.component';
import { ExperienceComponent } from './windows/experience/experience.component';
import { MoreInformationComponent } from './windows/more-information/more-information.component';
import { ProjectsComponent } from './windows/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    NotFoundComponent,
    SvgRendererComponent,

    FormationComponent,
    ExperienceComponent,
    MoreInformationComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
