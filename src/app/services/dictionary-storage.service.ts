import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WordProps } from '../interfaces/word';
import { onlyUnique } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  private static Key = 'words';

  private get records(): WordProps[] {
    const arrStr = this.localStorage.getItem(DictionaryStorageService.Key);
    const arr = arrStr === null
      ? []
      : JSON.parse(arrStr);
    return arr;
  }

  private changed = new Subject<void>();

  constructor(@Inject('LOCALSTORAGE') private localStorage: Storage) { }

  saveOrUpdate = (record: WordProps) => {
    this.check(record);
    const array = this.records;
    array.push(record);
    this.localStorage.setItem(DictionaryStorageService.Key, JSON.stringify(array));
    this.changed.next();
  }

  remove = (record: WordProps) => {
    const arr = this.records.filter(
      rec => !(rec.langFrom === record.langFrom && rec.langTo === record.langTo && rec.src === record.src && rec.dist === record.dist)
    );
    this.localStorage.setItem(DictionaryStorageService.Key, JSON.stringify(arr));
    this.changed.next();
  }

  getAllWords: () => WordProps[] = () => {
    return this.records;
  }

  subscribeToChanges = (onChange: () => any) => {
    this.changed.subscribe(onChange);
  }

  private check = (record: WordProps) => {
    if (!record.langFrom || !record.langTo || !record.src || !record.dist) {
      throw new Error('The given word pair is malformed.');
    }
  }
}
