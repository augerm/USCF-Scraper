import axios from 'axios';
import {JSDOM } from 'jsdom';

export class USCFScraper {
  constructor() {}
  static async getPlayer(id: string) {
    console.log(id);
    const { data: uscfPageHtml } = await axios.post('http://www.uschess.org/msa/thin.php', `memid=${id}&mode=Lookup`, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
    const {window} = new JSDOM(uscfPageHtml);
    const ratingRegex = /\d*(?=\*)/;
    const regRating = (window.document.getElementsByName('rating1')[0] as HTMLInputElement).value.match(ratingRegex)?.[0];
    const quickRating = (window.document.getElementsByName('rating2')[0] as HTMLInputElement).value.match(ratingRegex)?.[0];
    const blitzRating = (window.document.getElementsByName('rating3')[0] as HTMLInputElement).value.match(ratingRegex)?.[0];
    return {
      regRating: Number(regRating),
      quickRating: Number(quickRating),
      blitzRating: Number(blitzRating),
    };
  }
}