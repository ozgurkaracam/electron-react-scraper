module.exports = function (val) {
  return val
    .replaceAll('Ğ', 'g')
    .replaceAll('Ü', 'u')
    .replaceAll('Ş', 's')
    .replaceAll('I', 'i')
    .replaceAll('İ', 'i')
    .replaceAll('Ö', 'o')
    .replaceAll('Ç', 'c')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ı', 'i')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .toLowerCase();
};
