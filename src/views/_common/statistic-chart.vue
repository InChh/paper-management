<script setup lang="ts">
import VChart from 'vue-echarts';
import { onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getMonthlyResoveDetail } from '@/service/api/statistic';

use([TooltipComponent, TitleComponent, GridComponent, LineChart, BarChart, CanvasRenderer]);

const option = ref({
  title: {
    text: '网服月出单统计',
    left: 'center'
  },
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

async function updateChart() {
  const res = await getMonthlyResoveDetail();
  if (res.data) {
    const data = res.data;
    option.value.xAxis.data = data.map(item => new Date(item.date).toLocaleDateString());
    option.value.series[0].data = data.map(item => item.resolveCount);
    option.value.series[1].data = data.map(item => item.resolveCount);
  }
}

onMounted(async () => {
  await updateChart();
});
</script>

<template>
  <VChart class="chart" :option="option" autoresize />
</template>

<style scoped>
.chart {
  height: 400px;
}
</style>
