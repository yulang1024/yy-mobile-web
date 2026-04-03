<template>
  <div class="module-page-table">
    <a-table
      :dataSource="tableData"
      :columns="columns"
      :pagination="showPagination ? pagination : false"
    >
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const tableData = ref([]);

const pagination = reactive({
  position: 'bottomCenter',
  pageSize: 10,
  current: 1,
  total: 0,
});

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  /**
   * 查询数据
   * @type {Function}
   */
  queryData: {
    type: Function,
  },

  columns: {
    type: Array,
    default: () => [],
  },

  /**
   * 是否显示分页
   * @type {Boolean}
   */
  showPagination: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否立即查询
   * @type {Boolean}
   */
  immediate: {
    type: Boolean,
    default: true,
  },
});

onMounted(() => {
  if (props.immediate) {
    executeQueryData();
  }
});

async function executeQueryData() {
  if (typeof props.queryData === 'function') {
    const res = await props.queryData();

    if (props.showPagination) {
      const { data, total } = res;
      tableData.value = data || res || []; // TODO
      pagination.total = total;
    } else {
      tableData.value = res || [];
    }
  } else {
    throw new Error('queryData must be a function, but got ' + typeof props.queryData);
  }
}
</script>
