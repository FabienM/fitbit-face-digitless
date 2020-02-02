# Fitbit Face Digitless

A Fitbit clock face inspired by vurggodzns' [digitless](https://www.facer.io/watchface/kKMuqp1O4v).

🇬🇧🇫🇷🇮🇹🇩🇪[![Build Status](https://travis-ci.org/FabienM/fitbit-face-digitless.svg?branch=master)](https://travis-ci.org/FabienM/fitbit-face-digitless)

##### Versa

![en](docs/screenshots/en-versa.png)
![fr](docs/screenshots/fr-versa.png)
![it](docs/screenshots/it-versa.png)
![de](docs/screenshots/de-versa.png)

##### Ionic

![en](docs/screenshots/en-ionic.png)
![fr](docs/screenshots/fr-ionic.png)
![it](docs/screenshots/it-ionic.png)
![de](docs/screenshots/de-ionic.png)

##### Settings

![settings](docs/screenshots/settings.jpg)

## License

Source code is GPLv3.

Design is exclusive property of [vurggodzns](https://www.facer.io/user/XLR9AscBPt).

## Features

##### Second-hand bar

The middle bar grows with seconds from the middle of the screen.

##### Neat first screen

If activated, only the hours appear in a white font at screen wake-up.
Middle bar, colors, indicators and date reveal on user "click".

![neat](docs/screenshots/neat.png)

##### Customizable colors

Background and text colors are customizables.

## Future enhancements

##### Better fonts

While the original design has pretty nice fonts, this version sticks to the defaults FitbitOS fonts, with a disappointing feeling.

##### Customizable indicators

As of today, the heartrates, steps and calories indicators are hard-coded in this order.

More indicators could be supported and reordering could be permitted.

## How to build

Prerequisites: Node.js 10.x+

```
git clone https://github.com/FabienM/fitbit-face-digitless.git
cd fitbit-face-digitless
make
```

You can read Fitbit's [CLI Reference](https://dev.fitbit.com/build/guides/command-line-interface/#building-and-installing-your-project)
to learn how to build and deploy this face to your device.
