import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageProps, defaultLanguages } from '../interfaces/languages';
import { WordProps } from '../interfaces/word';
import { DictionaryStorageService } from '../services/dictionary-storage.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  get langFrom(): string {
    return this.state.langFrom;
  }
  get langTo(): string {
    return this.state.langTo;
  }

  get langFromText(): string | null {
    return this.state.langFromText;
  }

  get langToText(): string | null {
    return this.state.langToText;
  }

  src: string = null;
  expectedDist: string = null;

  answer = new FormControl('');

  private wordsStorage: WordProps[];

  constructor(
    private readonly state: StateService,
    private readonly dictionary: DictionaryStorageService
  ) {
    this.state.subscribeToSettings(settings => {
      this.reloadWordsStorage();
    });
    this.dictionary.subscribeToChanges(() => {
      this.reloadWordsStorage();
    });
    this.reloadWordsStorage();
  }

  ngOnInit(): void {
  }

  getRandomIndex(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private reloadWordsStorage = () => {
    this.wordsStorage = this.dictionary.getAllWords()
      .filter(pair => pair.langFrom === this.langFrom && pair.langTo === this.langTo);
    this.nextWordPair();
  }

  private nextWordPair = () => {
    this.answer.setValue('');
    if (this.wordsStorage.length === 0) {
      this.src = null;
      this.expectedDist = null;
      return;
    }
    const index = this.getRandomIndex(0, this.wordsStorage.length - 1);
    this.src = this.wordsStorage[index].src;
    this.expectedDist = this.wordsStorage[index].dist;
  }

  giveAnswer = () => {
    if ((this.answer.value as string).toLowerCase() === this.expectedDist.toLowerCase()) {
      alert(`Correct!`);
    } else {
      alert(`Wrong :-(\nExpected answer was: "${this.expectedDist}".`);
    }
    this.nextWordPair();
  }
}
