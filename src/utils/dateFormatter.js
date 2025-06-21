const toISOString = (data, fields) => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => toISOString(item, fields));
  }

  const newItem = { ...data };
  for (const field of fields) {
    if (newItem[field]) {
      newItem[field] = new Date(newItem[field]).toISOString();
    }
  }
  return newItem;
};

module.exports = {
  toISOString,
}; 