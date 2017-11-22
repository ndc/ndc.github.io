---
title: UI-Router Hello World Tutorial using Angular CLI
date: 2017-11-16 08:00:00 +0700
layout: blogdetail
published: true
---

This is my attempt to rewrite the [UI-Router Hello World Tutorial](https://ui-router.github.io/ng2/tutorial/helloworld) using angular CLI instead of SystemJS.

The Angular CLI that is used is version 1.5, Angular 5.0.1, UI-Router 1.0.0-rc.0, Typescript 2.4.2, Node.js 8.9.0, NPM 5.5.1 in Windows 7 Pro using Visual Studio Code 1.18.0.

Here we go!

---

Let's build a Hello World UI-Router application for Angular (2+). It will have two "pages" (hello and about), each one having its own URL. We can switch between pages by clicking on links. The link for the active page will be highlighted.

## Creating the Application

If you haven't installed Angular CLI, install it:

```bash
npm install -g @angular/cli
```

First step is to generate a new project:

```bash
ng new HelloWorld --routing
```

The `--routing` parameter will create a separate module for routing called `app-routing.module`.

If you are using Windows and encounters error when npm is installing modules, and the error message says something about fsevents, it is a [known issue that will be fixed in the future](https://github.com/npm/npm/issues/17671). In the mean time you can separate the creation of the angular project with the installation of npm module like this:

```bash
ng new HelloWorld --routing --skip-install
cd HelloWorld
npm install
```

Sometimes it helps, but sometimes you will encounter the same issue during npm install. You can repeat npm install until you don't encounter the fsevents error.

Then add UI-Router:

```bash
npm install @uirouter/angular
```

Now we need to repurpose `app-routing.module.ts` in `/src/app` from using Angular Router to using UI-Router. Originally it will look like this:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Change it into:

```typescript
import { NgModule } from '@angular/core';
import { RootModule, UIRouterModule } from '@uirouter/angular';

const rootModule: RootModule = {
  states: [],
  useHash: true
};

@NgModule({
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class AppRoutingModule { }
```

Later you will add UI-Router state definitions in the `states: []` array.

Next step is to modify the `app.component.html` in `/src/app`, change:

```html
<router-outlet></router-outlet>
```

into:

```html
<ui-view></ui-view>
```

Now the project is converted to use UI-Router.

## Adding Your First State

You are ready to create your first state definition. First create a component called HelloComponent:

```bash
ng generate component Hello
```

Then add a route definition in `app-routing.module.ts`:

```typescript
...
const rootModule: RootModule = {
  states: [
    {
      name: "hello",
      url: "/hello",
      component: HelloComponent
    }
  ],
  ...
```

Don't forget to add reference at the top:

```typescript
import { HelloComponent } from './hello/hello.component';
```

A state is the basic building block for UI-Router applications. This javascript object is a simple state definition.

```typescript
{
  name: "hello",
  url: "/hello",
  component: HelloComponent
}
```

This simple state definition has three properties:

`name`: The state is named hello.

`url`: When the state is active, the browser’s url will be `/hello`.

`component`: property value is the Angular (2+) component class that will be loaded into the viewport when the state is active. In this case, we will load the HelloComponent.

Now if you run the dev server:

```bash
ng serve
```

And navigate to http://localhost:4200, it will redirect to http://localhost:4200/#/ but the page will be blank. That's because there is no component to show at `#/`.

Try to open http://localhost:4200/#/hello, you will see `hello works!`. That's the content of the `hello.component.html` which you have linked to the URL `#/hello` in the router. UI-Router puts the content of `hello.component.html` into the `<ui-view>` tag in `app.component.html`.

## Adding the About State

Add another component called `about`:

```bash
ng generate component About
```

Add state definition:

```typescript
...
import { AboutComponent } from './about/about.component';
...
    {
      name: "about",
      url: "/about",
      component: AboutComponent
    }
...
```

And when you go to http://localhost:4200/#/about, you will see `about works!`, which is the content of `about.component.html`.

## Adding Links to States

Now modify `app.component.html`, add:

```html
<a uiSref="hello" uiSrefActive="active">Hello</a>
<a uiSref="about" uiSrefActive="active">About</a>
```

The `uiSref` directives are links, similar to an anchor tag's href. Instead of linking to a URL like an href, a uiSref links to a state.

When clicked, the linked state is activated. The uiSref directive automatically builds a href attribute for you (`<a href=...></a>`) based on your state's url.

The uiSref links also have `uiSrefActive='active'`, which is another directive. The addition of `uiSrefActive='active'` adds the `active` css `class` to the link when the target state is active.

Now you can switch back and forth between the two states by clicking the `Hello` and `About` links.

At any time, the user can refresh the browser, and the application will restart at the same URL. The URL contains the information necessary to restore the application's state. When the application is restarted, it will be in the same state as before.

## Adding the People State

Let's create a component called People:

```bash
ng generate component People
```

Add route definition for PeopleComponent:

```typescript
{
  name: "people",
  url: "/person",
  component: PeopleComponent
}
```

Add a link to navigate to people in `app.component.html`:

```html
<a uiSref="people" uiSrefActive="active">People</a>
```

## Adding the People Service

We want to display a list of people in PeopleComponent, and the list of people should come from a HTTP server.

We need a mock HTTP server that dispenses JSON. Let's create a file called `people.json` in `src/assets`. This file will be served as static file from http://localhost:4200/assets/people.json.

Fill the file with some random content:

```json
[
    {
        "ID": "293",
        "IsActive": false,
        "EyeColor": "brown",
        "Name": "Zaphod Beeblebrox",
        "Company": "Betelgeuse",
        "Email": "zaphod@beeblebrox.com",
        "Address": "Heart of Gold"
    },
    {
        "ID": "581",
        "IsActive": true,
        "EyeColor": "blue",
        "Name": "Slartibartfast",
        "Company": "Magrathea",
        "Email": "slarti@bartfast.com",
        "Address": "Norway, Earth"
    }
]
```

Now let's create a service to get data from our brand new API:

```bash
ng generate service service/People
```

Note that the service will be put in folder `src/app/service`.

Add dependency to `HttpClient` in the service's `constructor`. `HttpClient` is available from `@angular/common/http`.

Then add a function to get the data:

```typescript
GetPeople() {
  return this.http.get("/assets/people.json");
}
```

Actually we can do better. We should take advantage of Typescript's static typing by binding the response to a defined class.

Let's create a class to contain a person data:

```bash
ng generate class service/Person
```

We should define the class to match the API's response:

```typescript
export class Person {
    ID: number;
    IsActive: boolean;
    EyeColor: string;
    Name: string;
    Company: string;
    Email: string;
    Address: string;
}
```

Then we modify the service to automatically bind the response to `Person[]`:

```typescript
GetPeople() {
  return this.http.get<Person[]>("/assets/people.json");
}
```

Don't forget to add `HttpClientModule` in `imports` of `app.module.ts`. It should be after `BrowserModule`. We should also add `PeopleService` in `providers`. Like this:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { AboutComponent } from './about/about.component';
import { PeopleComponent } from './people/people.component';
import { PeopleService } from './service/people.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    AboutComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The complete PeopleService:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';

@Injectable()
export class PeopleService {

  constructor(
    private http: HttpClient
  ) { }

  GetPeople() {
    return this.http.get<Person[]>("/assets/people.json");
  }

}
```

## Adding Resolve to the People State

When a user switches back and forth between states of a single page web app, the app often needs to fetch application data from a server API, such as a REST endpoint.

A state can specify the data it requires by defining a `resolve` property. When the user tries to activate a state which has a resolve property, UI-Router will fetch the required data before activating the state. The fetched data is then bound to the state's component(s).

Let's add resolve to the people state:

```typescript
{
  name: "people",
  url: "/person",
  component: PeopleComponent,
  resolve: [
    {
      token: "ResolveDataPeople",
      deps: [PeopleService],
      resolveFn: (peopleSvc: PeopleService) => peopleSvc.GetPeople().toPromise()
    }
  ]
}
```

The resolve property on a state definition is an array. Each element of the array is an object which defines some data to be fetched. The object has the Dependency Injection `token` (name) for the data being loaded. It has a `resolveFn` which returns a promise for the data. It also has a `deps` property, used to define the DI tokens for the resolveFn's dependencies (function parameters).

The resolve property of the people state is an array containing a single object. The object defines how to fetch the `ResolveDataPeople` data (its name / token).

The object defines a resolveFn which returns a promise for all the people data. The resolveFn is injected with the `PeopleService` because the first element of the deps property is the PeopleService token.

When fetching data, we recommend delegating to services which return promises.

UI-Router waits until the promise returned from `peopleSvc.GetPeople().toPromise()` resolves before activating the people state. The PeopleComponent is created, and the list of people is fed into the component's `ResolveDataPeople`:

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../service/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor() { }

  @Input() ResolveDataPeople: Person[];

  ngOnInit() {
  }

}
```

Note the resolve `token` name. It should match the component property name that will receive it (`@Input() ResolveDataPeople: Person[]`).

Also note the HttpClient returns Observable, not promise, so don't forget to add `toPromise()` when calling `HttpClient.get`.

Now we can modify `people.component.html` to show the people:

```html
<h3>Some People</h3>

<ul>
  <li *ngFor="let person of ResolveDataPeople">
    {{"{{"}}person.Name}}
  </li>
</ul>

<ui-view></ui-view>
```

Try to navigate to http://localhost:4200/#/person, it should display the list of people.

## Adding State with Parameter

We want to allow the user to be able to view the details for a specific person. The person state takes a `personid` parameter, and uses it to fetch that specific person's details.

The parameter value is included as a part of the URL. This enables the same person details to be shown when the application is reloaded.

The person state definition:

```typescript
{
  name: "people.person",
  url: "/:personid",
  component: PersonComponent,
  resolve: [
    {
      token: "ResolveDataPerson",
      deps: [Transition, "ResolveDataPeople"],
      resolveFn: (trans: Transition, people: Person[]) => people.find(person => person.ID == trans.params().personid)
    }
  ]
}
```

PersonComponent is not yet available, so let's add it:

```bash
ng generate component Person
```

The URL will reflect the current personid parameter value, e.g., http://localhost:4200/#/person/21.

The person resolve receives the `personid` parameter from the `Transition` object. The Transition is a special injectable object with information about the current state transition.

## About Nested State

UI-Router states form a tree, starting from a single root state. The root state is implicit and has no name. The top-level application states (such as about and people) are children of the implicit root state.

This Hello World application has three top-level states (hello, about, and people) and one nested state (person).

The person state is a child of the people state.

Please note the person state name, `people.person`. When naming a state, prepending another state's name (and a dot) creates a parent/child relationship. In this case, the people.person state is a child of the people state.

Another way to create a parent/child relationship is with the `parent:` property of a state definition.

Please note the person state URL, `/:personid`. The child state's url property is a url fragment (a partial url). The full url for a child state is built by appending the child state's url fragment to the parent state's url.

The url for the parent state (people) is still `/person`. Appending `/:personid` to /person results in `/person/:personid`.

The router will map a browser url of `/person` to the people state. It will map a browser url of `/person/123` to the person state, with a `peopleid` parameter value of `123`.

## About Nested Resolve

Please note the person state resolve:

```typescript
{
  token: "ResolveDataPerson",
  deps: [Transition, "ResolveDataPeople"],
  resolveFn: (trans: Transition, people: Person[]) => people.find(person => person.ID == trans.params().personid)
}
```

When you open the people url the router fetches the people resolve from the server API, then activates the people state and renders the view.

When you open the url to a specific person, the router invokes the person resolve before activating the person state. However, this resolve is a bit different. Instead of fetching the person from the server, the person resolve injects the parent state's people resolve. Since the list of people is already loaded in the parent resolve, no additional fetching occurs. See the `ResolveDataPeople` in `deps`, which will be injected to `people: Person[]` parameter in `resolveFn`.

A resolve function may inject the results of other resolves from ancestor states, or from other resolves on the same state.

## Updating Person View

Let's set up `person.component.ts`:

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../service/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor() { }

  @Input() ResolveDataPerson: Person;

  ngOnInit() {
  }

}
```

Please note the `ResolveDataPerson` as `@Input()`.

Next we set up the `person.component.html`:

```html
<p>Name: {{"{{"}}ResolveDataPerson.Name}}</p>
<p>Address: {{"{{"}}ResolveDataPerson.Address}}</p>
```

## Linking with Parameters

Let's update the `people.component.html` to add link to open person detail:

```html
<h3>Some People</h3>

