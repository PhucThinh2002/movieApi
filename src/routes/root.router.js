import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger.js";
import datVeRouter from './datve.router.js';
import userRouter from './user.router.js';
import movieRouter from './movie.router.js';
import rapRouter from './rap.router.js';

const rootRouter = express.Router();

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get("/api-docs", (req, res) => {
  const urlNew = `${req.protocol}://${req.get(`host`)}`
  console.log({urlNew})

  const isUrl = swaggerDocument.servers.find((item) => { 
    const isFind = item.url === urlNew;
    return isFind;
  })

  if (!isUrl) {
    swaggerDocument.servers.unshift({
      url: urlNew,
      description: "server đang online"
    })
  }

  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  }) (req, res)
});
rootRouter.get(`/`, (request, response) => {
    response.json(`ok`);
});

rootRouter.use("/api/datve", datVeRouter);
rootRouter.use("/api/user", userRouter);
rootRouter.use("/api/movie", movieRouter);
rootRouter.use("/api/rap", rapRouter);


export default rootRouter;