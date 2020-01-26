import clock from "clock";
import document from "document";
import {locale, preferences} from "user-settings";
import {me} from "appbit";
import {BodyPresenceSensor} from "body-presence";
import {HeartRateSensor, HeartRateSensorReading} from "heart-rate";
import {today} from "user-activity";
import {display} from "display";
import {onSettingChange} from "./settings";
import {getDateInWordsInstance} from "./time";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const rootElement = document.getElementById("root") as ContainerElement;
const backgroundElement = document.getElementById("background") as ContainerElement;
const hoursElement = document.getElementById("hours") as TextElement;
const minsElement = document.getElementById("minutes") as TextElement;
const ampmElement = document.getElementById("ampm") as TextElement;
const dayElement = document.getElementById("day") as TextElement;
const dateElement = document.getElementById("date") as TextElement;
const sepElement = document.getElementById("sep") as LineElement;
const hrElement = document.getElementById("hr") as TextElement;
const stepsElement = document.getElementById("steps") as TextElement;
const calsElement = document.getElementById("cals") as TextElement;

const backgroundElements = document.getElementsByClassName("background");
const coloredElements = document.getElementsByClassName("colored");

const hiddenElements = document.getElementsByClassName("hide");

let enableNeat = true;
let lastDate: Date;
let foregroundColor = 'fb-aqua';

function updateSecondHand(date: Date) {
    let middle = rootElement.width / 2;
    let secondHand = .90 * middle;
    if (clock.granularity === "seconds") {
        secondHand = Math.floor(date.getSeconds() * secondHand / 60);
    }
    sepElement.x1 = middle - secondHand;
    sepElement.x2 = middle + secondHand;
}

function toggleDisplay(on: boolean) {
    hiddenElements.forEach(value => {
        ((value as unknown) as Styled).style.opacity = on ? 1 : 0;
    });
    coloredElements.forEach(value => {
        ((value as unknown) as Styled).style.fill = on ? foregroundColor : 'white';
    })
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
    let dateInWords = getDateInWordsInstance(preferences.clockDisplay === "12h", evt.date, locale.language);
    hoursElement.text = dateInWords.formatHours();
    minsElement.text = dateInWords.formatMinutes();
    ampmElement.text = dateInWords.formatAmPm();
    dayElement.text = dateInWords.formatWeekday();
    dateElement.text = dateInWords.formatDate();
    stepsElement.text = today.adjusted.steps ? `${today.adjusted.steps}` : "-";
    calsElement.text = today.adjusted.calories ? `${today.adjusted.calories}` : "-";
    lastDate = evt.date;

    updateSecondHand(lastDate);
};

let body: BodyPresenceSensor;
let hrm: HeartRateSensor;

if (me.permissions.granted("access_heart_rate") && HeartRateSensor) {
    hrm = new HeartRateSensor({frequency: 3});
    hrm.onreading = () => {
        hrElement.text = `${hrm.heartRate}`;
        hrm.timestamp
    };
}
if (me.permissions.granted("access_activity") && BodyPresenceSensor) {
    body = new BodyPresenceSensor();
    body.onreading = () => {
        if (!body.present) {
            hrm.stop();
            hrElement.text = "-";
            return;
        }
        hrm.start();
    };
    body.start();
}

onSettingChange(s => {
    backgroundElements.forEach(value => {
        ((value as unknown) as Styled).style.fill = s.bgColor;
    });
    foregroundColor = s.fgColor;
    coloredElements.forEach(value => {
        ((value as unknown) as Styled).style.fill = s.fgColor;
    });
    clock.granularity = s.disableSeconds ? "minutes" : "seconds";
    if (s.disableSeconds) {
        updateSecondHand(lastDate);
    }
    ampmElement.style.opacity = s.disableMeridiem ? 0 : 1;
    enableNeat = !s.disableNeat;
    toggleDisplay(s.disableNeat);
});

display.onchange = () => {
    enableNeat && toggleDisplay(false);
};

backgroundElement.onmouseup = () => {
    toggleDisplay(true);
};

toggleDisplay(true);
