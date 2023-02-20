<template>
  <h1>Transactions is here...</h1>
  <div v-if="transactions.length" class="list-transaction">
    <div class="item" v-for="transaction in transactions" :key="transaction.id">
      <router-link
        :to="{
          name: 'transaction-detail-route',
          params: { id: transaction.id },
        }"
        >{{ transaction.name }}</router-link
      >
      <div class="price">Price: {{ transaction.price }}</div>
    </div>
  </div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>Loading Transactions</div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const transactions = ref([]);
    const error = ref(null);

    const fetchAll = async () => {
      try {
        const response = await fetch("http://localhost:3000/transactions");

        if (!response.ok) throw new Error("Some thing went wrong");

        transactions.value = await response.json();
      } catch (err) {
        error.value = err;
        console.log(error.value);
      }
    };

    fetchAll();

    return { transactions, error };
  },
};
</script>

<style scoped>
.list-transaction {
}

.list-transaction .item {
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  display: flex;
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
  height: 60px;
  line-height: 60px;
  margin-bottom: 15px;
}

.list-transaction .item a {
  text-decoration: none;
  color: #979cb0;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.64px;
  margin-left: 12px;
  margin-right: 20px;
}

.list-transaction .item .price {
  color: #35d8ac;
  font-weight: 700;
  font-size: 25px;
}
</style>
