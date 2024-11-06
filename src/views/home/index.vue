<script setup lang="ts">
import HeaderBanner from '@/views/home/modules/head-banner.vue';
import CardData from '@/views/home/modules/card-data.vue';
import StatisticTable from '@/views/_common/statistic-table.vue';
import StatisticChart from '@/views/_common/statistic-chart.vue';
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <CardData />
    <NCard :title="$t('page.statistic.title')">
      <n-flex vertical>
        <StatisticTable />
        <StatisticChart />
      </n-flex>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
