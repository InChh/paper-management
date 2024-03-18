<script setup lang="ts">
import HeaderBanner from '@/views/home/modules/head-banner.vue';
import CardData from '@/views/home/modules/card-data.vue';
import StatisticTable from '@/views/_common/statistic-table.vue';
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <CardData />
    <NCard>计划在此处整合李磊开发的排班系统</NCard>
    <NCard :title="$t('page.statistic.title')">
      <StatisticTable />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
