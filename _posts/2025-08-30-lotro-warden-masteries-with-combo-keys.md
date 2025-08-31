---
title: LotRO Warden Masteries with Combo Keys
date: 2025-08-30 15:48:00 +0700
layout: blogdetail
published: true
---

It's the end of August 2025. LotRO's old forum is about to shut down. I want to preserve one knowledge from it that makes playing Warden a lot of fun for me. The original thread's title was [Droid's Combo-button Mastery for Wardens](https://forums-old.lotro.com/forums/showthread.php?440148-Droid-s-Combo-button-Mastery) from January 2012 and this article is what I took from it.

Normally you call [The Lord of the Rings Online](https://www.lotro.com/home)'s [Warden](https://lotro-wiki.com/wiki/Warden)'s Masteries like any other skills. But what if you can call the masteries with very intuitive keyboard shortcuts? Suppose you assign Spear to 1, Shield to 2, and Fist to 3. You call Spear-Shield mastery by pressing and holding 1, then press 2. You call Spear-Spear mastery by double-tapping 1. I find this very easy to memorize.

This person Droid in the old forum created an [AutoHotKey](https://www.autohotkey.com/) script to do that. You can try it by first installing AutoHotKey. Then you save the script to an `.ahk` file. Then you activate the script (doubleclick the `.ahk` file) before you play Warden in LotRO. When you are done with it, you can close AutoHotkey from the system tray (the green H icon).

I have customized the script to my own preferences. Here is the simple version.

``` autohotkey
#NoEnv
SendMode Input
#UseHook
#IfWinActive The Lord of the Rings Online

Numpad4 & Numpad5::  ; press & hold numeric keypad 4 then press numpad 5
Send +2              ; will actually send SHIFT-2
return

Numpad5 & Numpad6::
Send +3
return

Numpad6 & Numpad4::
Send +4
return

Numpad4 & Numpad6::
Send !2
return

Numpad5 & Numpad4::
Send !3
return

Numpad6 & Numpad5::
Send !4
return

Numpad4::
KeyWait, Numpad4
KeyWait, Numpad4, D T0.14   ; doubletap numpad 4 within 0.14 second
if (!ErrorLevel)
    send ^2                 ; will send CTRL-2
else send 2                 ; single press will send 2
KeyWait, Numpad4
return

Numpad5::
KeyWait, Numpad5
KeyWait, Numpad5, D T0.14
if (!ErrorLevel)
    send ^3
else send 3
KeyWait, Numpad5
return

Numpad6::
KeyWait, Numpad6
KeyWait, Numpad6, D T0.14
if (!ErrorLevel)
    send ^4
else send 4
KeyWait, Numpad6
return

Numpad0::
KeyWait, Numpad0
KeyWait, Numpad0, D T0.14
if (!ErrorLevel)
    send ^5
else send 5
KeyWait, Numpad0
return
```

The script is tightly related to the skill bar. Here is my skill bar when using the script above:

<img src="https://i.imgur.com/GiOVOgB.png" alt="skill bar" width="100%" />

I put the following skills in location:
* `2` spear
* `3` shield
* `4` fist
* `CTRL`-`2` spear-spear
* `CTRL`-`3` shield-shield
* `CTRL`-`4` fist-fist
* `ALT`-`2` spear-fist
* `ALT`-`3` shield-spear
* `ALT`-`4` fist-shield
* `SHIFT`-`2` spear-shield
* `SHIFT`-`3` shield-fist
* `SHIFT`-`4` fist-spear

The script redirects keystrokes at numeric keypads to the shortcut keys above. For example pressing and holding numeric keypad 4 then pressing numpad 5 will actually send `SHIFT`-`2`, which is bound to spear-shield mastery.

To avoid conflict between key bindings and the script I have also cleared any key bindings for numeric keypads in the game.

You should customize the script above to your own liking. If your skill bar is different than mine, you can update the script to send different keystrokes. `+2` means `SHIFT`-`2`, `^2` means `CTRL`-`2`, and `!2` means `ALT`-`2`. If you prefer not to use numeric keypad, you can use different keys. You can find the name of the keys in [AutoHotKey documentation](https://www.autohotkey.com/docs/v1/KeyList.htm).

My personal script has grown much bigger than the script above. I use the other keys in the numeric keypad too so I can invoke most of the skills without using the mouse. It's available as [a GitHub Gist](https://gist.github.com/ndc/6d077e05d39188d495b8a7783e7a689f).
