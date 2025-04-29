import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chalk from "chalk";

const app = express();
const port = 3000;

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(chalk.green("测试"));
  res.json({ data: "test" });
});

// @ts-expect-error
app.use((err, req, res, next) => {
  console.error(chalk.red("ERROR: "), err.stack);
  res.status(500).json({ message: "something broke!" });
});

app.listen(port, () => {
  console.log(chalk.green(`Server is running on port ${port}`));
});
