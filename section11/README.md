# Angular4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Indice

* [Section 2](#section-2)
    * [How an Angular App gets loaded and started](#how-an-agular-app-gets-loaded-and-started)
    * [Components are important](#components-are-important)
    * [Creating a new component](#creating-a-new-component)
    * [Understanding the role of AppModule and Component Declaration](#understanding-the-role-of-appmodule-and-component-declaration)
    * [Using Custom components](#using-custom-components)
    * [Creating Components with the CLI and Nesting Components](#creating-components-with-the-cli-and-nesting-components)
# Course

## Section2

### How an Angular App gets loaded and started

1. Inicialmente o servidor fornece somente o arquivo 'src/index.html';

2. Nesse arquivo se encontra o elemento: <app-root></app-root>

3. O servidor percebe que precisa carregar o compoenente para esse elemento por isso é criado toda uma estrutura anterior

4. Para ativar a interação do angular, o cli do angular irá inserir automaticamente alguns scripts no final
do html. Por isso não é possível ver no código html. Mas consegue-se ver indo no inspector do browser.

5. O primeiro script a ser executado portanto será o 'src/main.ts' que irá criar a aplicação passando um módulo:
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule); // <<<--- Aqui é onde a aplicação é carregada
```
O módulo chamado inicialmente se refere ao arquivo 'src/app/app.module.ts'

6. O módulo raiz irá fazer toda a configuração da aplicação, incluindo carregar seus components:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent] <<<--- Aqui está sendo carregado o componente
})
export class AppModule { }
```

7. O servidor então procurará por um componente para esse elemento e chegará no app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // <<<--- Aqui está o nome do componente que será renderizado no html 
  templateUrl: './app.component.html', // <<<--- Esse é o html que será renderizado dentro do elemento
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

### Components are important
Componentes são estruturas de código flexíveis e independentes que encapsulam dados, comportamento, estilo e marcação em um único local


### Creating a new component
**Background** 

Componentes são marcados dentro do html root da aplicação e não diretamente no index.html

No caso em src/app/app.component.html


**Passos para criar um componente**
1. crie um diretório com o nome do novo componente:
src/app/server

2. crie o componente no padrão:
src/app/server/[componentname].component.ts -> src/app/server/server.component.ts

3. o componente será uma classe que deve ser exportada
```typescript
import { Component } from '@angular/core';

/**
 * Decorator que será analisado pelo na angular, para ele poder
 * saber o que fará com essa classe
 */
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html' // <<<--- nesse caso, já foi criado o html para o component
})
export class ServerComponent {

}
```

### Understanding the role of AppModule and Component Declaration
Angular separa a aplicação por módulos, neste caso está sendo utilizado somente um, o AppModule:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
/*+++*/import { ServerComponent } from './server/server.component'; // <<<--- novo componente importado

/**
* Decorator que define uma classe como um módulo para o angular
*/
@NgModule({
  /** declarations: define quais componentes serão necessários para a aplicação */
  declarations: [
    AppComponent,
/*+++*/    ServerComponent // <<<--- Novo componente criado
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

```

### Using Custom components
Para poder usar o componente criado, ele agora pode ser chamado no html do componente, no caso o app.component.html:
```html
<h1>
  {{title}}
</h1>
<hr>
<app-server></app-server>
```

### Creating Components with the CLI and Nesting Components
Pode-se criar componentes com o CLI do Angular, então se quisermos criar um componente novo
para o agrupamento de 'servers' poderíamos executar o comando:
```sh
$ ng generate component servers
```
Ou de forma curta:
```sh
$ ng g c servers
```
Isso gerará os seguintes arquivos:
.
 * [src](src)
   * [app](src/app)
     * [servers](src/app/servers) <-- diretório do novo componente
       * [servers.component.css](src/app/servers/servers.component.css)
       * [servers.component.html](src/app/servers/servers.component.html)
       * [servers.component.spec.ts](src/app/servers/servers.component.spec.ts)
       * [servers.component.ts](src/app/servers/servers.component.ts)
       
E também adicionará o componente automaticamente no módulo:
```typescript
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

```

Agora podemos utilizar vários 'server' dentro do servers.component.html:
```html
<!-- removido
<p>
  servers works!
</p>
-->
<app-server></app-server>
<app-server></app-server>
```

Lembrando de adicioná-lo no app.component.html:
```html
<!-- removido
<h1>
  {{title}}
</h1>
<hr>
<app-server></app-server>
-->
<app-servers></app-servers>
```

### Working with Component Templates
Se você tiver que usar um template html com menos de quatro linhas você poderia
usar um templante in line, no caso faremos isso no servers.component.ts
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  /* --- templateUrl: './servers.component.html', */
  /* +++ novo atributo template define um template inline */
  template: `
    <app-server></app-server>
    <app-server></app-server>
  `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

### Working with Component Styles
Estilos podem ser escritos em arquivos css normalmente criados juntos com o componente
e importados no component

app.component.css
```css
h3 {
    color: darkblue;
}
```

app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <<<--- stilos importados, podem ser mais de um.
})
export class AppComponent {
  title = 'app works!';
}

```

Estilos podem ser escritos no próprio componente

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*--- styleUrls: ['./app.component.css']*/
  /*+++ estilos inline, podem ser vários*/
  styles: [`
    h3 {
        color: dodgerblue;
    }
  `]
})
export class AppComponent {
  title = 'app works!';
}

```

### Fully Understanding the Component Selector
Você pode usar diferentes tipos de seletores para os components

**1 - Element selector**
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // <<<--- selecionando por elemento
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
```html
<app-server>
    <!-- chamando componente como elemento -->
</app-server>  
```

**2 - Class selector**
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-servers', // <<<--- selecionando por classe
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
```html
<div class="app-server">
    <!-- chamando componente como classe -->
</div>  
```

**3 - Attribute selector**
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-servers]', // <<<--- selecionando como atributo
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
```html
<div app-server>
    <!-- chamando componente como atributo -->
</div>  
```

### What is Databinding?
Databinding = communication 

                 typescript => html
    String Interpolation    {{ data }}
    Property Binding        < [property]="data" >
                 typescript <= html
    Event Binding           < (event)="expression" >
                 typescript <=> html
    Two-Way-Binding         < [(ngModel)]="data" >
    
### String Interpolation
A interpolação de texto é quando um dado do componente é passado para o template.

A interpolação resolve uma expressão que deve retornar uma string, ou seja, você pode executar um 'for'
um 'if' dentra da interpolação desde que no final o resultado seja uma string

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverId: 10;
  serverStatus: 'offline';
  getServerStatus() {
    return this.serverStatus;
  }
}
```
```html
<p>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }} </p>
```

### Property Binding
É quando você quer definir uma propriedade para um elemento caso uma expressão seja verdadeira,
porém não única vez, você quer que ela atualize conforme a expressão atualize também.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false; // <<<--- Aqui está a propriedade que será requisitada no template
  constructor() {
    setTimeout(() => this.allowNewServer = true , 2000); // <<<--- ela irá mudar dentro de 2 segundos e o valor da váriavel no template também deve ser atualizado
  }

  ngOnInit() {
  }

}
```
```html
<!--a propriedade 'disabled' está amarrada (binding) com o resultado da expressão '!allowNewServer'-->
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer" 
>
    Add Server
</button>
<app-server></app-server>
<app-server></app-server>
```

### Property Binding vs String Interpolation
Property binding será utilizado quando você quer que uma propriedade seja ativa em um determinado estado

String interpolation é pra quando você quer apenas exibir um dado no template sem binding

```html
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
>
    Add Server
</button>
<p [innerText]="allowNewServer"></p> <!-- O mesmo caso que interpolação porém com binding -->
<p>{{ allowNewServer }} </p> <!-- interpolação -->
<!--Isto está errado <p [innerText]="{{allowNewServer}}"></p>-->
<app-server></app-server>
<app-server></app-server>
```

### Event Binding
É usado quando você quiser adicionar reatividade a um evento

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created.'; // <<<--- A propriedade que será chamada no template
  constructor() {
    setTimeout(() => this.allowNewServer = true , 2000);
  }

  ngOnInit() {
  }
  onCreateServer() { // <<<--- nome do método que será executado quando o evento que o chama disparar
    this.serverCreationStatus = 'Server was created!';
  }

}

```
```html
<!-- quando evento click for disparado ele chamará o método onCreateServer -->
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
    (click)="onCreateServer()"
>
    Add Server
</button>
<!-- essa interpolação será atuliazada quando o evento click tiver disparado e chamado o método onCreateServer -->
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### Passing and Using Data with Event Binding

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created.';
  serverName = '';

  constructor() {
    setTimeout(() => this.allowNewServer = true , 2000);
  }

  ngOnInit() {
  }
  onCreateServer() {
    this.serverCreationStatus = 'Server was created!';
  }
  onUpdateServerName(event: Event) { // <<<--- evento disparado como argumento
    this.serverName = (<HTMLInputElement> event.target).value; // <<<--- definição de tipo do typescript
  }
}
```
```html
<label>Server Name</label>
<!-- quando o evento input disparar será chamado o méotdo onUpdateServerName do componente, passando os dados do evento -->
<input
        type="text"
        class="form-control"
        (input)="onUpdateServerName($event)">
<p>{{serverName}}</p>
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
    (click)="onCreateServer()"
>
    Add Server
</button>
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### Two-Way-Databinding
Quando você quer que mudanças no template alterem o valor da propriedade e mudanças na propriedade
alterem o valor no template

```html
<label>Server Name</label>
<!-- [(ngModel)] está fazendo o two-way-databinding -->
<input
        type="text"
        class="form-control"
        [(ngModel)]="serverName">
<p>{{serverName}}</p>
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
    (click)="onCreateServer()"
>
    Add Server
</button>
<!--<p [innerText]="allowNewServer"></p>-->
<!--<p>{{ allowNewServer }} </p>-->
<!--Isto está errado <p [innerText]="{{allowNewServer}}"></p>-->
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

**For Two-Way-Binding to work, you need to enable the ngModel  directive.** 

This is done by adding the FormsModule to the imports[]  array in the AppModule.
  
**You then also need to add the import from @angular/forms in the app.module.ts file:**

import { FormsModule } from '@angular/forms';

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <<<--- importando
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <<<--- importando para o módulo
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Combining all Forms of Databinding

Aqui há um exemplo combinando todos os binds

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created.';
  serverName = '';

  constructor() {
    setTimeout(() => this.allowNewServer = true , 2000);
  }

  ngOnInit() {
  }
  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName; // <<<--- binding serverName
  }
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement> event.target).value;
  }
}
```

### Understing Directives
Diretivas são instruções lógicas para o elemento selecionado

### Using ngIf to Output Data Conditionally
A diretiva ngIf resolve uma expressão booleana para decidir se o elemento EXISTIRÁ ou não no DOM

```html
<label>Server Name</label>
<input
        type="text"
        class="form-control"
        [(ngModel)]="serverName">
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
    (click)="onCreateServer()"
>
    Add Server
</button>
<!-- O asterisco indica que a diretiva realizará uma mudança estrutural no elemento -->
<p *ngIf="serverCreated">Server was created, server name is {{ serverName }} </p>
<app-server></app-server>
```

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  ...
})
export class ServersComponent implements OnInit {
  //...
  serverCreated = false;

  //...
  onCreateServer() {
    this.serverCreated = true;
    //...
  }
  //...
}

```

### Enhancing ngIf with an Else Condition
Uma forma de utilizar else con ngIf e utilizando marcadores no dom, com ng-template


```html
<label>Server Name</label>
<input
        type="text"
        class="form-control"
        [(ngModel)]="serverName">
<button
    class="btn btn-primary"
    [disabled]="!allowNewServer"
    (click)="onCreateServer()"
>
    Add Server
</button>
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{ serverName }} </p>
<ng-template #noServer>
    <p>No server was created!</p>
</ng-template>
<app-server></app-server>
```

### Styling Elements Dynamically with ngStyle
Diferente de diretivas estruturais (*), diretivas atributos não adicionam ou removem elementos, apenas mudam
o elemento onde estão inseridas

ngStyle é uma diretiva que altera o estilo de um elemento.

Nesse caso a alteração está sendo feita dinamicamente com property binding.
```html
<p [ngStyle]="{backgroundColor: getColor()}">
    {{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}
</p>
```
```typescript
import { Component } from '@angular/core';

/**
 * Decorator que será analisado pelo na angular, para ele poder
 * saber o que fará com essa classe
 */
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  getServerStatus() {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```

### Applying CSS Classes Dynamically with ngClass
ngClass é uma diretiva que altera as classes de um elemento

```html
<p
    [ngStyle]="{backgroundColor: getColor()}"
    [ngClass]="{online: serverStatus === 'online'}"
    >
    {{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}
</p>
```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  /**
  * Classe que será adicionada ao elemento caso o status seja online. 
  */
  styles: [`
    .online {
        color: white;
    }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  getServerStatus() {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```
### Outputting Lists with ngFor
ngFor é uma diretiva estrutural que repete o elemento para cada laço executado

```html
<!--...-->
<!-- Neste caso será gerado um server para cada indice no array 'servers' do componente-->
<app-server *ngFor="let server of servers"></app-server>
```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  //...
  servers = ['Testserver', 'Testserver 2'];

  //...

  ngOnInit() {
  }
  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }
  //...
}
```

### Getting the Index when using ngFor

Como obter o índice do loop corrente em ngFor
```html
<!--...-->
<app-server *ngFor="let server of servers; let i = index"></app-server>
```

## Section 4 - Debugging

### Understanding Angular Error Messages

Estrutura da mensagem de erro no console:

    Exception: 
        Error in {Nome da classe que deu erro}
        {Nome da classe} - inline template:{linha}:{coluna} -- a linha e a coluna são relativas ao html, por isso podem não ser precisas
        caused by: {Mensagem de erro}
        
### Debugging Code in the Browser Using Sourcemaps

As vezes a mensagem de erro não é suficiente, pois o código está se comportando de forma
estranha sem emitir uma excessão, nesse caso você pode debugar, em tempo de execução, o sourcemap do código.

Você pode ver o sourcemap indo na guia Sources do inspector e visualizando o arquivo main.bundle.js
e utilizar a ferramenta de debug normalmente. Também é possível acessar uma estrutura de diretórios semelhante
ao projeto visualizando os arquivos dentro de webpack:// e .

### Using Augury to Dive into Angular Apps

Por último, para debugar e entender sua aplicação em uma visão mais macro 
você pode instalar a extensão do Augury.io para seu browser

## Section 5 - Components & Databinding Deep Dive

### Splitting Apps into Components

Inicialmente percebe-se em app.component.html que existe um acoplamento de funções:
```html
<!--...-->
  <div class="row">
    <div class="col-xs-12">
      <div
        class="panel panel-default"
        *ngFor="let element of serverElements">
        <div class="panel-heading">{{ element.name }}</div>
        <div class="panel-body">
          <p>
            <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
            <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
          </p>
        </div>
      </div>
    </div>
  </div>
<!--...-->
```

Precisa-se criar componentes para mover essa lógica para outro lugar, então criamos o componente 'cockpit'
e 'server-element' com o generator do angular 

Logo ficaremos com os seguintes componentes:

app
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];
}
```
```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements"></app-server-element>
    </div>
  </div>
</div>
```

cockpit
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverElements.push({ // <<<--- elementos inexistentes, por isso haverá um erro aqui
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```
```html
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer()">Add Server</button>
    <button
      class="btn btn-primary"
      (click)="onAddBlueprint()">Add Server Blueprint</button>
  </div>
</div>
```

server-element
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```


Mas esse código não irá funcionar porque precisamos que haja uma integração com os 'server' entre os componentes

### Binding to Custom Properties

Inicialmente queremos que app component possa passar os seus elementos para server-element component

app
```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [element]="serverElement">
      </app-server-element>
    </div>
  </div>
</div>
```

Para isso devemos indicar que a propriedade 'element' de server-element é um input, visto que por padrão
todas as propriedades só são acessiveis pelo componente relativo.

server-element
```typescript
/** Devemos importar o decorator Input */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  /** Aqui definimos a propriedade como pública */
  @Input() element: {name: string, type: string, content: string};

  constructor() { }

  ngOnInit() {
  }

}
```

### Assigning an Alias to Custom Properties

As vezes você precisa definir um alias para a propriedade

```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement">
      </app-server-element>
    </div>
  </div>
</div>
```

Nesse caso você pode fazer-lo assim: 
```typescript
 //...
  @Input('srvElement') element: {name: string, type: string, content: string};
 //...
```

### Binding to Custom Events

Vimos como passar dados de um componente pai para um filho, agora devemos pensar 
no oposto, em como passar um dado de um componente filho para um pai

Então digamos que queiramos passar o novo server criado no cockpit para o app:

app.html
```html
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (blueprintCreated)="onBlueprintAdded($event)">
  </app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [element]="serverElement">
      </app-server-element>
    </div>
  </div>
</div>
```

app.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type: 'server', name: 'Testserver', content: 'Just a test'}];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.blueprintName,
      content: blueprintData.blueprintContent
    });
  }
}
```

Para que esse evento seja criado precisamos apenas informar a propriedade como evento e acessível exteriormente

cockpit
```typescript
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({blueprintName: this.newServerName, blueprintContent: this.newServerContent});
  }
}
```

### Assigning an Alias to Custom Events

Da mesma forma que você pode criar alias para propriedades, também pode criar alias para eventos.

### Understanding View Encapsulation

Cada componente possui seu próprio estilo, ou seja, estilos de app não afetarão componentes filhos.

O angular criará uma classe especifica para o componente, de forma a dar esse comportamento ao css

### More on View Encapsulation

Você pode alterar o comportamento de encapsulamento de estilo através da propriedade 'encapsulation'
do decorator @Component

As opções são: 
    ViewEncapsulation.None:  Componente não utilizará o encapsulamento, estilos serão aplicados globalmente
    ViewEncapsulation.Emulated: É o padrão, emula o shadow DOM para browsers que não suportam.
    ViewEncapsulation.Native: Força o uso do shadow DOM nativo do browser

### Using Local References in Templates

Local References são referências que você pode fazer para um elemento dentro de um template html.

Somente dentro do template html, ele não é referenciável no script.

```html
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input
        type="text"
        class="form-control"
        #serverNameInput> <!-- Aqui foi adicionado uma referência para este elemento -->
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput)">Add Server</button> <!-- Aqui está sendo passado elemento html para o método -->
    <button
      class="btn btn-primary"
      (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint</button> <!-- Aqui está sendo passado elemento html para o método -->
  </div>
</div>
```

```typescript
//...
onAddServer(nameInput: HTMLInputElement) {
  this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
}
//...
onAddBlueprint(nameInput: HTMLInputElement) {
  this.blueprintCreated.emit({blueprintName: nameInput.value, blueprintContent: this.newServerContent});
}
```

### Getting Access to the Template & DOM with @ViewChild

É possível ter acesso as referencias no script através do decorator ViewChild, então se você quiser usar
poderá fazer assim:

```html
<input
    type="text"
    class="form-control"
    #serverContentInput>
```

```typescript
export class CockpitComponent implements OnInit {
  @ViewChild('serverContentInput') serverContentInput: ElementRef;
  
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
```

### Projecting Content into Components with ng-content

Você pode projetar conteúdo dentro do componente filho inserindo dentro das tags do componente
e marcando onde será inserido no componente com a dirente <ng-content></ng-content>

### Understanding the Component Lifecycle

Angular possui alguns hooks que podem ser usados para mudar o comportamento dos componentes para cada fase
de construção do template.

Os hooks são:

    ngOnChanges : Chamado depois uma propriedade de input externa muda, ou seja, o DOM precisa ser alterado
    ngOnInit: Chamado uma única vez quando o componente é inicializado
    ngDoCheck: Chamado cada vez que uma mudança é detectada, mesmo que não altere o template mas haja um evento
    ngAfterContentInit: Chamado quando o conteúdo de uma ng-content é projetado dentro do componente
    ngAfterContentChecked: Chamado toda vez que o conteúdo projetado foi checado
    ngAfterViewInit: Chamado depois que a view do componente e as child views foram inicializadas
    ngAfterViewChecked: Chamado depois que as views forem checkadas
    ngOnDestroy: Chamado uma vez quando o componente é destruído
    
### Seeing Lifecycle Hooks in Action

```typescript
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges { // <<<--- Sempre implemente a interface explicitando quais hooks você está usando
  @Input() element: {name: string, type: string, content: string};

  constructor() { }

  ngOnChanges(changes: SimpleChanges) { // <<<--- SimpleChanges é a interface que determina quais mudanças foram feitas
    console.log(changes);
  }

  ngOnInit() {
  }

}
```

### Lifecycle Hooks and Template Access

As Local References não conseguem ser acessadas antes do ngAfterViewInit ser executado

### Getting Access to ng-content with @ContentChild

Você pode acessar Local References de conteúdos em ng-content com @ContentChild

Esses só podem ser acessados depois do evento ngAfterContentInit for executado

## Section 7 - Directives Deep Dive
 
### Attribute vs Structural

Attribute
    Parecido com um atributo html normal
    Só alteram o elemento em que estão

Structural
    Parecido com um atributo html normal, mas precedido por um '*'
    Afeta toda a àrea do DOM, elementos são adicionados ou removidos

### ngFor and ngIf Recap

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button
        class="btn btn-primary"
        (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ng-template [ngIf]="onlyOdd"> <!-- uma diretiva estrutural -->
        <p>Only odd</p>
      </ng-template>
      <ul class="list-group">
        <div>
          <li
            class="list-group-item"
            *ngFor="let number of oddNumbers"> <!-- uma diretiva estrutural -->
            {{ number }}
          </li>
        </div>
        <div *ngIf="!onlyOdd"> <!-- uma diretiva estrutural -->
          <li
            class="list-group-item"
            *ngFor="let number of evenNumbers">
            {{ number }}
          </li>
        </div>
      </ul>
    </div>
  </div>
</div>
```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
}

```

### ngClass and ngStyle Recap

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button
        class="btn btn-primary"
        (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <ul class="list-group">
        <div>
          <li
            class="list-group-item"
            [ngClass]="{odd: number % 2 !== 0}" 
            [ngStyle]="{backgroundColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let number of oddNumbers"> <!-- diretivas atributo -->
            {{ number }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: number % 2 !== 0}"
            [ngStyle]="{backgrounColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let number of evenNumbers"> <!-- diretivas atributo -->
            {{ number }}
          </li>
        </div>
      </ul>
    </div>
  </div>
</div>
```
```css
.container {
  margin-top: 30px;
}

.odd {
  color: red;
}
```

### Creating a Basic Attribute Directive

Queremos criar uma diretiva de atributo que mude a cor de fundo de um elemento

A utilizaremos da seguinte forma
```html
<p appBasicHighlight>Style me with basic directive!</p>
```

Para isso é necessário criar uma diretiva
```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({  // <<<--- Decorator que define uma diretiva
  selector: '[appBasicHighlight]' // <<<--- seletor como atributo
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {} // <<<--- elemento injetado pelo angular através do decorator Directive

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green'; // <<<--- alterando o elemento que possui a diretiva
  }
}
```

Não esquecendo de fazer a importação no módulo
```typescript
import { BasicHighlightDirective } from './highlight/basic-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Using the Renderer to build a Better Attribute Directive

Renderizar alterações no DOM diretamento pelo ElementRef é um anti-pattern, pois pode
haver algumas incompatibilidades
 
```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({  
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green'; // <<<--- Anti-pattern
  }
}
```

Preferencialmente use Renderer2: https://angular.io/api/core/Renderer2
```typescript
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }
}

