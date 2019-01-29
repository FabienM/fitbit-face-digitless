import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Message socket opens
messaging.peerSocket.onopen = () => {
    console.log("Companion Socket Open");
    restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
    console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
    let data = {
        key: evt.key,
        value: JSON.parse(evt.newValue)
    };
    sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
    for (let index = 0; index < settingsStorage.length; index++) {
        let key = settingsStorage.key(index);
        if (key) {
            let data = {
                key: key,
                value: JSON.parse(settingsStorage.getItem(key))
            };
            sendVal(data);
        }
    }
}

// Send data to device using Messaging API
function sendVal(data: any) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    }
}
