const onesTable: {[k: string]: string[]} = {
    'en': ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    'fr': ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf']
};
const teensTable: {[k: string]: string[]} = {
    'en': ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    'fr': ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
};
const tensTable: {[k: string]: string[]} = {
    'en': ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty'],
    'fr': ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante']
};
const weekdaysTable: {[k: string]: string[]} = {
    'en': ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    'fr': ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
};
const midnightTable: {[k: string]: string} = {
    'en': 'midnight',
    'fr': 'minuit'
};

export function getDateInWordsInstance(is12h: boolean, date: Date, locale: string) {
    if (is12h) {
        return new DateTimeInWords12h(date, locale);
    }
    return new DateTimeInWords24h(date, locale);
}

export class DateTimeInWords12h {
    protected pm: boolean;
    protected date: Date;
    protected language: string;

    constructor(date: Date, language:string) {
        this.date = date;
        this.pm = date.getHours() >= 12;
        this.language = language.split('-')[0];
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
        return `${tensTable[this.language][tens]} ${onesTable[this.language][units]}`;
    }

    formatHours(): string {
        return this.formatNumber(this.date.getHours() % 12 || 12);
    }

    formatMinutes(): string {
        if(this.date.getMinutes() === 0) {
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
        if (this.language == 'fr') {
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
