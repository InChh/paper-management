<script setup lang="ts">
import { h, onMounted, reactive, ref, watch } from 'vue';
import type { DataTableColumns, DataTableSortState, PaginationProps, SelectOption } from 'naive-ui';
import { NInput } from 'naive-ui';
import { formatISO } from 'date-fns';
import * as XLSX from 'xlsx-js-style';
import XLSX_SAVER from 'file-saver';
import type { Api } from '@/typings/api';
import { $t } from '@/locales';
import { getWorkerStatisticInfo } from '@/service/api/statistic';
import { getWorkerList } from '@/service/api';

interface SalaryInfo extends Api.Statistic.WorkerStatisticInfo {
  dutyCount: number;
  salary: number;
}

const data = ref<SalaryInfo[]>([]);
const loading = ref(false);

const columns: DataTableColumns<SalaryInfo> = [
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
  },
  {
    key: 'dutyCount',
    title: $t('page.statistic.dutyCount'),
    render(_, index) {
      return h(
        NInput,
        {
          value: data.value[index].dutyCount.toString(),
          style: { width: '100px' },
          onUpdateValue: newValue => {
            if (/^\d+$/.test(newValue)) {
              data.value[index].dutyCount = Number(newValue);
              data.value[index].salary = data.value[index].dutyCount * 21 + data.value[index].resolveCount * 25;
            }
          }
        },
        {
          default: () => h('span', data.value[index].dutyCount)
        }
      );
    }
  },
  {
    key: 'salary',
    title: $t('page.statistic.salary')
  }
];

watch(data, () => {
  data.value.forEach(item => {
    item.salary = item.dutyCount * 16 + item.resolveCount * 21;
  });
});

const pagination = reactive({
  page: 1,
  itemCount: 0,
  pageSize: 35,
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

const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth(), 1);
const startTimeRef = ref<string>(formatISO(date, { representation: 'date' }));
date.setDate(now.getDate());
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
  const workerListResponse = await getWorkerList({
    skipCount: 0,
    maxResultCount: 50
  });
  if (workerListResponse.data) {
    // 获取在队队员列表
    const workers = workerListResponse.data.items.filter(item => item.isOnDuty);
    const response = await getWorkerStatisticInfo(params);
    if (response.data) {
      data.value = workers.map(item => {
        const statistic = response.data.items.find(s => s.workerId === item.workerId);
        return {
          workerName: item.name!,
          workerId: item.workerId!,
          resolveCount: statistic?.resolveCount ?? 0,
          dutyCount: 4,
          salary: 0
        };
      });
      pagination.itemCount = workers.length;
    }
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  // eslint-disable-next-line no-bitwise
  for (let i = 0; i !== s.length; i += 1) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

function exportToExcel(exportData: any[], fileName: string) {
  // 创建工作簿
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  // 设置表头格式
  Object.keys(worksheet).forEach(key => {
    // 这里遍历单元格给单元格对象设置属性,s为控制样式的属性
    if (!key.includes('!')) {
      if (key === 'A1' || key === 'B1' || key === 'C1' || key === 'D1' || key === 'E1') {
        worksheet[key].s = {
          alignment: {
            // 对齐方式
            horizontal: 'center', // 水平居中
            vertical: 'center', // 竖直居中
            wrapText: true // 自动换行
          },
          font: {
            name: '黑体',
            bold: true,
            sz: '13'
          },
          fill: {
            fgColor: { rgb: 'FFFFCC00' }
          }
        };
      } else {
        worksheet[key].s = {
          alignment: {
            // 对齐方式
            horizontal: 'center', // 水平居中
            vertical: 'center', // 竖直居中
            wrapText: true // 自动换行
          },
          font: {
            name: '黑体',
            sz: '13'
          }
        };
      }
    }
  });

  worksheet['!cols'] = [{ wpx: 70 }, { wpx: 70 }, { wpx: 70 }, { wpx: 70 }, { wpx: 70 }];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 导出 Excel 文件
  const wbout = XLSX.write(workbook, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  XLSX_SAVER.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    `${fileName}.xlsx`
  );
}

async function handleExport() {
  // 导出Excel文件
  const exportData = data.value.map(item => ({
    工号: item.workerId,
    姓名: item.workerName,
    出单数: item.resolveCount,
    值班数: item.dutyCount,
    工资: item.salary
  }));
  exportToExcel(exportData, `网服队员工资表-${new Date(startTimeRef.value).getMonth() + 1}月`);
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
          <NInput v-model:value="filterValueRef" :placeholder="$t('common.filterValue')" style="width: 200px" />
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
          <n-button type="primary" @click="handleExport">导出</n-button>
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
      :row-key="(rowData: SalaryInfo) => rowData.workerId"
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
