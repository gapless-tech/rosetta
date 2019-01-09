const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// eslint-disable-next-line
export default (id) => ({
  // eslint-disable-next-line
  getNames: async (cultureCodes, names) => {
    await sleep(300);

    return {
      'en-US': {
        BREAD: {
          ROOT: 'bread',
          CORN: 'corn bread',
          CROISSANT: 'croissant',
        },
        BUTTER: 'butter',
        TOASTER: 'toaster',
      },
      'pt-PT': {
        BREAD: {
          ROOT: 'pão',
          CORN: 'broa',
          CROISSANT: 'croissant',
        },
        BUTTER: 'manteiga',
        TOASTER: 'torradeira',
      },
    };
  },
  getCultures: async () => {
    await sleep(300);

    return [
      'pt-PT',
      'pt-BR',
      'en-GB',
      'en-US',
      'en-CA',
      'es-ES',
      'es-MX',
      'fr-FR',
      'fr-CA',
    ];
  },
});
