function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function capitalizeWords(str: string): string {
  if (!str) return '';
  return str.split(' ').map(capitalizeFirst).join(' ');
}

export const StringUtils = {
  capitalizeFirst,
  capitalizeWords,
};
