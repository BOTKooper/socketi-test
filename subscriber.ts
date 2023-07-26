import PusherClient from "pusher-js";

const APP_KEY = "yt1InTRZySIuQqHOJQ5zygHO";
const HOST = "soketi.btk.sh";

let total_connections = 0;
let total_msg = 0;

let disconnectedCb = () => {
  total_connections--;
}

let globalBinding = (e) => {
  if(e[0] == 'p') return;
  total_msg++;
}

const connect = () => {
  return new Promise((resolve, reject) => {
    let pusherClient = new PusherClient(APP_KEY, {
      wsHost: HOST,
      wsPort: 80,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      cluster: "mt1"
    });
    pusherClient.connection.bind("connected", () => {
      total_connections++;
      resolve(pusherClient);
    });
    pusherClient.connection.bind("disconnected", disconnectedCb)
    
    pusherClient.connect();
    
    const channel = pusherClient.subscribe("channel-1");
    channel.bind_global(globalBinding)
  });
};

const launch = async (amount: number) => {
  // const BATCH_SIZE = amount;
  const BATCH_SIZE = 250;
  const arr = Array(BATCH_SIZE).fill(0);

  for (let i = 0; i < amount / BATCH_SIZE; i++) {
    await Promise.allSettled(arr.map(() => connect()));
  }
};

launch(10_000);

setInterval(() => {
  console.log("---");
  console.log("connections", total_connections);
  console.log("total_msg", total_msg);
}, 1000);
