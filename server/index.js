const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const { OpenAI } = require('openai')
const PORT = 3000
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.DEEP_SEEK_API_KEY,
});

async function FetchAIResponse(prompt,data) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'deepseek/deepseek-chat-v3-0324:free',
            messages: [
                data,
                { role: 'system', content: 'You are a helpful assistant. Respond in valid HTML format inside a <div> tag. Do not use Markdown. Do not ask for feedback. No CSS required .No h1,h2 tag is allowed. you can use bold,italic,links'},
                { role: 'user', content: prompt,},
            ],
        });

        if (
            completion &&
            completion.choices &&
            completion.choices.length > 0 &&
            completion.choices[0].message &&
            completion.choices[0].message.content
          ) {
            return completion.choices[0].message.content;
          }else if (completion.error && completion.error.code === 429) {
            return "⚠️ Rate limit exceeded. Please try again later or upgrade your plan.";
          } else {
            console.error("Unexpected API completion format", completion);
            return "Sorry, I couldn't generate a response.";
          }
    } catch (error) {
        console.error('Error:', error);
        return "Error to load content"
    }
}

app.post('/api/response', async (req,res) =>{
    const { prompt,data } = req.body
    const response = await FetchAIResponse(prompt,data)
    res.json(response)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})