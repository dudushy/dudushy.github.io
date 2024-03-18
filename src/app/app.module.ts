import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { MeComponent } from './windows/me/me.component';
import { LanguageComponent } from './windows/language/language.component';
import { ThemeComponent } from './windows/theme/theme.component';

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
    ProjectsComponent,
    MeComponent,
    LanguageComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
