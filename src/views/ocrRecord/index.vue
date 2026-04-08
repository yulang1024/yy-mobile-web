<template>
  <div>
    <PageModule :columns="columns" :queryData="apiGetOcrRecordPage">
    </PageModule>
  </div>
</template>

<script setup lang="jsx">
import PageModule from '@/components/PageModule/index.vue';
import { apiGetOcrRecordPage } from '@/api';
import OCRView from '@/components/OCRView/index.vue';

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
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    customRender: ({ text, record, index, column }) => {
      return <OCRView imagePath={record.imagePath} ocrResult={record.ocrResult} />;
    },
  },
];
</script>
