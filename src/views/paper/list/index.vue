<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { PaginationProps } from 'naive-ui/es/pagination/src/Pagination';
import { createColumns } from '@/views/paper/list/columns';
import { getPaperList } from '@/service/api';
import type { Api } from '@/typings/api';

const data = ref<Api.Paper.PaperRecord[]>([]);
const loading = ref(false);

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }: { itemCount: number }) {
    return `共有 ${itemCount} 条数据.`;
  },
  showSizePicker: true,
  showQuickJumper: true,
  pageSizes: [10, 15, 20, 25, 30, 35, 40],
  onUpdatePage: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

onMounted(async () => {
  await fetchData(pagination.page, pagination.pageSize);
});

// eslint-disable-next-line max-params
async function fetchData(
  page: number,
  pageSize: number,
  sorting: string | undefined = undefined,
  filterField: string | undefined = undefined,
  filterValue: string | undefined = undefined
) {
  loading.value = true;
  const params = {
    skipCount: (page - 1) * pageSize,
    maxResultCount: pageSize,
    sorting,
    filterField,
    filterValue
  };
  // fetch data from api
  const response = await getPaperList(params);
  if (response.data) {
    data.value = response.data.items;
    pagination.pageCount = response.data.totalCount;
  }
  loading.value = false;
}

function handlePageChange(currentPage: number) {
  fetchData(currentPage, pagination.pageSize);
}

function handlePageSizeChange(pageSize: number) {
  fetchData(1, pageSize);
}

function handleSorterChange() {}

async function handleEdit() {}

async function handleDelete() {}
</script>

<template>
  <n-data-table
    ref="table"
    remote
    :columns="createColumns({ handleEdit, handleDelete })"
    :data="data"
    :row-key="(rowData: Api.Paper.PaperRecord) => rowData.id"
    :loading="loading"
    :pagination="pagination as PaginationProps"
    @update:sorter="handleSorterChange"
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange"
  />
</template>

<style scoped></style>
