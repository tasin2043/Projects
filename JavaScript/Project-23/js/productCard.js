const productCard = (product) => {
  const { title, image, price, category, description, rating } = product;

  const htmlCode = `
    <div class="product">
    <h2>${title.length > 15 ? title.slice(0, 15) + "..." : title}</h2>
    <img src="${image}"/>
    <h3>${"Price: " + price}</h3>
    <h3>${"Category: " + category}</h3>
    <p> Details: ${
      description.length > 70 ? description.slice(0, 70) + "..." : description
    }</p>
    <h3>${"Count: " + rating.count}</h3>
    <h3>${"Rating: " + rating.rate}</h3>
    </div>
    `;
  return htmlCode;
};

export default productCard;
