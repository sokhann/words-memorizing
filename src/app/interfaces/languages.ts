export interface LanguageProps {
    readonly value: string;
    readonly viewValue: string;
}

export const en: LanguageProps = {
    value: 'en',
    viewValue: 'English',
};

export const ru: LanguageProps = {
    value: 'ru',
    viewValue: 'Russian',
};

export const defaultLanguages = [ en, ru ];
