import Router from "express-promise-router";
import bodyParser from "body-parser";
import { truncate, throttle } from "lodash";
import prettyBytes from "pretty-bytes";

const startedAt = new Date();

const muscle = [];
const printArgh = throttle(() => {
  console.log(`Pumping, araarrgh! (${prettyBytes(muscle.length)})`);
}, 1000);

const fillMuscle = () => {
  for (let i = 0; i < 100000; i += 1) muscle.push(1);
  printArgh();
};

const brainsThink = () => {
  const interval = setInterval(() => {
    for (let i = 0; i < 50; i += 1) {
      let j = 0;
      while (j < 10000000) {
        j += 1 + Math.random();
      }
    }
  }, 1);

  setTimeout(() => {
    clearInterval(interval);
    console.log(`Done thinking at ${new Date()}!`);
  }, 10000);
};

export default (storage, commit) => {
  const router = Router({ mergeParams: true });
  router.get("/version", (_, res) => {
    res.status(200).json({
      commit,
      startedAt,
      namespace: process.env.NAMESPACE || "unknown",
      podUid: process.env.POD_UID || "unknown",
      podName: process.env.POD_NAME || "unknown",
      podIp: process.env.POD_IP || "unknown",
      hostIp: process.env.HOST_IP || "unknown",
    });
  });

  router.get("/healthy", (_, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  router.get("/suicide", (_, res) => {
    console.log("Good bye, cruel world :'(");
    res.redirect("/");
    process.exit(666);
  });

  router.get("/pumpup", (_, res) => {
    res.redirect("/");
    setInterval(fillMuscle, 100);
  });

  router.get("/think", (_, res) => {
    res.redirect("/");
    setTimeout(brainsThink, 100);
  });

  router.post("/thing", bodyParser.text({ type: "*/*" }), (req, res) => {
    storage.set("thing", truncate(req.body)).then(() => res.send(req.body));
  });

  router.get("/thing", (_, res) => {
    storage.get("thing").then((thing) => res.send(thing));
  });

  router.post("/hero", (req, res) => {
    storage.set("heroName", req.body.heroName).then(() => res.redirect("/"));
  });

  return router;
};
