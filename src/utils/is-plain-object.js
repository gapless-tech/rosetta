export default t => !!t
  && (typeof t === 'object')
  && Object.prototype.toString.call(t) === '[object Object]';
