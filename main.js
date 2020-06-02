Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
    <div class="product-image">
      <img :src="image" :alt="description" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>

      <p>{{ sale }}</p>
      <product-details :details="details" ></product-details>


      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="variants color-box"
        :style="{ backgroundColor:variant.variantColor }"
        @mouseover="updateProduct(index)"
      ></div>

      <ul>
        <li v-for="size in sizes" :key="size.sizeId">{{ size.name }}</li>
      </ul>

      <button
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock}"
      >
        Add to Cart
      </button>
      <button v-on:click="removeFromCart" v-if="cart >= 1">Remove</button>

      <div class="cart">
        <p>Cart({{cart}})</p>
      </div>
    </div>
  </div>
    `,

  data() {
    return {
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
    };
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
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
  },
});
