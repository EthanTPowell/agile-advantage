import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
// Environment
import { environment } from "src/environments/environment";

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { AngularFireFunctionsModule } from "@angular/fire/compat/functions";
import { FirestoreService } from "src/app/core/services/firestore/firestore.service";
import { StorageService } from "src/app/core/services/firestore/filestorage.service";
import { AuthenticationService } from "./core/services/firestore/firebase-authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { Events } from "src/app/core/services/events.service";
import { LoadingService } from "src/app/core/services/loading.service";
import { UtilService } from "src/app/core/services/util.service";
import { FsImageService } from "./core/services/fs-image.service";
import { UserDataService } from "./core/services/data-services/user-data.service";
import { AppDataService } from "./core/services/app-data.service";
import { RichTextEditorModule } from "@syncfusion/ej2-angular-richtexteditor";
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ProjectDataService } from "./core/services/data-services/project-data.service";


@NgModule({
  declarations: [AppComponent],
  exports: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    HttpClientModule,
    RichTextEditorModule,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3ffa2de20ba47d00065786e40723fecfca56ef61
    GridModule
    // ServiceWorkerModule.register('combined-sw.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
=======
    GridModule,
    ServiceWorkerModule.register('combined-sw.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
>>>>>>> b48b575df439eb733ffd46c76445b50165a42b6d
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    AuthenticationService,
    FirestoreService,
    StorageService,
    AlertService,
    Events,
    LoadingService,
    UtilService,
    UserDataService,
    FsImageService,
    AppDataService,
    ProjectDataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
