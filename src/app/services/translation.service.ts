import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translated = new Subject<{
    src: string,
    dist: string,
    langFrom: string,
    langTo: string,
  }>();

  constructor() { }

  translate = (word: string, langFrom: string, langTo: string) => {
    fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=${langFrom}|${langTo}`)
      .then(r => r.json())
      .then(j => {
        this.translated.next({
          src: word,
          dist: j.responseData.translatedText.toLowerCase(),
          langFrom,
          langTo
        });
      });
  }

  doSubscribe = (callback: (record: {
    src: string,
    dist: string,
    langFrom: string,
    langTo: string,
  }) => any) => {
    this.translated.subscribe(callback);
  }
}
