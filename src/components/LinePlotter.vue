<template>
  <div class="line-plotter">
    <div class="panzoom-parent">
      <div
        ref="imageContainer"
        class="panzoom"
        @mousemove="handleDrag"
        @mouseup="stopDragging"
      >
        <img :src="imageSource" />
        <div class="line-container">
          <hr
            class="line"
            v-for="(line, index) in lines"
            :key="index"
            :style="{
              top: `${line.y / scaleConstantReversed}px`,
              borderColor: line.color,
              cursor: `${loading ? 'all-scroll' : 'ns-resize'}`,
            }"
            @mousedown="startDragging($event, index)"
          />
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
      <button @click="resetZoom">Reset Zoom</button>
    </div>
    <div class="color-box-container">
      <color-box
        v-for="(line, index) in lines"
        :key="index"
        :item="line"
      ></color-box>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Panzoom from "@panzoom/panzoom";
import ColorBox from "./ColorBox.vue";

export default {
  components: {
    ColorBox,
  },
  props: {
    imageSource: {
      type: String,
      required: true,
    },
    lines: {
      type: Array,
      required: true,
    },
    handleDragStop: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const REAL_HEIGHT = 3648;
    const RENDERED_HEIGHT = 600;
    const SCALE_CONSTANT = RENDERED_HEIGHT / REAL_HEIGHT;
    const isDragging = ref(false);
    const offsetY = ref(0);
    const selectedLineIndex = ref(-1);
    const imageContainer = ref(null);
    const currentScale = ref(1); // Track the current scale
    let panzoom;

    onMounted(() => {
      if (imageContainer.value) {
        panzoom = Panzoom(imageContainer.value, {
          excludeClass: "line",
          contain: "outside",
          startScale: 0.5,
        });

        // Update current scale when zooming
        imageContainer.value.addEventListener("panzoomzoom", (event) => {
          currentScale.value = event.detail.scale;
        });
      }
    });

    function startDragging(event, index) {
      isDragging.value = true;
      selectedLineIndex.value = index;
      offsetY.value =
        event.clientY -
        props.lines[index].y * (currentScale.value * SCALE_CONSTANT);
    }

    function handleDrag(event) {
      if (
        isDragging.value &&
        selectedLineIndex.value !== -1 &&
        !props.loading
      ) {
        props.lines[selectedLineIndex.value].y =
          (event.clientY - offsetY.value) /
          (currentScale.value * SCALE_CONSTANT);
      }
    }

    function stopDragging() {
      isDragging.value = false;
      selectedLineIndex.value = -1;

      if (props.handleDragStop) {
        props.handleDragStop();
      }
    }

    function zoomIn() {
      if (panzoom) {
        panzoom.zoomIn();
      }
    }

    function zoomOut() {
      if (panzoom) {
        panzoom.zoomOut();
      }
    }

    function resetZoom() {
      if (panzoom) {
        panzoom.reset();
        currentScale.value = 1;
      }
    }

    const linesJson = computed(() => {
      return JSON.stringify(props.lines, null, 2);
    });

    return {
      isDragging,
      offsetY,
      selectedLineIndex,
      imageContainer,
      startDragging,
      handleDrag,
      stopDragging,
      linesJson,
      zoomIn,
      zoomOut,
      resetZoom,
      scaleConstantReversed: 1 / SCALE_CONSTANT,
    };
  },
};
</script>

<style scoped>
.panzoom-parent {
  overflow: hidden;
  width: 400px;
  height: 600px;
}

.panzoom {
  width: 100%;
  height: 100%;
}

.panzoom img {
  width: 100%;
  height: 100%;
}

.line-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.line {
  border: 1px solid red;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.controls button:nth-child(2) {
  margin-left: 5px;
  margin-right: 5px;
}

.color-box-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.line-plotter {
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
