export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const finalArray = [];

  for (let index = 0; index < array.length; index += chunkSize) {
    const chunk = array.slice(index, index + chunkSize);
    finalArray.push(chunk);
  }

  return finalArray;
}