```

### Using HostListener to Listen to Host Events

Para escutar eventos em elemento em uma diretiva uso o @HostListener com o evento escolhido

```typescript
import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
}

```

### Using HostBinding to Bind to Host Properties

Para tratar uma propriedade de um elemento da diretiva como um property binding use @HostBinding
```typescript
import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }
}
```

O nome da propriedade para o @HostBinding segue o padrão do nativeElement do angular, exemplo:

elementRef.nativeElement.style.backgroundColor = 'green';

### Binding to Directive Properties

Você pode fazer com que o elemento da diretiva seja alterado conforme os argumentos passados

```typescript
import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}

```

Então pode passar argumentos para a diretiva
```html
<p appBetterHighlight defaultColor="yellow" [highlightColor]="'green'">Style me with better directive!</p>
```

Note que se o argumento for uma string a propriedade não precisa estar entre colchetes

### What Happens behind the Scenes on Structural Directives

Por trás da diretivas estruturais do angular (com *) como essa:
```html
<div *ngIf="!onlyOdd">
  <li
    class="list-group-item"
    [ngClass]="{odd: number % 2 !== 0}"
    [ngStyle]="{backgrounColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
    *ngFor="let number of evenNumbers">
    {{ number }}
  </li>
</div>
```

O que o angular na verdade gera é:
```html
<ng-template [ngIf]="!onlyOdd">
    <div>
      <li
        class="list-group-item"
        [ngClass]="{odd: number % 2 !== 0}"
        [ngStyle]="{backgrounColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
        *ngFor="let number of evenNumbers">
        {{ number }}
      </li>
    </div>
