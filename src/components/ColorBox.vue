<template>
  <div class="color-box">
    <div class="color-box-box" :style="{ backgroundColor: item.color }"></div>
    <div class="color-box-label">{{ itemName }}</div>
    <div class="color-box-measurement">{{ value }} px</div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ColorBox",
  props: {
    item: Object,
  },
  setup(props) {
    const itemName = computed(() => {
      return props.item.id;
    });
    const value = computed(() => Math.round(props.item.y));
    return {
      itemName,
      value,
    };
  },
};
</script>

<style scoped>
.color-box {
  color: white;
  text-align: center;
  display: flex;
  color: black;
  gap: 10px;
  align-items: center;
}

.color-box-box {
  width: 10px;
  height: 10px;
}

.color-box-label {
  width: 70px;
  text-align: start;
}
.color-box-measurement {
  width: 65px;
  text-align: start;
}
</style>
