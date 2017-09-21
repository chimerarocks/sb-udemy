import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
/*+++*/ import { ServersComponent } from './servers/servers.component'; // <<<--- novo componente importado

/**
 * Decorator que define uma classe como um módulo para o angular
 */
@NgModule({
  /** declarations: define quais componentes serão necessários para a aplicação */
  declarations: [
    AppComponent,
    ServerComponent,
    /*+++*/    ServersComponent // <<<--- Novo componente criado
  ],
  /** imports: importa modulos externos */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  /** bootstrap: define qual componente será a raiz do projeto */
  bootstrap: [AppComponent]
})
export class AppModule { }

