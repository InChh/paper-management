<script setup lang="ts">
import VChart from 'vue-echarts';
import { onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getMonthlyResoveDetail } from '@/service/api/statistic';
import { $t } from '../../locales';

use([TooltipComponent, TitleComponent, GridComponent, LineChart, BarChart, CanvasRenderer]);

const option = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    interval: 1
  },
  series: [
    {
      name: '出单数量',
      type: 'bar',
      data: [] as number[],
      barMaxWidth: 30
    },
    {
      name: '出单数量',
      type: 'line',
      data: [] as number[],
      tooltip: {
        show: false
      }
    }
  ]
});
const now = new Date();
const timestamp = ref(new Date(now.getFullYear(), now.getMonth(), 1).getTime());

async function updateChart(year: number, month: number) {
  const res = await getMonthlyResoveDetail(year, month);
  if (res.data) {
    const data = res.data;
    option.value.xAxis.data = data.map(item => new Date(item.date).toLocaleDateString());
    option.value.series[0].data = data.map(item => item.resolveCount);
    option.value.series[1].data = data.map(item => item.resolveCount);
  }
}

async function handleDateUpdate(newValue: number) {
  const date = new Date(newValue);
  await updateChart(date.getFullYear(), date.getMonth() + 1);
}

onMounted(async () => {
  await updateChart(now.getFullYear(), now.getMonth() + 1);
});
</script>

<template>
  <n-flex vertical align="center" justify="around">
    <n-h2>{{ $t('page.home.chartTitle') }}</n-h2>
    <n-date-picker
      v-model:value="timestamp"
      type="month"
      format="y年M月"
      year-format="y年"
      month-format="M月"
      :on-update-value="handleDateUpdate"
    />
    <VChart class="chart" :option="option" autoresize />
  </n-flex>
</template>

<style scoped>
.chart {
  height: 400px;
}
</style>
