import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerLicense } from '@syncfusion/ej2-base';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  try {
    enableProdMode();
  } catch (exception) {
    console.error(exception);
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

//New Key
registerLicense(
  'ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhWH5ccnFVR2NcUEY='
);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
