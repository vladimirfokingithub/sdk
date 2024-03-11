import en from 'src/app/assets/i18n/en.json';
import ru from 'src/app/assets/i18n/ru.json';
import es from 'src/app/assets/i18n/es.json';
import pt from 'src/app/assets/i18n/pt.json';
import zh from 'src/app/assets/i18n/zh.json';
import uz from 'src/app/assets/i18n/uz.json';
import uk from 'src/app/assets/i18n/uk.json';
import tr from 'src/app/assets/i18n/tr.json';
import de from 'src/app/assets/i18n/de.json';
import fa from 'src/app/assets/i18n/fa.json';
import ar from 'src/app/assets/i18n/ar.json';
import it from 'src/app/assets/i18n/it.json';
import fr from 'src/app/assets/i18n/fr.json';
import id from 'src/app/assets/i18n/id.json';
import pl from 'src/app/assets/i18n/pl.json';
import ja from 'src/app/assets/i18n/ja.json';
import kk from 'src/app/assets/i18n/kk.json';
import ky from 'src/app/assets/i18n/ky.json';
import no from 'src/app/assets/i18n/no.json';

import { Locales } from 'src/models/locales';

export const i18nDictionary: Record<Locales, object> = {
    en: parseDictionary(en),
    ru: parseDictionary(ru),
    es: parseDictionary(es),
    pt: parseDictionary(pt),
    zh: parseDictionary(zh),
    uz: parseDictionary(uz),
    uk: parseDictionary(uk),
    tr: parseDictionary(tr),
    de: parseDictionary(de),
    fa: parseDictionary(fa),
    ar: parseDictionary(ar),
    it: parseDictionary(it),
    fr: parseDictionary(fr),
    id: parseDictionary(id),
    pl: parseDictionary(pl),
    ja: parseDictionary(ja),
    kk: parseDictionary(kk),
    ky: parseDictionary(ky),
    no: parseDictionary(no)
};

// replace '$key1.key2.key3' with it's value
function parseDictionary(dictionary: Record<string, unknown>): Record<string, unknown> {
    const refSymbol = '$';

    const iterate = (subDictionary: Record<string, unknown>): void => {
        Object.entries(subDictionary).forEach(([key, value]) => {
            if (typeof value === 'object' && value) {
                return iterate(value as Record<string, unknown>);
            }

            if (typeof value === 'string') {
                if (value[0] === refSymbol) {
                    const path = value.slice(1).split('.');
                    let obj: Record<string, unknown> = dictionary;
                    path.forEach(item => {
                        if (item in obj) {
                            obj = obj[item] as Record<string, unknown>;
                        } else {
                            throw new Error(
                                `Cannot parse translations: there is no property ${item} in translation`
                            );
                        }
                    });

                    subDictionary[key] = obj;
                }

                if (value.slice(0, 2) === `\\${refSymbol}`) {
                    subDictionary[key] = value.slice(1);
                }
            }
        });
    };

    iterate(dictionary);
    return dictionary;
}
