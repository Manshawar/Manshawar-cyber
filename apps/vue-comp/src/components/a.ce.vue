<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>
<template>
  <div>
    <h1>test</h1>
    <div>
      {{ count }}
    </div>
    <button @click="count++">add</button>
  </div>
</template>
