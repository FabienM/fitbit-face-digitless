import * as messaging from 'messaging'
import { settingsStorage } from 'settings'

// Message socket opens
messaging.peerSocket.onopen = (): void => {
  restoreSettings()
}

// A user changes settings
settingsStorage.onchange = (evt): void => {
  const data = {
    key: evt.key,
    value: JSON.parse(evt.newValue),
  }

  sendVal(data)
}

// Restore any previously saved settings and send to the device
/**
 *
 */
function restoreSettings(): void {
  for (let index = 0; index < settingsStorage.length; index++) {
    const key = settingsStorage.key(index)

    if (key) {
      const data = {
        key,
        value: JSON.parse(settingsStorage.getItem(key)),
      }

      sendVal(data)
    }
  }
}

// Send data to device using Messaging API
/**
 * @param data
 */
function sendVal(data: any): void {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data)
  }
}
