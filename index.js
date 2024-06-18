import { Kicktipp } from "./api/kicktipp.js";
import { Webhook } from "./src/webhook.js";
import "dotenv/config";

await Kicktipp.init({
  baseUrl: process.env.KICKTIPP_BASEURL,
  username: process.env.KICKTIPP_USERNAME,
  password: process.env.KICKTIPP_PASSWORD,
});

Webhook.subscribeToLeaderboard();
refreshSubsscriptionsTomorrowMorning();

function refreshSubsscriptionsTomorrowMorning() {
  const now = new Date();
  const morning = new Date();
  morning.setDate(now.getDate() + 1);
  morning.setHours(5);

  setTimeout(() => {
    Webhook.clearTimeouts();
    Webhook.subscribeToLeaderboard();
    refreshSubsscriptionsTomorrowMorning();
  }, morning - now);
}
