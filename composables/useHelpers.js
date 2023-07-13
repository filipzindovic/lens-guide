export const useHelpers = () => {
  const validateValue = (list = [], value = '', returnFirstItem = false) => {
    const validValue = list?.find(item => item === value);

    if (validValue) { return validValue; }

    return returnFirstItem ? list?.[0] : '';
  };

  const filterListByNamedValue = (list = [], namedValue = '') => {
    return list?.filter((v, i, a) => a.findIndex(v2 => (v2[namedValue] === v[namedValue])) === i);
  };

  return {
    validateValue,
    filterListByNamedValue
  };
};
