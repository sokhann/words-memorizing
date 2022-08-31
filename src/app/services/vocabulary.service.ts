import { Injectable } from '@angular/core';
import { DictionaryStorageService } from './dictionary-storage.service';
import { TranslationService } from './translation.service';
import { Subject } from 'rxjs';
import {WordProps} from '../interfaces/word';
@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  words: WordProps[];

  private targetWord = new Subject<{
    word: string,
    langFrom: string,
    langTo: string,
  }>();

  constructor(
    private readonly translation: TranslationService,
    private readonly dictionaryStorage: DictionaryStorageService
  ) {
    this.targetWord.subscribe(({word, langFrom, langTo}) => {
      translation.translate(word, langFrom, langTo);
    });
    this.dictionaryStorage.subscribeToChanges(() => {
      this.words = dictionaryStorage.getAllWords();
    });
    this.translation.doSubscribe(record => this.dictionaryStorage.saveOrUpdate(record));
    this.words = dictionaryStorage.getAllWords();
  }

  translate = (word: string, langFrom: string, langTo: string) => {
    const existed = this.words.find(w => w.src === word);

    if (existed) {
      alert('Already in the dictionary');
    } else {
      this.targetWord.next({
        word,
        langFrom,
        langTo,
      });
    }
  }
}
