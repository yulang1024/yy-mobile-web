<template>
  <a-button type="primary" @click="openModal">
    查看
  </a-button>

  <a-modal v-model:open="visible" title="详情" @ok="closeModal" width="90%" centered>
    <div class="ocr-view">
      <div class="image-container">
        <img :src="imageUrl">
      </div>
      <div class="json-viewer">
        <JsonViewer :value="jsonData" :expand-depth="3" copyable />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { httpClient } from '@/api/HttpRequest';
import { computed, ref } from 'vue';
import JsonViewer from 'vue-json-viewer';

const props = defineProps({
  imagePath: {
    type: String,
    default: '',
  },
  ocrResult: {
    type: String,
    default: '',
  },
});

const imageUrl = computed(() => {
  return httpClient.getFileUrl(props.imagePath);
});

const jsonData = computed(() => {
  if (props.ocrResult) {
    return JSON.parse(props.ocrResult);
  }

  return {};
});

const visible = ref(false);

function openModal() {
  visible.value = true;
}

function closeModal() {
  visible.value = false;
}
</script>

<style scoped>
.ocr-view {
  display: flex;
  gap: 20px;
  height: 70vh;
}

.image-container {
  width: 500px;
  height: 100%;
}

.image-container > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.json-viewer {
  flex: 1;
  overflow: auto;
  height: 100%;
}
</style>