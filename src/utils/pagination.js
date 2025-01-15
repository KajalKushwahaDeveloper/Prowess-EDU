export const paginate = (data, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };
  
  export const calculateTotalPages = (data, pageSize) => {
    return Math.ceil(data.length / pageSize);
  };
  