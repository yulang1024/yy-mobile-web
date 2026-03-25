<template>
  <div class="module-page">
    <ModulePageTable
      :columns="columns"
      :queryData="queryData"
      :showPagination="true"
      :immediate="true">
    </ModulePageTable>
  </div>
</template>

<script setup>
import ModulePageTable from './ModulePageTable/index.vue';

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