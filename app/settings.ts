import * as messaging from 'messaging'
import * as fs from 'fs'
import { me } from 'appbit'

class Settings {
  public bgColor: string
  public fgColor: string
  public disableSeconds: boolean
  public disableMeridiem: boolean
  public disableNeat: boolean
}

const SETTINGS_TYPE = 'cbor'
const SETTINGS_FILE = 'settings-digitless.cbor'

let current: Settings = new Settings()
let onSettingChangeCallback: (s: Settings) => void

/**
 * @param callback
 */
export function onSettingChange(callback: (s: Settings) => void): void {
  current = loadSettings()
  onSettingChangeCallback = callback
  callback(current)
}

messaging.peerSocket.onmessage = (evt): void => {
  console.info(`Received setting key '${evt.data.key}' with value '${evt.data.value}'`)
  switch (evt.data.key) {
    case 'backgroundColor':
      current.bgColor = evt.data.value
      break
    case 'foregroundColor':
      current.fgColor = evt.data.value
      break
    case 'disableSeconds':
      current.disableSeconds = evt.data.value
      break
    case 'disableMeridiem':
      current.disableMeridiem = evt.data.value
      break
    case 'disableNeat':
      current.disableNeat = evt.data.value
      break
  }
  if (onSettingChangeCallback) {
    onSettingChangeCallback(current)
  }
}

// Register for the unload event
me.addEventListener('unload', saveSettings)

// Load settings from filesystem
/**
 *
 */
function loadSettings(): Settings {
  let s = new Settings()

  try {
    s = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE)
  } catch (ex) {
    console.warn(`Failed to load settings from file ${SETTINGS_FILE}`)
    s.bgColor = 'black'
    s.fgColor = 'fb-aqua'
    s.disableSeconds = false
    s.disableMeridiem = false
    s.disableNeat = false
  }
  return s
}

// Save settings to the filesystem
/**
 *
 */
function saveSettings(): void {
  fs.writeFileSync(SETTINGS_FILE, current, SETTINGS_TYPE)
}
