### Reactive: Arrays of Form Controls (FormArray)

Form arrays podem ser usados para quando o usuário precisa de um input que vai 
se acrescentando enquanto o usuário digita novos valores. Como inputs para 
telefones ou emails

```html
<div formArrayName="hobbies">
  <h4>Your hobbies</h4>
  <button class="btn btn-default" type="button" (click)="onAddHobby()">Add Hobby</button>
  <div class="form-group" *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index">
    <input type="text" class="form-control" [formControlName]="i">
  </div>
</div>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-driven-app',
  templateUrl: './reactive-driven-app.component.html',
  styleUrls: ['./reactive-driven-app.component.css']
})
export class ReactiveDrivenAppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
}

```

### Reactive: Creating Custom Validators

Para criar uma validação use a seguinte estrutura:
```typescript
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-driven-app',
  templateUrl: './reactive-driven-app.component.html',
  styleUrls: ['./reactive-driven-app.component.css']
})
export class ReactiveDrivenAppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsenames = ['Chris', 'Anna'];

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsenames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;// <<<--- não retorne nada caso o teste falhe
  }
}

```

### Reactive: Using Error Codes

Para acessar os erros de um campo encontre o controlador no form e procure o nome do indice na propriedade 
'errors', o nome do indice será o nome do erro.

```html
<span
    *ngIf="signupForm.get('userData.username').invalid && signupForm.get('userData.username').touched"
    class="help-block">
  <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">
    This name is invalid!
  </span>
  <span *ngIf="signupForm.get('userData.username').errors['required']">
    This field is required!
  </span>
</span>
```

### Reactive: Creating a Custom Async Validator

Você pode fazer um validator assincrono
```typescript
forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          return null;
        }
      }, 2000);
    });
  return promise;
}
```

Você irá passá-lo como terceiro argumento na criação do FormControl
```typescript
new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails])
```

O input que conterá esse valor receberá a classe ng-pending enquanto estiver validando, para que 
você possa estilizá-lo.

### Reactive: Reacting to Status or Value Changes

O FormGroup possui dois Observers valueChanges que reage a cada mudança nos inputs, e o 
statusChanges que reage a cada mudança no status do form.

```typescript
ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );

    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );
  }
```

### Reactive: Setting and Patching Values

FormGroup também possui os métodos setValue patchValue e reset

## Section 17 - Using Pipes to Transform Output

### Using Pipes

Aqui estamos aplicando um pipe para tornar o dado maiusculo.
```html
  {{ server.instanceType | uppercase }} 
```

### Parametrizing Pipes & Chaining Multiple Pipes

Aqui estamos usando um pipe passando parâmetros, também adicionamos novos pipes separandos com um '|'

** A ordem é importante, porque os pipes são aplicados da esquerda pra direita **

```html
{{ server.started | date:'fullDate' | uppercase }}
```

### Creating a Custom Pipe

Como criar um pipe:

shorten.pipe.ts
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
```

Os argumentos são passados separandos por ':'
```html
{{ server.name | shorten:15 }}
```

### Example: Creating a Filter Pipe

Como criar um filtro que filtre os dados contidos em um array

```html
<li
  class="list-group-item"
  *ngFor="let server of servers | filter:filteredStatus:'status'"
  [ngClass]="getStatusClasses(server)">
```
filter.pipe.ts
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

```

### Pure and Impure Pipes

O problema de pipes 'puros' é que eles não são recalculados quando o array ou o objeto em questão  
sofre uma mudança. Isso custaria perfomance da aplicação, por acresentar mais um listener para o filtro 
por isso tenha cuidado ao criar pipes 'impuros' para manter uma lista atualizada.

### Understanding the "async" Pipe

Existe um pipe para que a propriedade só irá lida após algum tempo.

```html
<h2>App Status: {{ appStatus | async}}</h2>
```

```html
```
```typescript
```

