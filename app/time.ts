const onesTable: { [k: string]: string[] } = {
    'en': ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    'fr': ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'],
    'it': ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'],
};
const teensTable: { [k: string]: string[] } = {
    'en': ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    'fr': ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
    'it': ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'],
};
const tensTable: { [k: string]: string[] } = {
    'en': ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty'],
    'fr': ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante'],
    'it': ['', 'dieci', 'venti', 'trenta', 'quaranta', 'cinquanta'],
};
const weekdaysTable: { [k: string]: string[] } = {
    'en': ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    'fr': ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    'it': ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
};
const midnightTable: { [k: string]: string } = {
    'en': 'midnight',
    'fr': 'minuit',
    'it': 'mezzanotte',
};
const supportedLanguages: { [k: string]: boolean } = {
    'en': true,
    'fr': true,
    'it': true,
};
const defaultLanguage: string = 'en';

export function getDateInWordsInstance(is12h: boolean, date: Date, locale: string) {
    let language = locale.split('-')[0];
    if (!supportedLanguages[language]) {
        language = defaultLanguage;
    }
    if (is12h) {
        return new DateTimeInWords12h(date, language);
    }
    return new DateTimeInWords24h(date, language);
}

export class DateTimeInWords12h {
    protected pm: boolean;
    protected date: Date;
    protected language: string;

    constructor(date: Date, language: string) {
        this.date = date;
        this.pm = date.getHours() >= 12;
        this.language = language;
    }

    protected formatNumber(n: number): string {
        let units = n % 10;
        let tens = Math.floor(n / 10);
        if (units === 0) {
            return tensTable[this.language][tens];
        }
        switch (tens) {
            case 0:
                return onesTable[this.language][units];
            case 1:
                return teensTable[this.language][units];
        }
        if (this.language === 'fr' && units === 1) {
            return `${tensTable[this.language][tens]} et ${onesTable[this.language][units]}`;
        }
        if (this.language === 'it') {
            if (units === 3) {
                return `${tensTable[this.language][tens]}tré`;
            }
            if (units === 1 || units === 8) {
                return `${tensTable[this.language][tens].slice(0, -1)}${onesTable[this.language][units]}`;
            }
            return `${tensTable[this.language][tens]}${onesTable[this.language][units]}`;
        }
        return `${tensTable[this.language][tens]} ${onesTable[this.language][units]}`;
    }

    formatHours(): string {
        return this.formatNumber(this.date.getHours() % 12 || 12);
    }

    formatMinutes(): string {
        if (this.date.getMinutes() === 0) {
            return " ";
        }
        return this.formatNumber(this.date.getMinutes());
    }

    formatAmPm(): string {
        if (this.pm) {
            return "pm";
        }
        return "am";
    }

    formatWeekday(): string {
        return weekdaysTable[this.language][this.date.getDay()];
    }

    formatDate(): string {
        switch (this.language) {
            case 'fr':
            case 'it':
                return `${zeroPad(this.date.getDate())}/${zeroPad(this.date.getMonth() + 1)}`;
        }
        return `${this.date.getMonth() + 1}.${this.date.getDate()}`;
    }
}

export class DateTimeInWords24h extends DateTimeInWords12h {
    constructor(date: Date, language: string) {
        super(date, language);
    }

    formatHours(): string {
        return this.formatNumber(this.date.getHours()) || midnightTable[this.language];
    }

    formatMinutes(): string {
        if (this.date.getMinutes() === 0) {
            return " ";
        }
        return super.formatMinutes() + ".";
    }

    formatAmPm(): string {
        return "";
    }
}

function zeroPad(i: number): string {
    if (i < 10) {
        return `0${i}`
    }
    return `${i}`;
}
