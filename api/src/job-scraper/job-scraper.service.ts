import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JobScraperService {
  async scrape(jobDescriptionLink: string) {
    const scrapeResult = await axios.get(jobDescriptionLink, {
      responseType: 'document',
    });
    console.log(scrapeResult);
  }
}