<ul>
  <li *ngFor="let person of ResolveDataPeople">
    <a uiSref=".person" [uiParams]="{personid: person.ID}">
      {{"{{"}}person.Name}}
    </a>
  </li>
</ul>

<ui-view></ui-view>
```

We have embedded a nested `<ui-view></ui-view>` viewport. When a child state of people is activated, its view is put into the viewport. In this case when the person state is active, that `<ui-view>` is filled with the person view.

Please note the `uiSref` attribute. We use relative addressing: `uiSref=".person"`. Since the uiSref was created in the people state's view and it relatively targets `.person`, the final target state is `people.person`.

Please note we include the `personid` parameter value using `uiParams` attribute. As we loop over each person object using `*ngFor`, we provide the uiSref with the personid using each person's `.ID` property.

## Navigate to a State

How to tell UI-Router to navigate to a certain state with typescript instead of as a link?

Let's add a button in the `app.component.html`:

```html
<button (click)="OpenAPerson()" type="button">Open a Person</button>
```

And update `app.component.ts` by injecting `StateService`, adding `OpenAPerson` function, and calling `StateService.go` within the function:

```typescript
...
import { StateService } from '@uirouter/angular';
...
constructor(
  private state: StateService
) { }
...
OpenAPerson() {
  this.state.go("people.person", { personid: 293 });
}
```

Now when you press the button, UI-Router will navigate to the `people.person` state with `personid` state parameter value `293`.

If you want to force UI-Router to reload the state:

```typescript
this.state.go("people.person", { personid: 293 }, { reload: true })
```

## Adding the Otherwise Route

In `app-routing.module.ts` add:

```typescript
const rootModule: RootModule = {
  states: [
    ...
  ],
  useHash: true,
  otherwise: "/hello"
};
```

Now if the router receives a URL that it doesn't recognize, it will redirect the user to `/hello`.

Try it! Go to http://localhost:4200/#/helloooo. We didn't define `/helloooo` and the router will redirect you to http://localhost:4200/#/hello.

## About Arrow Function and AOT Compiler

Later if you have trouble building the app:

```bash
ng build --prod --build-optimizer
```

If it produces error like: *Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function*, that's because angular 5's AOT compiler doesn't like arrow function in the router definition.

You can replace the resolve:

```typescript
resolveFn: (peopleSvc: PeopleService) => peopleSvc.GetPeople().toPromise()
```

with:

```typescript
resolveFn: ResolvePeople
...
export function ResolvePeople(peopleSvc: PeopleService) {
  return peopleSvc.GetPeople().toPromise();
}
```

Or you can tell angular not to use AOT compiler:

```bash
ng build --prod --aot false
```

## Done

And that's it for the Hello World Tutorial!

Complete code is available in this [GitHub repository](https://github.com/ndc/ui-router-tutorial-in-angular-cli).

To learn further about UI-Router you can visit:

* [The guide page](https://ui-router.github.io/guide/)
* [API documentation](https://ui-router.github.io/ng2/docs/latest/)