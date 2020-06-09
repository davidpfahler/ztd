export const updateArray = <T> (arr: T[], el: T, newEl: T): T[] => {
  if (!arr.includes(el)) {
    throw Error('Cannot update: Element not in array.');
  }
  const i = arr.indexOf(el);
  return [...arr.slice(0, i), newEl, ...arr.slice(i+1, arr.length)];
}