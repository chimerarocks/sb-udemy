# Project

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

# Project

Foi inserido o bootstrap de forma global na aplicação, isso foi feito
instalando o pacote bootstarp e importando dentro do arquivo de configuração do cli
do angular:

console:
```bash
npm install --save boostrap
```
.angular-cli.json
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "project"
  },
  "apps": [
    {
      // ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ]
      // ...
    }
  ]
  // ...
}
```

Para criar um componente sem o spec foi utilizado o comando:

    ng g c recipes --spec false
    
    
**AHEAD OF TIME COMPILATION**

Just-in-time Compilation process
> development > production > app downloaded in Browser > Angular Parses and Compiles Templates to Javascript

Ahead-of-time Compilation process
> development > Angular Parses and Compiles Templates to Javascript > production > app downloaded in Browser 

***Advantages***

Faster Startup sind Parsing and Compilation doesn't happen in Browser

Templates get checked during Development

Smaller File Size as unused features can be stripped out and the Compiler itself isn't shipped

***How to use***
ng build --prod --aot

***Deployment***
use only what is in dist folder

pay attention to the base href of index.html file
 
 ** ** 
 
 return this.http.get(this.app.apiGetRecipesURI + '?' + token, {
       observe: 'response' | 'body' (default),
       responseType: 'text' | 'json' (default) | 'blob' | 'arraybuffer'
     })