</ng-template>
```

### Building a Structural Directive

Para criar uma diretiva estrutural usa-se uma estrela para não ter que usar o ng-template
```html
<div *appUnless="onlyOdd">
  <li
      class="list-group-item"
      [ngClass]="{odd: number % 2 !== 0}"
      [ngStyle]="{backgrounColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
      *ngFor="let number of evenNumbers">
    {{ number }}
  </li>
</div>
```

Acessa-se o container da diretiva através do ViewContainerRef e então se insere o html como
TemplateRef

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  };

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
```
### Understanding ngSwitch

ngSwitch permite fazer isso:
```html
<div [ngSwitch]="value">
<p *ngSwitchCase="5">Value is 5</p>
<p *ngSwitchCase="10">Value is 10</p>
<p *ngSwitchCase="100">Value is 100</p>
<p *ngSwitchDefault>Value is Default</p>
</div>
```

## Section 9 - Using services & Dependency Injection

### Why you need services?

Serviços são necessários para encapsular lógicas de negócios.

### Creating a Logging Service

Um serviço é apenas uma classe, como a seguinte:
```typescript
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
```

E ser utilizado dessa forma:

```typescript
/**...*/
    const service = new LoggingService();
    service.logStatusChange(accountStatus);
/**...*/
```

Mas essa não é a forma correta de utilizar um serviço com angular, apesar
de funcionar.

