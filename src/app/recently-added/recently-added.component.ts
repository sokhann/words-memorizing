import { Component, OnInit } from '@angular/core';
import { WordProps } from '../interfaces/word';
import { DictionaryStorageService } from '../services/dictionary-storage.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { StateService } from '../services/state.service';
import { VocabularyService } from '../services/vocabulary.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  title = 'Recently added words';
  words: WordProps[];

  get langFrom(): string {
    return this.state.langFrom;
  }
  get langTo(): string {
    return this.state.langTo;
  }

  get langFromText(): string | null {
    return this.state.langFromText;
  }

  wordToTranslate = new FormControl('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly state: StateService,
    private readonly vocabulary: VocabularyService,
    private readonly dictionary: DictionaryStorageService
  ) {
    this.dictionary.subscribeToChanges(() => {
      this.words = dictionary.getAllWords();
    });
    this.words = dictionary.getAllWords();
  }

  ngOnInit = () => {
  }

  removeWord = (record: WordProps) => {
    this.dictionary.remove(record);
  }

  translateWord = () => {
    this.vocabulary.translate(this.wordToTranslate.value, this.langFrom, this.langTo);
    this.wordToTranslate.setValue('');
  }
}
