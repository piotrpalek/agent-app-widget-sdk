export const getQueryParams = () =>
  location.search
    .replace(/^\?/, '')
    .split('&')
    .map(pair => pair.split('=').map(decodeURIComponent))
    .reduce((params, [param, value]) => {
      params[param] = value;
      return params;
    }, {});

export const getQueryParam = name => {
  const queryParams = getQueryParams();
  return queryParams[name] !== undefined ? queryParams[name] : null;
};

export const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
