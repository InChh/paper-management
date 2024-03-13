<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import type { PaginationProps } from 'naive-ui/es/pagination/src/Pagination';
import type { SelectOption } from 'naive-ui';
import { createColumns } from '@/views/paper/list/columns';
import { createPaper, deletePaper, getPaperList, updatePaper } from '@/service/api';
import type { Api } from '@/typings/api';
import { $t } from '@/locales';
import { PaperStatus, defaultPaper } from '@/constants/paper';
import AddEditModal from '@/views/paper/list/add-edit-modal.vue';

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

const filterFieldRef = ref<string | null>(null);

const filterValueRef = ref<string | null>(null);

watch(filterFieldRef, newValue => {
  pagination.page = 1;
  if (newValue === 'Status') {
    filterValueRef.value = PaperStatus.Unprocessed as unknown as string;
  } else {
    filterValueRef.value = '';
  }
});

const sortingRef = ref('');

const selectOptions = reactive<SelectOption[]>([
  { label: $t('page.paper.name'), value: 'Name' },
  { label: $t('page.paper.phoneNumber'), value: 'PhoneNumber' },
  { label: $t('page.paper.workerId'), value: 'WorkerId' },
  { label: $t('page.paper.status'), value: 'Status' }
]);

onMounted(async () => {
  await fetchData(pagination.page, pagination.pageSize);
});

// eslint-disable-next-line max-params
async function fetchData(
  page: number,
  pageSize: number,
  sorting: string | null = '',
  filterField: string | null = '',
  filterValue: string | null = ''
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

const paperRecord = ref<Api.Paper.PaperRecord>(defaultPaper);
const showModal = ref(false);

async function showAddModal() {
  paperRecord.value = defaultPaper;
  showModal.value = true;
}

async function showEditModal(paper: Api.Paper.PaperRecord) {
  paperRecord.value = { ...paper };
  showModal.value = true;
}

async function handleAdd(paper: Api.Paper.PaperRecord) {
  await createPaper({
    ...paper
  });
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value, filterFieldRef.value, filterValueRef.value);
}

async function handleEdit(paper: Api.Paper.PaperRecord) {
  await updatePaper(paper.id, {
    ...paper
  });
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value, filterFieldRef.value, filterValueRef.value);
}

async function handleDelete(id: string) {
  await deletePaper(id);
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value, filterFieldRef.value, filterValueRef.value);
}

async function handleRefresh() {
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value, filterFieldRef.value, filterValueRef.value);
}

async function handleClearSearch() {
  filterFieldRef.value = null;
  filterValueRef.value = null;
  await fetchData(pagination.page, pagination.pageSize, sortingRef.value, filterFieldRef.value, filterValueRef.value);
}
</script>

<template>
  <div style="margin: theme('margin.4')">
    <n-grid cols="3" class="padding-10">
      <n-grid-item></n-grid-item>
      <n-grid-item>
        <n-flex justify="center">
          <n-select
            v-model:value="filterFieldRef"
            :placeholder="$t('common.filterField')"
            :options="selectOptions"
            clearable
            class="w-200px"
          />
          <n-radio-group v-if="filterFieldRef === 'Status'" v-model:value="filterValueRef">
            <n-radio :value="PaperStatus.Processed">{{ $t('page.paper.statusEnum.processed') }}</n-radio>
            <n-radio :value="PaperStatus.Unprocessed">{{ $t('page.paper.statusEnum.unprocessed') }}</n-radio>
            <n-radio :value="PaperStatus.Deprecated">{{ $t('page.paper.statusEnum.deprecated') }}</n-radio>
          </n-radio-group>
          <n-input v-else v-model:value="filterValueRef" :placeholder="$t('common.filterValue')" style="width: 200px" />
          <n-button type="primary" @click="handleRefresh">
            {{ $t('common.search') }}
          </n-button>
          <n-button type="primary" @click="handleClearSearch">
            {{ $t('common.clear') }}
          </n-button>
        </n-flex>
      </n-grid-item>
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
      ref="table"
      remote
      :columns="createColumns({ handleEdit: showEditModal, handleDelete })"
      :data="data"
      :row-key="(rowData: Api.Paper.PaperRecord) => rowData.id"
      :loading="loading"
      :pagination="pagination as PaginationProps"
      @update:sorter="handleSorterChange"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
    <AddEditModal v-model:show-modal="showModal" :paper="paperRecord" @on-add="handleAdd" @on-edit="handleEdit" />
  </div>
</template>

<style scoped>
.padding-10 {
  padding: 10px 10px 10px 10px;
}
</style>
