import clock from "clock";
import document from "document";
import {locale, preferences} from "user-settings";
import {getDateInWordsInstance} from "./time";
import {me} from "appbit";
import {BodyPresenceSensor} from "body-presence";
import {HeartRateSensor} from "heart-rate";
import {today} from "user-activity";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const rootElement = document.getElementById("root") as ContainerElement;
const hoursElement = document.getElementById("hours") as TextElement;
const minsElement = document.getElementById("minutes") as TextElement;
const ampmElement = document.getElementById("ampm") as TextElement;
const dayElement = document.getElementById("day") as TextElement;
const dateElement = document.getElementById("date") as TextElement;
const sepElement = document.getElementById("sep") as LineElement;
const hrElement = document.getElementById("hr") as TextElement;
const stepsElement = document.getElementById("steps") as TextElement;
const calsElement = document.getElementById("cals") as TextElement;

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
    if (clock.granularity == "seconds") {
        let middle = rootElement.width / 2;
        let halfBarSize = Math.floor(evt.date.getSeconds() * middle * .90 / 60);
        sepElement.x1 = middle - halfBarSize;
        sepElement.x2 = middle + halfBarSize;
    }
}

let body: BodyPresenceSensor;
let hrm: HeartRateSensor;

if (me.permissions.granted("access_heart_rate")) {
    hrm = new HeartRateSensor({frequency: 3});
    hrm.onreading = () => {
        hrElement.text = `${hrm.heartRate}`;
    };
}
if (me.permissions.granted("access_activity")) {
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
