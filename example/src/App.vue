<template>
  <div>
    <line-plotter
      :imageSource="imageSource"
      :lines="lines"
      :loading="loading"
      :handleDragStop="handleDragStop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import LinePlotter from "vue-plotting-ui-lib";
// import "vue-plotting-ui-lib/style.css";
import LinePlotter from "@snoofa-com/vue-plotting-ui-lib";
import "@snoofa-com/vue-plotting-ui-lib/style.css";

interface Line {
  y: number;
  color: string;
}

export default defineComponent({
  components: {
    LinePlotter,
  },
  setup() {
    const imageSource = ref("https://i.ibb.co/rZPcTY8/10000-1-IMG-01.jpg");
    const lines = ref<Line[]>([
      { id: "Start head", y: 2710, color: "red" },
      { id: "End head", y: 3102, color: "green" },
      { id: "Fhole mid", y: 1439, color: "blue" },
      { id: "Start body", y: 818, color: "black" },
      { id: "End body", y: 2198, color: "violet" },
    ]);
    const loading = ref(false);

    function handleDragStop() {
      console.log("Dragging stopped");
    }

    return {
      imageSource,
      lines,
      loading,
      handleDragStop,
    };
  },
});
</script>

<style scoped>
/* Add any specific styles for this example component */
</style>
