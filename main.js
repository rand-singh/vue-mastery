const eventBus = new Vue();

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

    <product-tabs :reviews="reviews"></product-tabs>


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

  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
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

        <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        
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

        <p>Would you recommend this product?</p>
        <p>                    
            <label for="yes">yes</label><br>
            <input type="radio" id="yes" name="recommend" value="yes" v-model="recommend">

            <label for="no">no</label><br>
            <input type="radio" id="no" name="recommend" value="no" v-model="recommend">            
        </p>

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
      recommend: null,
      errors: [],
    };
  },

  methods: {
    onSubmit() {
      console.log(this.recommend);
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        this.errors.length = 0;

        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("recommend opinion required.");
      }
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
        <span class="tab"
            :class="{activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab"
            >{{ tab }}</span>

        <div v-show="selectedTab === 'Reviews'" style="width: 100%">
            <p v-if="!reviews.length">There are no reviews yet.</p>        
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>{{ review.recommend }}</p>
                </li>
            </ul>
        </div>
        
        <product-review v-show="selectedTab === 'Submit a review'"></product-review>
    </div>
    
    `,
  data() {
    return {
      tabs: ["Reviews", "Submit a review"],
      selectedTab: "Reviews",
    };
  },
  methods: {},
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
