import { app } from "./app.js";
import { dbConnection } from "./config/db.js";
const port = process.env.PORT || 9000;

console.log(port);

dbConnection().then(() => {
    app.listen(port, () => {
        console.log(`App is running on ${port}`);
      });
}).catch(err => {
    console.log(err)
})