### Injecting the Logging Service into Components

A maneira correta de utilizar um serviço é recorrendo ao service provider do angular.
Esses são os pontos a serem observados:
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service'; // <<<--- importação do serviço

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService] // <<<--- definição como a dependência será criada
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService) {} //<<<--- Chamar a dependência no construtor com o tipo do serviço

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    this.loggingService.logStatusChange(status);
  }
}

```

### Understanding the Hierarchical Injector

Existe uma hierarquia de dependências no angular, ou seja, uma instância criada para um componente
será a mesma instância para todos os componentes filhos. Mas será outra instância para outros 
componentes, ou seja, não dividirão os mesmos dados.


### How many Instances of Service Should It Be?

Para utilizar a mesma instância do serviço do componente pai, apenas não o coloca no providers do componente,
somente no construtor.

### Injecting Services into Services

Para que a mesma instância de um serviço esteja disponível para toda a aplicação, deve-se coloca-la
no providers do módulo app e não do componente app.

Para injetar um serviço em outro serviço é necessário a diretiva @Injectable no serviço que
injetará um outro serviço.

```typescript
import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private logginService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
  }

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.logginService.logStatusChange(newStatus);
  }
}

```

### Using Services for Cross-Component Communication

Digamos que você queira que algo que aconteça em new-account seja tratado em account. Normalmente
você usaria o EventEmitter e trataria isso no componente pai dos dois e entao passaria de um para outro.

Mas agora você pode fazer isso através do serviço criado
```typescript
import { LoggingService } from './logging.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private logginService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
  }

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.logginService.logStatusChange(newStatus);
  }
}

