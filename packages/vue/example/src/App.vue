<script setup lang="ts">
import FiddleFit from 'vue-plotting-ui-lib'
import "vue-plotting-ui-lib/style.css"

const measurements = [
  { y: 2, color: "blue" }, { y: 57, color: "red" },
  { y: 491, color: "green" }, { y: 667, color: "yellow" }
]
</script>

<template>
  <FiddleFit image-source="https://furtadosbeta.gumlet.io/media/catalog/product/2/0/208079_1_1.jpg"
    :measurements="measurements" :on-save-click="(lines) => console.log(lines)" />
</template>
