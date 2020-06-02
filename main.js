var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    selectedVariant: 0,
    inventory: 100,
    onSale: false,
    strikeClass: "strike",
    details: ["80% Cotton", "20% polyester", "Gender neutral"],
    variants: [
      {
        variandId: 2234,
        variantColor: "green",
        variantImage: "./vmSocks-green-onWhite.jpg",
        variantQuantity: 10,
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
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
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.cart -= 1;
    },
  },

  computed: {
    title() {
      //   return this.brand + " " + this.product;
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return `${this.brand} ${this.product} are on sale!`;
      }
    },
  },
});