```
```typescript
import { Component, Input } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}

```
```typescript
import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
  // providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService,
              private accounteService: AccountService) {
    this.accounteService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accounteService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}

```

## Section 11 - Changing pages with routing

### Setting up and Loading Routes

Para utilizar o roteador padrão do angular é preciso definir
uma constante de rotas e aplicalos ao modulo de rotas do angular.

```typescript
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

E adicionar no template o elemento router-outlet onde as views deverão ser exibidas
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Servers</a></li>
        <li role="presentation"><a href="#">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

### Navigating with Router Links

Inserir links com as rotas da aplicação em uma ancora não está correto,
pois a ancora fará com que a aplicação seja recarregada, o que não deve
ocorrer em uma SPA.

Pra criar liks de navegação você deve usar o atributo routerLink com a rota,
ou um array com todos os segmentos da rota.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

### Understanding Navigation Paths

Pontos importantes sobre links de navegação

    routerLink="users" sem uma barra no inicio irá renderizar o caminho relativo
    routerLink="/users" com uma barra no inicio irá renderizar o caminho absoluto
    routerLink="./users" tem o mesmo efeito de não usar barra
    routerLink="../users" sobe um nível e concatena o caminho
    
### Styling Active Router Links
 
Para aplicar um estilo no link ativo use routerLinkActive com o nome da classe
que será aplicada

