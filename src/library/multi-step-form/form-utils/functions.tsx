export const getAsObjectFromSession = (index) => {
    try {
      const serializedData = sessionStorage.getItem(index);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (err) {
      return err;
    }
  };
  export const saveObjectInSession = (key, value) => {
    try {
      const serializedData = JSON.stringify(value);
      sessionStorage.setItem(key, serializedData);
    } catch (err) {
      return err;
    }
  };