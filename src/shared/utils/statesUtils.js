import { browserAPI } from "./browserAPI";

export async function updateStats(type, amount = 1) {
  const today = new Date().toISOString().split("T")[0];
  const result = await browserAPI.storage.local.get(["statistics"]);

  const stats = result.statistics || {
    totalWorkTime: 0,
    totalBreakTime: 0,
    totalLongBreakTime: 0,
    totalSessions: 0,
    totalListenTime: 0,
    totalDeflectionsAttempted: 0,
    tasksCompleted: 0,
    tasksCreated: 0,
    tasksPending: 0,
    tasksCompleted_high: 0,
    tasksCompleted_medium: 0,
    tasksCompleted_low: 0,
    days: [],
  };
  
  if (!stats.days) stats.days = [];

  let todayStats = stats.days.find((d) => d.date === today);
  if (!todayStats) {
    todayStats = {
      date: today,
      totalWorkTime: 0,
      totalBreakTime: 0,
      totalLongBreakTime: 0,
      totalSessions: 0,
      totalListenTime: 0,
      totalDeflectionsAttempted: 0,
      tasksCompleted: 0,
      tasksCreated: 0,
      tasksPending: 0,
      tasksCompleted_high: 0,
      tasksCompleted_medium: 0,
      tasksCompleted_low: 0,
    };
    stats.days.push(todayStats);
  }

  if (stats[type] !== undefined) {
    stats[type] += amount;
  }

  if (todayStats[type] !== undefined) {
    todayStats[type] += amount;
  }

  await browserAPI.storage.local.set({ statistics: stats });
}