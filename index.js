import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-ojql3EuWWGlyDCe09ZOog6l2",
  apiKey: "",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { messages } = req.body;
  console.log(JSON.stringify(messages));

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are DesignGPT helpful assistant universal chatbot",
      },
      ...messages,
      //{ role: "user", content: `${message}` },
    ],
  });

  res.json({ completion: completion.data.choices[0].message });
});

app.listen(port, () => {
  console.log(`Listening at http://locathost:${port}`);
});