```html
<li role="presentation"
    routerLinkActive="active">
  <a routerLink="/">Home</a>
</li>
<li role="presentation"
    routerLinkActive="active">
  <a routerLink="/servers">Servers</a>
</li>
<li role="presentation"
    routerLinkActive="active">
  <a [routerLink]="['/users']">Users</a>
</li>
```

Visto que todas as rotas contém "/" a classe ativa será sempre aplicada ao <li> do link Home,
para evitar isso deve-se adicionar uma opção que indique que este elemento só será marcado
caso a rota seja exatamente igual. Isso é feito com routerLinkOptions.

```html
<li role="presentation"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact:true}">
  <a routerLink="/">Home</a>
</li>
<li role="presentation"
    routerLinkActive="active">
  <a routerLink="/servers">Servers</a>
</li>
<li role="presentation"
    routerLinkActive="active">
  <a [routerLink]="['/users']">Users</a>
</li>
```

### Navigating Programmatically

Para ir para uma rota na programação deve-se usar o Router do angular

```html
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

}

```

### Using Relative Paths in Programmatic Navigation

Caso seja necessário navegar para links relativos a rota ativa, não funcionará como no caso do routerLink, é 
necessário informar que a rota é relativa.
```typescript
import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReloadPage() {
    this.router.navigate(['servers', {relativeTo: this.route}]);
  }

}
```
Neste caso foi utilizado o ActivatedRouter para obter a rota ativa.

