export function getUrlParam(name) {
  const results = new RegExp(`[\?&]${name}=([^&#]*)`).exec(
    window.location.href
  );
  if (results) {
    return results[1] || 0;
  } else {
    return null;
  }
};
