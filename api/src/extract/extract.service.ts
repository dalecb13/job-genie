import { Injectable } from '@nestjs/common';
import ollama from 'ollama/browser';

const technologiesPrompt = (input: string) =>
  `Your task is to extract technologies from the following job description. The job description is written in HTML and it will follow after two newlines. Your response is a comma-separated list of the names; be thorough and list all technologies. If you don't find technology names in the description or you are not sure, return [\"NA\"].\n\nJob Description:\n${input}`;

@Injectable()
export class ExtractService {
  async extractTechnologies(description: string) {
    try {
      // const extractResponse = await fetch(
      //   'http://localhost:11434/api/generate',
      //   {
      //     method: 'POST',
      //     // headers: {
      //     //   'Content-Type': 'application/json',
      //     // },
      //     body: JSON.stringify({
      //       prompt: technologiesPrompt(description),
      //       stream: false,
      //     }),
      //   },
      // );
      const extractResponse = await ollama.generate({
        model: 'llama3.1',
        prompt: technologiesPrompt(description),
        stream: false,
        // messages: [{ role: 'user', content: 'Why is the sky blue?' }],
      });

      // console.log(extractResponse);

      const response = extractResponse.response;

      console.log(response);

      return response;
    } catch (error) {
      console.warn(error);
      throw error;
    }

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:11434/api/generate',
    //   data: {
    //     prompt: technologiesPrompt(description),
    //     stream: false,
    //   },
    //   responseType: 'stream',
    // })
    //   .then((response) => {
    //     const reader = new TextDecoder();

    //     response.data.on('data', (chunk) => {
    //       const text = reader.decode(chunk);
    //       const json = JSON.parse(text);
    //       process.stdout.write(json.response);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
