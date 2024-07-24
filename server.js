import mongoose from "mongoose";
import { app } from "./app.js";
export const server = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "subscription",
  });
  console.log("Database connected to ", process.env.MONGO_URI);
  app.listen(process.env.PORT || 8000);
  console.log("Server running at port", process.env.PORT);
};
server();
