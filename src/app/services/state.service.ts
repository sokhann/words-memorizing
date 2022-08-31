import {Inject, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {defaultLanguages, en, ru, LanguageProps} from '../interfaces/languages';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private static Key = 'settings';

  private settings = new Subject<{
    langFrom: string,
    langTo: string,
  }>();

  private currentSettings: { langFrom: string, langTo: string } =
    this.localStorage?.getItem(StateService.Key)
      ? JSON.parse(this.localStorage?.getItem(StateService.Key))
      : { langFrom: en.value, langTo: ru.value };

  languages: LanguageProps[] = defaultLanguages;

  get langFrom(): string {
    return this.currentSettings.langFrom;
  }

  get langTo(): string {
    return this.currentSettings.langTo;
  }

  get langFromText(): string | null {
    const lang = this.languages.filter(language => language.value === this.langFrom);
    return lang.length > 0
      ? lang[0].viewValue
      : null;
  }

  get langToText(): string | null {
    const lang = this.languages.filter(language => language.value === this.langTo);
    return lang.length > 0
      ? lang[0].viewValue
      : null;
  }

  constructor(@Inject('LOCALSTORAGE') private localStorage: Storage) {
    this.settings.subscribe((settings: { langFrom: string, langTo: string }) => {
      this.currentSettings = settings;
    });
  }

  subscribeToSettings = (
    onChange: (_: { langFrom: string, langTo: string }) => any) =>
  {
    this.settings.subscribe(onChange);
  }

  changeSettings = (settings: { langFrom: string, langTo: string }) => {
    this.localStorage.setItem(StateService.Key, JSON.stringify(settings));
    this.settings.next(settings);
  }
}
