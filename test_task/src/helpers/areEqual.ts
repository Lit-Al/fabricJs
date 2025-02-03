// функция для сравнения ссылочных типов
export const areEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
