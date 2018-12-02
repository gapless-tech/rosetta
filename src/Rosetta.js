import { merge, get } from 'lodash';
import formatPhraseWithVariables from './utils/format-phrase-with-variables';
import rosettaService from './rosetta-service';

export default class Rosetta {
  constructor({
    cultureCodes = [],
    clientId = '',
    contentService = rosettaService,
  } = {}, names) {
    // eslint-disable-next-line
    this.cultureCode = cultureCodes[0];
    this.phrasesByCultureCode = {};
    this.contentService = contentService(clientId);
    this.fetchNames(cultureCodes, names);
  }

  async fetchNames(cultureCodes, names) {
    try {
      const phrasesByCultureCode = await this.contentService.getNames(cultureCodes, names);
      this.phrasesByCultureCode = merge(this.phrasesByCultureCode, phrasesByCultureCode);
    } catch (error) {
      throw new Error('[GAPLESS] Something went wrong at Rosetta.fetchNames');
    }
  }

  getPhrases() {
    return this.phrasesByCultureCode[this.cultureCode];
  }

  translate(name, { placeholder, ...variables } = {}) {
    const phrase = get(this.getPhrases(), name, placeholder);

    return formatPhraseWithVariables(phrase, variables) || name;
  }

  namespace(name) {
    const space = get(this.getPhrases(), name);

    if (typeof space !== 'object') {
      throw new Error('[GAPLESS] Namespace should be an object.');
    }

    return space;
  }
}
