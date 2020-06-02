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
        variantImage: "./vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./vmSocks-blue-onWhite.jpg",
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
    cart: 0,
  },

  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    },
    removeFromCart() {
      this.cart -= 1;
    },
  },
});
