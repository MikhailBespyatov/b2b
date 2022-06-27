export const calculatePercent = (amount: number, num: number) => {
  return Math.round(Number((num / amount).toFixed(2)) * 100);
};

export const toSelectOptions = <T extends unknown>(
  array: T[],
  valueKey: keyof T,
  textKey: keyof T
) => {
  return array.map((item: T) => {
    return {
      value: item[valueKey],
      text: item[textKey]
    };
  });
};

export const toFullDate = (date: string) => date.split('T')
.slice(0, 1)
.join('')
.split('-')
.reverse()
.join('.')
