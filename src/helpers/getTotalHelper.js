const getTotalHelper = (items) => items.reduce(function (accumulator, item) {
  return accumulator + item.price;
}, 0);

export default getTotalHelper;