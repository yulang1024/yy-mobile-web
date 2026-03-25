<template>
  <div>
    <ModulePage
      :columns="columns"
      :queryData="apiGetUnresolvedPage">
    </ModulePage>
  </div>
</template>

<script setup>
import ModulePage from '@/components/ModulePage/index.vue';
import { apiGetUnresolvedPage } from '@/api';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

</script>