### Passing Parameters to Routes

Para definir rotas com parâmetros deve-se defini-los como tal na rota:
```typescript
{path: 'users/:id', component: UserComponent}
```

### Fetching Route Parameters

Para obter os dados da rota deve ser o usado o ActivatedRoute

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
  }

}
```

### Fetching Route Parameters Reactively

No exemplo anterior os dados renderizados como parametros da rota só seram atualizados uma vez.

Para escutar qualquer mudança subscribe com o método params do ActivatedRoute

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

}
```

### An Important Note about Route Observables

É importante notar no exemplo anterior que quando esse componente for excluído,
o observable continuará existindo. Na verdade, não nesse caso, pois o angular
router já fará isso pra você. Mas caso crie um observable próprio é preciso destruir
os observables junto com o component

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
```

### Passing Query Parameters and Fragments

Passando query em um link 
```html
<a
    [routerLink]="['/servers', 5, 'edit']"
    [queryParams]="{allowEdit: '1'}"
    fragment="loading"
    class="list-group-item"
    *ngFor="let server of servers">
    {{ server.name }}
</a>
```

Passando query programaticamente
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

}

```

### Retrieving Query Parameters and Fragments

Para obter os dados passados em uma query use o ActivatedRoute assim como nos parâmetros da rota
```typescript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
```

### Practicing and some Common Gotchas

