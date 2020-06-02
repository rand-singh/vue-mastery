var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "./vmSocks-green-onWhite.jpg",
    inventory: 100,
    onSale: true,
    details: ["80% Cotton", "20% polyester", "Gender neutral"],
    variants: [
      {
        variandId: 2234,
        variantColor: "green",
      },
      {
        variantId: 2235,
        variantColor: "blue",
      },
    ],
    sizes: [
      {
        sizeId: 1,
        name: "small",
      },
      {
        sizeId: 2,
        name: "medium",
      },
      {
        sizeId: 3,
        name: "large",
      },
    ],
  },
});
