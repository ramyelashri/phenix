// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json(
    {
      "type": "product",
      "products": [
        {
          "id": 97162,
          "title": "Amy's Cheese Pizza, Made with Organic Flour &amp; Tomatoes, Single Serve, 6.2-Ounce",
          "image": "https://spoonacular.com/productImages/97162-312x231.jpg",
          "imageType": "jpg"
        },
        {
          "id": 102130,
          "title": "Home Run Inn Classic Sausage &amp; Pepperoni Personal Pizza, 8.75 oz",
          "image": "https://spoonacular.com/productImages/102130-312x231.jpg",
          "imageType": "jpg"
        },
        {
          "id": 112187,
          "title": "Palermo's® Pizzeria Medium Crust Hand Tossed Style Pepperoni Pizza 21.00 oz. Box",
          "image": "https://spoonacular.com/productImages/112187-312x231.jpg",
          "imageType": "jpg"
        },
        {
          "id": 407740,
          "title": "Doreens Sausage Pizza 12 / 28 Oz",
          "image": "https://spoonacular.com/productImages/407740-312x231.jpg",
          "imageType": "jpg"
        },
        {
          "id": 426814,
          "title": "Casa Visco - Sauce - Organic Pizza , 16 Oz",
          "image": "https://spoonacular.com/productImages/426814-312x231.jpg",
          "imageType": "jpg"
        }
      ],
      "offset": 0,
      "number": 5,
      "totalProducts": 1356,
      "processingTimeMs": 57,
      "expires": 1623252320902
    }
  )
}
