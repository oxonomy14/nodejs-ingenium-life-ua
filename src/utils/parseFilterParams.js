const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);
  
    if (isContactType(contactType)) return contactType;
  };
  
  const parseIsFavourite = (value) => {
    if (typeof value === 'string') {
      const val = value.toLowerCase().trim();
      if (val === 'true') return true;
      if (val === 'false') return false;
    }
  
    if (typeof value === 'boolean') return value;
  
    return null;
};
  
// const parseNumber = (number) => {
//     const isString = typeof number === 'string';
//     if (!isString) return;
  
//     const parsedNumber = parseInt(number);
//     if (Number.isNaN(parsedNumber)) {
//       return;
//     }
  
//     return parsedNumber;
//   };
  
  
  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;
  
      const parsedContactType = parseContactType(type);
      const parsedIsFavourite = parseIsFavourite(isFavourite);
    
  
    return {
        type: parsedContactType,
        isFavourite: parsedIsFavourite,
     
    };
};
  
