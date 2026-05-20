export const tField = (field, locale) => {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[locale] ?? field.en ?? '';
};
