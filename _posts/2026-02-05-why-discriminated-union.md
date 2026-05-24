---
title: The Benefits of Discriminated Union
date: 2026-02-05 21:58:00 +0700
layout: blogdetail
published: true
---

Suppose you have to use a third party library. You don't have the source code for this library. You need to use the `RegisterNewUser` method. It returns an int as the registered user ID. You prepare the parameter object and call this method. End of story? Probably not.

Will your call always succeed? Won't that method validate your parameters? Will it throw exception? What kind of exception? Shouldn't you handle the exception if the method throws one? Visual Studio Object Browser won't tell you what kind of exceptions a method can throw. You need to check the documentation if there is one. If you have the source code you may need to scan the body of the method, and the body of the other methods that it calls, to see if an exception is thrown somewhere.

What if instead of returning just the user ID, the method signature becomes like this:

`OneOf(int, UsernameTaken, InvalidName) RegisterNewUser(NewUser request)`

The method signature explains that this method is not always successful. It may return either the user ID if successful, 'username is taken' type, or 'invalid name' type. The caller needs to handle all possible return types. Now isn't that much clearer?

