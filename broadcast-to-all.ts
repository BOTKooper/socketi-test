import Pusher from "pusher";

const APP_KEY = "yt1InTRZySIuQqHOJQ5zygHO";
const APP_ID = "jDfoMthaCWWMJtiZhMJXAU57";
const APP_SECRET = "Ys4666plbkwO8wtBCEQ4ajq7";
const HOST = "soketi.btk.sh";

const pusher = new Pusher({
  appId: APP_ID,
  key: APP_KEY,
  secret: APP_SECRET,
  encrypted: true,
  host: HOST,
});

let idx = 0;

setInterval(async () => {
  console.log(idx++, "pushing");
  pusher
    .trigger("channel-1", "test_event", { message: "hello world" })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("unexpected status");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}, 1000);