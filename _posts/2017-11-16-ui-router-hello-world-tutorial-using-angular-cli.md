---
title: UI-Router Hello World Tutorial using Angular CLI
date: 2017-11-16 08:00:00 +0700
layout: blogdetail
published: true
---

This is my notes when I tried to follow the [UI-Router Hello World Tutorial](https://ui-router.github.io/ng2/tutorial/helloworld) but using angular CLI.

As of 16 November 2017 the above tutorial uses SystemJS. Since I am not familiar with SystemJS when I tried the tutorial I had some trial and errors before I made it work with angular CLI.

I used Angular CLI version 1.5, Angular 5.0.1, UI-Router 1.0.0-rc.0, Typescript 2.4.2, Node.js 8.9.0, NPM 5.5.1 in Windows 7 Pro using Visual Studio Code 1.18.0.

If you haven't installed Angular CLI, install it:

```bash
npm install -g @angular/cli
```

First step is to generate a new project:

```bash
ng new HelloWorld --routing
```

The `--routing` parameter will create a separate module for routing, which I think is nice.

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

Next step is to edit `app-routing.module.ts` in `/src/app`. From:

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

into:

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

Now you are ready to create your first route definition. First create a component:

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

Now if you run the dev server:

```bash
ng serve
```

And navigate to `http://localhost:4200/#/hello`, you will see `hello works!` at the bottom. That's the content of the `hello.component.html` if you haven't noticed.

Add another component called about:

```bash
ng generate component About
```

Add route definition:

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

And when you go to `http://localhost:4200/#/about`, you will see `about works!` at the bottom.

Now modify `app.component.html`, add:

```html
<a uiSref="hello" uiSrefActive="active">Hello</a>
<a uiSref="about" uiSrefActive="active">About</a>
```

Now you can switch back and forth between the two states by clicking the `Hello` and `About` links.

And that's it for the Hello World Tutorial!
