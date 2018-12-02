export default (phrase, ...variables) => {
  if (!variables.length) return phrase;

  let formattedPhrase = phrase;

  const t = typeof variables[0];
  const args = (t === 'string' || t === 'number')
    ? Array.prototype.slice.call(variables)
    : variables[0];

  Object.keys(args)
    .forEach((key) => {
      const regex = new RegExp(`\\{${key}\\}`, 'gi');

      formattedPhrase = phrase.replace(regex, args[key]);
    });

  return formattedPhrase;
};
