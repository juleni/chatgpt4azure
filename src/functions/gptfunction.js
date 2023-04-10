const { app } = require("@azure/functions");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-ojql3EuWWGlyDCe09ZOog6l2",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.http("gptfunction", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const { messages } = await request.json();
    context.log(messages);

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

    return { jsonBody: { completion: completion.data.choices[0].message } };
  },
});
