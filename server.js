// Imported:
// dotenv to access variables in the .env file we created
// express and
// cors to build a RESTful api
// openai which is an sdk to make requests to openai

// Allowing us to access variables made in the .env file
import * as dotenv from 'dotenv';
dotenv.config();

// Importing openAI SDK 
import {Configuration, OpenAIApi} from 'openai';

// Applying api key in order to be able to use it
const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

// Initializing openAI SDK
const openai = new OpenAIApi(configuration);

// Importing framework for building web apps in nodeJS
import express from 'express';
import cors from 'cors';

// Middleware (code to apply to each request) amd cors (security mechanism)
const app = express();
app.use(cors());
// Tell API we want to handle incoming data in JSON format
app.use(express.json());

// Creating endpoint. Here, POST is best option since we are creating new piece of data
app.post('/dream', async (req, res) => {
    try{
        // Access the prompt (description of image user wants to generate)
        const prompt = req.body.prompt;

        // Pass on that data to the openAI API by calling the createImage method and passing the prompt as an argument
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        // Response object from the API that contains the image URL
        const image = aiResponse.data.data[0].url;

        // Now we want to send it back to the client as a response (as JSON format)
        res.send({ image });
    }
    catch(error){
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');

    }
});

// Starting the server. Start by running `node server.js` in terminal
app.listen(5173, () => console.log('make art on http://localhost:5173/dream'));