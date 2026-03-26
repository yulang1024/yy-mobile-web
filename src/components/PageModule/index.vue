<template>
  <div class="page-module">
    <PageModuleTable
      :columns="columns"
      :queryData="queryData"
      :showPagination="true"
      :immediate="true">
    </PageModuleTable>
  </div>
</template>

<script setup>
import PageModuleTable from './PageModuleTable/index.vue';

defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  queryData: {
    type: Function,
  },
});
</script>
