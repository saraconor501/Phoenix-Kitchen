const filterByCategory = (items, category) => {
    return items.filter((item) => item.category.includes(category));
  };
  
  export default filterByCategory;
  