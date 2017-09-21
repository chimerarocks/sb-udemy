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


