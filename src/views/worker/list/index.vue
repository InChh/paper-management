<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { PaginationProps } from 'naive-ui/es/pagination/src/Pagination';
import type { DataTableSortState } from 'naive-ui';
import { createColumns } from '@/views/worker/list/columns';
import { createWorker, deleteWorkerByUserId, getWorkerList, updateWorker } from '@/service/api';
import type { Api } from '@/typings/api';
import { $t } from '@/locales';
import { defaultWorker } from '@/constants/worker';
import AddEditModal from '@/views/worker/list/add-edit-modal.vue';

const data = ref<Api.Worker.WorkerRecord[]>([]);
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

const sortingRef = ref('');

onMounted(async () => {
  await fetchData(pagination.page, pagination.pageSize);
});

// eslint-disable-next-line max-params
async function fetchData(page: number, pageSize: number, sorting: string | null = '') {
  loading.value = true;
  const params = {
    skipCount: (page - 1) * pageSize,
    maxResultCount: pageSize,
    sorting
  };

  const response = await getWorkerList(params);
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

function handleSorterChange(sorter: DataTableSortState | null) {
  if (sorter && sorter.order) {
    sortingRef.value = `${sorter.columnKey} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`;
  } else {
    sortingRef.value = '';
  }
  fetchData(pagination.page, pagination.pageSize, sortingRef.value);
}

const workerRecord = ref<Api.Worker.WorkerRecord>(defaultWorker);
const showModal = ref(false);
const modalLoading = ref(false);

async function showAddModal() {
  workerRecord.value = defaultWorker;
  showModal.value = true;
}

async function showEditModal(worker: Api.Worker.WorkerRecord) {
  workerRecord.value = worker;
  showModal.value = true;
}

async function handleAdd(worker: Api.Worker.WorkerRecord) {
  modalLoading.value = true;
  await createWorker({
    ...worker
  });
  modalLoading.value = false;
  showModal.value = false;
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value);
}

async function handleEdit(worker: Api.Worker.WorkerRecord) {
  modalLoading.value = true;
  await updateWorker(worker.userId!, {
    ...worker
  });
  modalLoading.value = false;
  showModal.value = false;
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value);
}

async function handleDelete(id: string) {
  await deleteWorkerByUserId(id);
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value);
}

async function handleRefresh() {
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value);
}
</script>

<template>
  <div style="margin: theme('margin.4')">
    <n-grid cols="3" class="padding-10">
      <n-grid-item></n-grid-item>
      <n-grid-item></n-grid-item>
      <n-grid-item>
        <n-flex justify="end">
          <n-button @click="handleRefresh">
            <svg-icon icon="material-symbols:refresh" />
          </n-button>
          <n-button type="primary" @click="showAddModal">{{ $t('common.add') }}</n-button>
        </n-flex>
      </n-grid-item>
    </n-grid>
    <n-data-table
      remote
      :columns="createColumns({ handleEdit: showEditModal, handleDelete })"
      :data="data"
      :row-key="(rowData: Api.Worker.WorkerRecord) => rowData.userId!"
      :loading="loading"
      :pagination="pagination as PaginationProps"
      @update:sorter="handleSorterChange"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
    <AddEditModal
      v-model:show-modal="showModal"
      :worker="workerRecord"
      :loading="modalLoading"
      @on-add="handleAdd"
      @on-edit="handleEdit"
    />
  </div>
</template>

<style scoped>
.padding-10 {
  padding: 10px 10px 10px 10px;
}
</style>
