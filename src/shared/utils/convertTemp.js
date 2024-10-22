export const convertTemp = (temp, isCelsius) => {
  return isCelsius ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
};

export const convertMaxMinTemp = (tempObj, isCelsius) => {
  return {
    max: isCelsius
      ? Math.round(tempObj.max)
      : Math.round((tempObj.max * 9) / 5 + 32),
    min: isCelsius
      ? Math.round(tempObj.min)
      : Math.round((tempObj.min * 9) / 5 + 32),
  };
};
