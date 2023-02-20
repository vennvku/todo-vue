<template>
  <h1>Transaction Detail Page is the here</h1>
  <div v-if="transaction">
    <h1>ID: {{ $route.params.id }}</h1>
    <h3>Name: {{ transaction.name }}</h3>
    <p>Price: {{ transaction.price }}</p>
  </div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>Loading Transaction {{ $route.params.id }} ...</div>
</template>

<script>
import { ref } from "vue";

import { useRoute } from "vue-router";

export default {
  setup() {
    const transaction = ref(null);
    const error = ref(null);

    const route = useRoute();

    const fetchOne = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/transactions/" + route.params.id
        );

        if (!response.ok) throw new Error("Some thing went wrong");

        transaction.value = await response.json();
      } catch (err) {
        error.value = err;
        console.log(error.value);
      }
    };

    fetchOne();

    return { transaction, error };
  },
};
</script>
