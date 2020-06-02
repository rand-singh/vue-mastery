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
      <button @click="removeFromCart" 
              >
            Remove from cart
            </button>


    </div>
    
    <product-review @review-submitted="addReview"></product-review>
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
          variantId: 2234,
          variantColor: "green",
          variantImage: "./vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./vmSocks-blue-onWhite.jpg",
          variantQuantity: 9,
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
      reviews: [],
    };
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        <p>

        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },

  methods: {
    onSubmit(e) {
      console.log("onsubmit", e);
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    },
  },
});
