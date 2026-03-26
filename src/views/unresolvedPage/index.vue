<template>
  <div>
    <PageModule
      :columns="columns"
      :queryData="apiGetUnresolvedPage">
    </PageModule>
  </div>
</template>

<script setup>
import PageModule from '@/components/PageModule/index.vue';
import { apiGetUnresolvedPage } from '@/api';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '图片',
    prop: 'imagePath',
    type: 'image',
  },
  {
    title: 'ocr',
    dataIndex: 'ocrResult',
    key: 'ocrResult',
  },
];

</script>