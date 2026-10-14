const L = { debug: 0, info: 1, warn: 2, error: 3 };
const CUR = __DEV__ ? L.debug : L.info;
const P = '[VectorFin]';
export const logger = {
  debug: (m: string, ...a: any[]) => CUR <= L.debug && console.log(P, 'DEBUG', m, ...a),
  info:  (m: string, ...a: any[]) => CUR <= L.info  && console.log(P, 'INFO', m, ...a),
  warn:  (m: string, ...a: any[]) => CUR <= L.warn  && console.warn(P, 'WARN', m, ...a),
  error: (m: string, ...a: any[]) => CUR <= L.error && console.error(P, 'ERROR', m, ...a),
};
