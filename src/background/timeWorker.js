import { browserAPI } from "../shared/utils/browserAPI";

export let timerData = {
  time: 1500,
  isRunning: false,
  lastUpdate: Date.now(),
  originalTime: 1500,
  workTime: 1500,
  breakTime: 300,
  longBreakTime: 900,
  phaseType: "work",
  sessionCount: 0,
};

// Charger l’état sauvegardé
export async function loadTimer() {
  const result = await browserAPI.storage.local.get(["timerData"]);
  if (result.timerData) {
    timerData = result.timerData;
    updateTimerFromLastSave();
  }
}

// Calculer le temps écoulé depuis le dernier update
export function updateTimerFromLastSave() {
  if (timerData.isRunning && timerData.time > 0) {
    const now = Date.now();
    const secondsPassed = Math.floor((now - timerData.lastUpdate) / 1000);
    const oldTime = timerData.time;
    timerData.time = Math.max(0, timerData.time - secondsPassed);
    timerData.lastUpdate = now;
    saveTimerData();
  }
}

// Sauvegarder l’état
export function saveTimerData() {
  browserAPI.storage.local.set({ timerData });
}

// Listener spécifique au timer
export function setupTimerListener() {
  browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_TIMER") {
      updateTimerFromLastSave();
      sendResponse(timerData);
    } else if (request.type === "UPDATE_TIMER") {
      const oldData = { ...timerData };
      Object.assign(timerData, request.data, { lastUpdate: Date.now() });
      saveTimerData();
      sendResponse({ success: true });
    }
    return true; // Keep channel open for async response
  });
}
