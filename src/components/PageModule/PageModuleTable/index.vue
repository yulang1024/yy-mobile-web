<template>
  <div class="page-module-table">
    <a-table
      :dataSource="tableData"
      :columns="computedColumns"
      :pagination="showPagination ? pagination : false"
    >
    </a-table>
  </div>
</template>

<script setup lang="jsx">
import { httpClient } from '@/api/HttpRequest';
import { computed, onMounted, reactive, ref } from 'vue';

const tableData = ref([]);

const pagination = reactive({
  position: ['bottomCenter'],
  current: 1,
  pageSize: 10,
  total: 0,
  showQuickJumper: true,
  showSizeChanger: true,
  onChange: (page, pageSize) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    executeQueryData();
  },
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

/** 计算 column */
const computedColumns = computed(() => {
  return props.columns.map((column) => {
    let customRender = column.customRender;

    if (column.type === 'image') {
      console.log(column);
      customRender = ({ text, record, index, column }) => {
        const filePath = record[column.prop];
        const imageUrl = httpClient.getFileUrl(filePath);
        return <img src={imageUrl} width={100} height={100} style={{ objectFit: 'contain' }} />;
      };
    }

    return {
      key: column.dataIndex,
      customRender,
      ...column,
    };
  });
});

onMounted(() => {
  if (props.immediate) {
    executeQueryData();
  }
});

function getQueryParams() {
  return {
    current: pagination.current,
    size: pagination.pageSize,
  };
}

async function executeQueryData() {
  if (typeof props.queryData === 'function') {
    const queryParams = getQueryParams();
    const res = await props.queryData(queryParams);

    if (props.showPagination) {
      const { records, total } = res;
      tableData.value = records || [];
      pagination.total = total;
    } else {
      tableData.value = res || [];
    }
  } else {
    throw new Error('queryData must be a function, but got ' + typeof props.queryData);
  }
}
</script>
