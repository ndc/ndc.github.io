---
title: Adding Route Resolve to UI-Router Hello World
date: 2017-11-17 17:00:00 +0700
layout: blogdetail
published: true
---

[Previous Step, Hello World]({{site.baseurl}}{% post_url 2017-11-16-ui-router-hello-world-tutorial-using-angular-cli %})

This is my notes when I tried to follow the [UI-Router Hello Solar System Tutorial](https://ui-router.github.io/ng2/tutorial/hellosolarsystem) using angular CLI.

This time I tried to add `resolve` to a route.

First let's create a component called People:

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

We want to display a list of people in this PeopleComponent, and the list of people should come from a HTTP server, and we are not going to get the data during component initialization, but from resolve step when user tries to navigate to people component.

Now we need a mock HTTP server that dispenses JSON. Let's create a file called `people.json` in `src/assets`. This file will be served as static file from http://localhost:4200/assets/people.json.

Fill the file with some random content:

```json
[
    {
        "ID": "293",
        "IsActive": false,
        "EyeColor": "brown",
        "Name": "Ingrid Townsend",
        "Company": "JASPER",
        "Email": "ingridtownsend@jasper.com",
        "Address": "690 Charles Place, Santel, Northern Mariana Islands, 3791"
    },
    {
        "ID": "581",
        "IsActive": true,
        "EyeColor": "blue",
        "Name": "Estrada Nolan",
        "Company": "FIBRODYNE",
        "Email": "estradanolan@fibrodyne.com",
        "Address": "317 Seeley Street, Cade, Maryland, 3976"
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

Don't forget to add `HttpClientModule` in `imports` of `app.module.ts`. It should be after `BrowserModule`. We should also add `PeopleService` in `providers`.

Now we are ready to add resolve to people route definition:

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

Note the `token` name. It should match the component property name that will receive it.

The `resolveFn` should have parameters matching the list of dependencies in `deps`. Match by position.

Also, `resolveFn` should return promise, not Observable, while HttpClient returns Observable, so don't forget to convert to promise.

All that is left is to configure the people component. To capture data from resolve, add a property with name matching the resolve token:

```typescript
@Input() ResolveDataPeople: Person[];
```

The property should have the `@Input()` attribute on it.

Then display it in the template:

```html
<ul>
  <li *ngFor="let person of ResolveDataPeople">
    {{"{{person.Name"}}}}
  </li>
</ul>
```

Resolve successfully added!

Try to navigate to http://localhost:4200/#/person, it should display the list of people.

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
