// This is a polyfill to use window.fetch on older browsers
import 'whatwg-fetch';
import ky from 'ky';
import nestify from './utils/nestify';

const rosettaService = (id = '', { prefixUrl = '' }) => {
  const api = ky.extend({ prefixUrl });

  return {
    getNames: (culture = [], names = []) => api.get(`${id}/names`, {
      searchParams: {
        names: names.toString(),
        culture: culture.toString(),
      },
    }).then(data => nestify(data)),
    getCultures: () => api.get(`${id}/cultures`),
  };
};

module.exports = rosettaService;
