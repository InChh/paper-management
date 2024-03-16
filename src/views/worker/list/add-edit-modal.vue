<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue';
import type { FormInst, FormRules, SelectOption } from 'naive-ui';
import { NButton } from 'naive-ui';
import type { Api } from '@/typings/api';
import { $t } from '@/locales';
import { defaultWorker } from '@/constants/worker';
import { getUserList } from '@/service/api/user';

const props = withDefaults(
  defineProps<{
    worker?: Api.Worker.WorkerRecord;
    loading?: boolean;
  }>(),
  {
    worker: () => defaultWorker,
    loading: false
  }
);

const showModal = defineModel<boolean>('showModal', {
  default: false
});

const emit = defineEmits<{
  onAdd: [Api.Worker.WorkerRecord];
  onEdit: [Api.Worker.WorkerRecord];
}>();

let isEdit = false;

const workerRecord = ref<Api.Worker.WorkerRecord>(defaultWorker);

const buttonLoading = ref(false);

watch(
  () => props.worker,
  newVal => {
    workerRecord.value = newVal;
    isEdit = Boolean(newVal.userId);
  }
);

watch(
  () => props.loading,
  newVal => {
    buttonLoading.value = newVal;
  }
);

const userOptions = ref<SelectOption[]>([]);

const selectLoading = ref(false);
onMounted(async () => {
  await fetchUserOptions();
});
async function fetchUserOptions() {
  selectLoading.value = true;
  const res = await getUserList({
    skipCount: 0,
    maxResultCount: 200
  });
  if (res.data) {
    userOptions.value = res.data.items.map(item => ({
      label: `${item.username}`,
      value: item.id
    }));
  }
  selectLoading.value = false;
}

const rules: FormRules = {
  name: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.worker.name')
    })
  },
  userId: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.worker.userId')
    })
  },
  workerId: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.worker.workerId')
    })
  }
};

const formRef = ref<FormInst | null>(null);

function handlePositiveClick() {
  formRef.value?.validate(errors => {
    if (!errors) {
      const record = toRaw(workerRecord.value);
      if (isEdit) {
        emit('onEdit', record);
      } else {
        emit('onAdd', record);
      }
    }
  });
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="isEdit ? $t('common.edit') : $t('common.add')"
    :rules="rules"
  >
    <n-form ref="formRef" :model="workerRecord" :rules="rules">
      <n-form-item v-if="!isEdit" path="userId" :label="$t('page.worker.userId')">
        <n-select
          v-model:value="workerRecord.userId"
          :placeholder="$t('page.worker.userId')"
          :options="userOptions"
          :loading="selectLoading"
          filterable
          clearable
        ></n-select>
      </n-form-item>
      <n-form-item path="name" :label="$t('page.worker.name')">
        <n-input v-model:value="workerRecord.name" :placeholder="$t('page.worker.name')" />
      </n-form-item>
      <n-form-item v-if="!isEdit" path="workerId" :label="$t('page.worker.workerId')">
        <n-input-number v-model:value="workerRecord.workerId" :placeholder="$t('page.worker.workerId')" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-flex>
        <NButton type="default" @click="() => (showModal = false)">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" :loading="buttonLoading" @click="handlePositiveClick">
          {{ isEdit ? $t('common.edit') : $t('common.add') }}
        </NButton>
      </n-flex>
    </template>
  </n-modal>
</template>

<style scoped></style>