Colocando em prática:
```typescript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(+id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

}
```

### Setting up Child (Nested) Routes

Para aninhar rotas use a opção children, como segue:
```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]}
];
```

** No entanto, agora as rotas aninhadas não serão exibidas, pois precisão saber onde devem ser renderizadas **

Identifique onde devem ser renderizadas com <router-element>

servers.component.html
```html
<router-outlet></router-outlet>
```

Dessa forma o conteúdo das rotas aninhadas serão acoplados ao componente hospedeiro

### Configuring the Handling of Query Parameters

As vezes você precisa que alguns parâmetros sejam mantidos na rota enquanto navega,
pra isso utilize o queryParamsHandling dessa forma:
```typescript
this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
```

### Redirecting and Wildcard Routes

Para fazer redirecionamentos de uma rota para outra use a opção redirectTo
```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'something', redirectTo: '/not-found'}
];
```

Para fazer com que qualquer uri utilizada retorne o mesmo componente use um wildcard
```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'something', redirectTo: '/not-found'},
  {path: '**', redirectTo: '/not-found'}
];
```
** Lembre-se, no entanto, que o wildcard deve estar por último para que não seja 'encontrado' sempre primeiro ** 

### Important: Redirection Path Matching

A forma comum de o Angular achar um caminho é procurando pelo prefixo, assim se você usar essa rota para redirecionar
    {path: '', redirectTo: '/not-found'},
Você terá um redirecionamento infinito, pois todas as rootas começam com '' (nada), por isso a primeira rota sempre
se encontrará.

Para resolver isso você precisa mudar o comportamento padrão com a opção pathMatch:
    {path: '', redirectTo: '/not-found', pathMatch: 'full'},

### Outsourcing the Route Configuration

Trabalhando com módulo de roteamento separado

app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'something', redirectTo: '/not-found'},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

```

app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

###  Protecting Routes with canActivate

Usando Guards

Angular tem um sistema de guards que funciona como um middleware para rota.

Neste exemplo um guard foi usando com CanActivate para definir se o usuário pode utilizar
um componente ou não.

Primeiro temos um serviço de autenticação
```typescript
import { reject } from 'q';

export class AuthService {
  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }
}

```

Depois temos o guard
```typescript
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
      );
  }
}

```

Em seguida, informamos ao módulo para prover esse serviço.
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ServersService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

E por último escolhemos em quais rotas utilizaremos o guard.
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard-service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'something', redirectTo: '/not-found'},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

```

### Protecting Child (Nested) Routes with canActivateChild

Para usar o guard CanActivate para rotas aninhadas é precismo implementar a interface CanActivateChild
```typescript
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
      );
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}

```
E especificando esta opção na rota
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard-service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'something', redirectTo: '/not-found'},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

```

### Using a Fake Auth Service

Como seria usado o AuthService

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private isAuth: boolean;
  private loggedChangedSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.loggedIn;
    this.loggedChangedSubscription = this.authService.loggedChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
  }

  ngOnDestroy(): void {
    this.loggedChangedSubscription.unsubscribe();
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
```

### Controlling Navigation with canDeactivate

Outro Guard pode ser usado quando você está saindo de uma rota, ele precisa apenas implementar a interface
CanDeactivate do Angular
```typescript
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
      component: CanComponentDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }

}

```

### Passing Static Data to a Route

Existem casos em que um componente utiliza um dado estático, de forma a ter reusabilidade, por exemplo:
```html
<h1>{{ errorMessage }}</h1>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  private errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}

```
Nesse caso ele precisa chamar o campo data da rota. Que foi definido na definição da rota.
```typescript
{path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
```

### Resolving Dynamic Data with the resolve Guard

Quando é necessário resolver algum dado antes de renderizar um component utilize a opção resolver da rota

Primeiro crie o resolver, no caso o componente só deve ser renderizado depois que o server for buscado do banco
```typescript
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';
import { Injectable } from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Server> |
    Promise<Server> |
    Server {
    return this.serversService.getServer(+route.params['id']);
  }
}

```

** Veja que ele é um Injectable **

Agora na rota injete o resolver com o nome do campo que você irá buscar 
```typescript
//...
{path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}
//...
```

Então você pode assinar o listener data da rota para pegar o dado.
```typescript
  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // O resolver está substituindo toda essa lógica
    // const id = this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(+id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }
```

### Understanding Location Strategies

Para que o roteamento da aplicação funcione em um servidor real é necessário
que o servidor esteja configurado para que o angular trate o roteamento

Caso você não consiga fazer essa configuração existe um forma de lidar com esse problema,
utilizando o roteamento com #
```typescript
RouterModule.forRoot(appRoutes, {useHash: true})
```


```html
```
```typescript
```


