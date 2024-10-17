export default (code, { description, fix, ...extras } = {}) => {
  const message = description ? `${code}: ${description}` : code;
  const e = new Error(message);
  e.code = code;

  if (description) {
    e.description = description;
  }
  if (fix) {
    e.fix = fix;
  }
  for (const key in extras) {
    e[key] = extras[key];
  }
  throw e;
};
