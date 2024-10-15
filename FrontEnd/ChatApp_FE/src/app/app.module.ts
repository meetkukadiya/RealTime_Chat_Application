// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app.routes'; // Import your routing module
// import { AppComponent } from './app.component';
// import { RouterModule } from '@angular/router'; // Import RouterModule

// @NgModule({
//   declarations: [
//     AppComponent,
//     // other components
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot([]), // Ensure RouterModule is included here
//     AppRoutingModule, // Import your routing module if you have one
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes'; // Import your routing module
import { RegisterComponent } from './components/Register/register.component';
import { LoginComponent } from './components/Login/login.component';
// import { ChatApplicationComponent } from './components/UserChat/chat-application/chat-application.component';
// import { ChatComponent } from './components/UserChat/Chat/chat.component';
import { SidebarComponent } from './components/UserChat/Sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // ChatApplicationComponent,
    // ChatComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient()],
})
export class AppModule {}
