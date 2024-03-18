<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import type { DataTableColumns, DataTableSortState, PaginationProps, SelectOption } from 'naive-ui';
import { formatISO } from 'date-fns';
import type { Api } from '@/typings/api';
import { $t } from '@/locales';
import { getWorkerStatisticInfo } from '@/service/api/statistic';

const data = ref<Api.Statistic.WorkerStatisticInfo[]>([]);
const loading = ref(false);

const columns: DataTableColumns = [
  {
    key: 'workerId',
    title: $t('page.worker.workerId')
  },
  {
    key: 'workerName',
    title: $t('page.worker.name')
  },
  {
    key: 'resolveCount',
    title: $t('page.statistic.resolveCount')
  }
];

const pagination = reactive({
  page: 1,
  itemCount: 0,
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

const sortingRef = ref('');

const selectOptions = reactive<SelectOption[]>([
  { label: $t('page.worker.workerId'), value: 'WorkerId' },
  { label: $t('page.worker.name'), value: 'WorkerName' }
]);

const date = new Date();
const startTimeRef = ref<string>(formatISO(date, { representation: 'date' }));
date.setMonth(date.getMonth() + 1);
const endTimeRef = ref<string>(formatISO(date, { representation: 'date' }));

const timeRangeRef = ref<[string, string]>([startTimeRef.value, endTimeRef.value]);

watch(timeRangeRef, ([startTime, endTime]) => {
  startTimeRef.value = startTime;
  endTimeRef.value = endTime;
});

onMounted(async () => {
  await fetchData(pagination.page, pagination.pageSize, startTimeRef.value, endTimeRef.value);
});

// eslint-disable-next-line max-params
async function fetchData(
  page: number,
  pageSize: number,
  startTime: string,
  endTime: string,
  sorting: string | null = '',
  filterField: string | null = '',
  filterValue: string | null = ''
) {
  loading.value = true;
  const params = {
    startTime,
    endTime,
    skipCount: (page - 1) * pageSize,
    maxResultCount: pageSize,
    sorting,
    filterField,
    filterValue
  };
  // fetch data from api
  const response = await getWorkerStatisticInfo(params);
  if (response.data) {
    data.value = response.data.items;
    pagination.itemCount = response.data.totalCount;
  }
  loading.value = false;
}

async function handlePageChange(currentPage: number) {
  await fetchData(currentPage, pagination.pageSize, startTimeRef.value, endTimeRef.value);
}

async function handlePageSizeChange(pageSize: number) {
  await fetchData(1, pageSize, startTimeRef.value, endTimeRef.value);
}

async function handleSorterChange(sorter: DataTableSortState | null) {
  if (sorter && sorter.order) {
    sortingRef.value = `${sorter.columnKey} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`;
  } else {
    sortingRef.value = '';
  }
  await fetchData(
    pagination.page,
    pagination.pageSize,
    startTimeRef.value,
    endTimeRef.value,
    filterFieldRef.value,
    filterValueRef.value
  );
}

async function handleRefresh() {
  await fetchData(
    pagination.page,
    pagination.pageSize,
    startTimeRef.value,
    endTimeRef.value,
    sortingRef.value,
    filterFieldRef.value,
    filterValueRef.value
  );
}

async function handleClearSearch() {
  filterFieldRef.value = null;
  filterValueRef.value = null;
  await fetchData(
    pagination.page,
    pagination.pageSize,
    startTimeRef.value,
    endTimeRef.value,
    sortingRef.value,
    filterFieldRef.value,
    filterValueRef.value
  );
}
</script>

<template>
  <div style="margin: theme('margin.4')">
    <n-grid cols="3" class="padding-10">
      <n-grid-item span="2">
        <n-flex>
          <n-date-picker v-model:formatted-value="timeRangeRef" type="daterange" date-format="yyyy-MM-dd" />
          <n-select
            v-model:value="filterFieldRef"
            :placeholder="$t('common.filterField')"
            :options="selectOptions"
            clearable
            class="w-200px"
          />
          <n-input v-model:value="filterValueRef" :placeholder="$t('common.filterValue')" style="width: 200px" />
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
        </n-flex>
      </n-grid-item>
    </n-grid>
    <n-data-table
      ref="table"
      remote
      :columns="columns"
      :data="data"
      :row-key="(rowData: Api.Statistic.WorkerStatisticInfo) => rowData.workerId"
      :loading="loading"
      :pagination="pagination as PaginationProps"
      @update:sorter="handleSorterChange"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
  </div>
</template>

<style scoped>
.padding-10 {
  padding: 10px 10px 10px 10px;
}
</style>
