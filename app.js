import express from "express"
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";


const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use('/api/blog', blogRouter),

mongoose.connect('mongodb+srv://sagoresarker1:<password>@blog.dlkq4pp.mongodb.net/?retryWrites=true&w=majority').then(app.listen(5000)).then(console.log('Connected with DB and rn of 5000')).catch((error)=> console.log(error))

// app.use("/api", (req, res, next) => {
//     res.send("Hello World");
// })

// app.listen(5000)

