<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { $t } from '@/locales';
import { getMonthlyResolveCount, getTodayResolveCount, getTotalResolveCount } from '@/service/api/statistic';

defineOptions({
  name: 'CardData'
});

interface CardData {
  key: string;
  title: string;
  value: number;
  unit: string;
  color: {
    start: string;
    end: string;
  };
  icon: string;
}

const todayResolveCount = ref(0);
const totalResolveCount = ref(0);
const monthlyResolveCount = ref(0);

onMounted(async () => {
  const todayResolveCountResp = await getTodayResolveCount();
  const totalResolveCountResp = await getTotalResolveCount();
  const monthlyResolveCountResp = await getMonthlyResolveCount();
  if (todayResolveCountResp.data) {
    todayResolveCount.value = todayResolveCountResp.data;
  }
  if (totalResolveCountResp.data) {
    totalResolveCount.value = totalResolveCountResp.data;
  }
  if (monthlyResolveCountResp.data) {
    monthlyResolveCount.value = monthlyResolveCountResp.data;
  }
});

const cardData = computed(() => [
  {
    key: 'todayResolveCount',
    title: $t('page.home.todayResolveCount'),
    value: todayResolveCount.value,
    unit: '',
    color: {
      start: '#ec4786',
      end: '#b955a4'
    },
    icon: 'ic:outline-calendar-today'
  },
  {
    key: 'monthlyResolveCount',
    title: $t('page.home.monthlyResolveCount'),
    value: monthlyResolveCount.value,
    unit: '',
    color: {
      start: '#9a6de2',
      end: '#3d3291'
    },
    icon: 'ic:outline-calendar-month'
  },
  {
    key: 'totalResolveCount',
    title: $t('page.home.totalResolveCount'),
    value: todayResolveCount.value,
    unit: '',
    color: {
      start: '#865ec0',
      end: '#5144b4'
    },
    icon: 'iconoir:sigma-function'
  }
]);

interface GradientBgProps {
  gradientColor: string;
}

const [DefineGradientBg, GradientBg] = createReusableTemplate<GradientBgProps>();

function getGradientColor(color: CardData['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <!-- define component start: GradientBg -->
    <DefineGradientBg v-slot="{ $slots, gradientColor }">
      <div class="rd-8px px-16px pb-4px pt-8px text-white" :style="{ backgroundImage: gradientColor }">
        <component :is="$slots.default" />
      </div>
    </DefineGradientBg>
    <!-- define component end: GradientBg -->

    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-16px">{{ item.title }}</h3>
          <div class="flex justify-between pt-12px">
            <SvgIcon :icon="item.icon" class="text-32px" />
            <CountTo
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-30px text-white dark:text-dark"
            />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
