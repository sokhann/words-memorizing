import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LanguageProps, defaultLanguages } from '../interfaces/languages';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly state: StateService) {
  }

  languages: LanguageProps[] = defaultLanguages;

  isValid = (c: AbstractControl) => {
    if (c.get('langFrom').value === c.get('langTo').value) {
      return { invalid: true };
    }
  }

  settingsForm = this.formBuilder.group({
    langFrom: [this.state.langFrom, Validators.required],
    langTo: [this.state.langTo, Validators.required],
  }, {
    validator: this.isValid
  });

  ngOnInit(): void {
  }

  saveSettings = () => {
    if (!this.settingsForm.valid) {
      return;
    }
    this.state.changeSettings(this.settingsForm.value);
  }
}
