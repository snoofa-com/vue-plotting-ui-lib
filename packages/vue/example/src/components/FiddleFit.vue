<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Panzoom, { type PanzoomObject } from '@panzoom/panzoom'

type Line = {
  y: number;
  color: string;
};

type Props = {
  imageSource: string;
  measurements: Line[];
  onSaveClick: (lines: Line[]) => void
};

const { measurements } = defineProps<Props>()

const lines = ref(measurements)
const isDragging = ref(false)
const offsetY = ref(0)
const selectedLineIndex = ref(-1)

let panzoom: PanzoomObject

onMounted(() => {
  panzoom = Panzoom(
    document.querySelector('.image-container') as HTMLElement,
    {
      minScale: 1,
      maxScale: 100,
      contain: 'outside',
      excludeClass: "line"
    },
  )
})

function zoomIn() {
  panzoom?.zoomIn();
}

function zoomOut() {
  panzoom?.zoomOut();
}

function reset() {
  panzoom?.reset();
}

function startDragging(event: MouseEvent, index: number) {
  isDragging.value = true
  selectedLineIndex.value = index
  offsetY.value = event.clientY - lines.value[index].y
}

function handleDrag(event: MouseEvent) {
  if (isDragging.value && selectedLineIndex.value !== -1) {
    lines.value[selectedLineIndex.value].y = event.clientY - offsetY.value
  }
}

function stopDragging() {
  isDragging.value = false
  selectedLineIndex.value = -1
}
</script>

<template>
  <div class="toolbar">
    <button @click="zoomIn">
      +
    </button>
    <button @click="zoomOut">
      -
    </button>
    <button @click="reset">
      Reset
    </button>
    <button @click="onSaveClick(lines)">
      Save
    </button>
  </div>
  <div class="panzoom-parent">
    <div class="image-container" @mousemove="handleDrag" @mouseup="stopDragging">
      <img :src="imageSource" />
      <svg class="line-container">
        <line class="line" v-for="(line, index) in lines" :key="index" :y1="line.y" :y2="line.y" x1="0" x2="100%"
          :stroke="line.color" @mousedown="startDragging($event, index)" />
      </svg>
    </div>
  </div>

</template>

<style scoped>
.image-container {
  position: relative;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px;
}

.line-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line {
  cursor: ns-resize;
}
</style>
