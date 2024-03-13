<script setup lang="ts">
import { computed, h, onMounted, ref, toRaw, watch } from 'vue';
import type { FormInst, FormRules, SelectOption } from 'naive-ui';
import { NButton } from 'naive-ui';
import type { Api } from '@/typings/api';
import { PaperStatus, defaultPaper } from '@/constants/paper';
import { getWorkerList } from '@/service/api';
import { $t } from '@/locales';

const props = withDefaults(
  defineProps<{
    paper?: Api.Paper.PaperRecord;
  }>(),
  {
    paper: () => defaultPaper
  }
);

const showModal = defineModel<boolean>('showModal', {
  default: false
});

const emit = defineEmits<{
  onAdd: [Api.Paper.PaperRecord];
  onEdit: [Api.Paper.PaperRecord];
}>();

const isEdit = computed(() => Boolean(props.paper.id));

const paperRecord = ref<Api.Paper.PaperRecord>(defaultPaper);

const deviceType = ref('');
const systemType = ref('');

watch(
  () => props.paper,
  newVal => {
    paperRecord.value = newVal;
    if (newVal.problemType.split(',').length === 2) {
      systemType.value = newVal.problemType.split(',')[0];
      deviceType.value = newVal.problemType.split(',')[1];
    } else {
      systemType.value = '';
      deviceType.value = '';
    }
  }
);
const workerOptions = ref<SelectOption[]>([]);

const selectLoading = ref(false);

onMounted(async () => {
  await fetchWorkerOptions();
});

async function fetchWorkerOptions() {
  selectLoading.value = true;
  const res = await getWorkerList({
    skipCount: 0,
    maxResultCount: 50
  });
  if (res.data) {
    workerOptions.value = res.data.items.map(item => ({
      label: `${item.name}(${item.workerId})`,
      value: item.workerId
    }));
  }
  selectLoading.value = false;
}

const rules: FormRules = {
  name: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.name')
    })
  },
  phoneNumber: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.phoneNumber')
    })
  },
  address: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.address')
    })
  },
  systemType: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.systemType')
    })
  },
  deviceType: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.deviceType')
    })
  },
  problemDescription: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.problemDescription')
    })
  },
  receiverId: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.receiverName')
    })
  },
  status: {
    required: true,
    message: $t('common.fieldRequiredMessage', {
      field: $t('page.paper.status')
    })
  }
};

const formRef = ref<FormInst | null>(null);

function handlePositiveClick() {
  formRef.value?.validate(errors => {
    if (!errors) {
      const record = toRaw(paperRecord.value);
      record.problemType = `${systemType.value},${deviceType.value}`;
      if (isEdit.value) {
        emit('onEdit', record);
      } else {
        emit('onAdd', record);
      }
      showModal.value = false;
    }
  });
}

const action = () => [
  h(
    NButton,
    {
      onClick: () => {
        showModal.value = false;
      }
    },
    () => $t('common.cancel')
  ),
  h(
    NButton,
    {
      type: 'primary',
      onClick: handlePositiveClick
    },
    () => (isEdit.value ? $t('common.edit') : $t('common.add'))
  )
];
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="isEdit ? $t('common.edit') : $t('common.add')"
    :rules="rules"
    :positive-text="isEdit ? $t('common.edit') : $t('common.add')"
    :negative-text="$t('common.cancel')"
    :action="action"
    @positive-click="handlePositiveClick"
  >
    <n-form ref="formRef" :model="paperRecord" :rules="rules">
      <n-form-item path="name" :label="$t('page.paper.name')">
        <n-input v-model:value="paperRecord.name" :placeholder="$t('page.paper.name')" />
      </n-form-item>
      <n-form-item path="phoneNumber" :label="$t('page.paper.phoneNumber')">
        <n-input v-model:value="paperRecord.phoneNumber" :placeholder="$t('page.paper.phoneNumber')" />
      </n-form-item>
      <n-form-item path="address" :label="$t('page.paper.address')">
        <n-input v-model:value="paperRecord.address" :placeholder="$t('page.paper.address')" />
      </n-form-item>
      <n-form-item
        :validation-status="deviceType ? 'success' : 'error'"
        :feedback="
          $t('common.fieldRequiredMessage', {
            field: $t('page.paper.deviceType')
          })
        "
        :label="$t('page.paper.systemType')"
      >
        <n-radio-group v-model:value="systemType">
          <n-radio value="win11">win11</n-radio>
          <n-radio value="win10">win10</n-radio>
          <n-radio value="win8">win8</n-radio>
          <n-radio value="xp\win7">xp\win7</n-radio>
          <n-radio value="macos">macos</n-radio>
          <n-radio value="android">android</n-radio>
          <n-radio value="ios">ios</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item
        :validation-status="deviceType ? 'success' : 'error'"
        :feedback="
          $t('common.fieldRequiredMessage', {
            field: $t('page.paper.deviceType')
          })
        "
        :label="$t('page.paper.deviceType')"
      >
        <n-radio-group v-model:value="deviceType">
          <n-radio :value="$t('page.paper.deviceTypeEnum.pc')">{{ $t('page.paper.deviceTypeEnum.pc') }}</n-radio>
          <n-radio :value="$t('page.paper.deviceTypeEnum.laptop')">
            {{ $t('page.paper.deviceTypeEnum.laptop') }}
          </n-radio>
          <n-radio :value="$t('page.paper.deviceTypeEnum.phone')">{{ $t('page.paper.deviceTypeEnum.phone') }}</n-radio>
          <n-radio :value="$t('page.paper.deviceTypeEnum.other')">{{ $t('page.paper.deviceTypeEnum.other') }}</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="problemDescription" :label="$t('page.paper.problemDescription')">
        <n-input v-model:value="paperRecord.problemDescription" :placeholder="$t('page.paper.problemDescription')" />
      </n-form-item>
      <n-form-item path="receiverId" :label="$t('page.paper.receiver')">
        <n-select
          v-model:value="paperRecord.receiverId"
          :placeholder="$t('page.paper.receiver')"
          :options="workerOptions"
          :loading="selectLoading"
          filterable
          clearable
        ></n-select>
      </n-form-item>
      <n-form-item path="receiveTime" :label="$t('page.paper.receiveTime')">
        <n-date-picker
          v-model:formatted-value="paperRecord.receiveTime"
          value-format="yyyy-MM-dd HH:mm:ss.S"
          type="datetime"
          clearable
        />
      </n-form-item>
      <n-form-item path="workerId" :label="$t('page.paper.worker')">
        <n-select
          v-model:value="paperRecord.workerId"
          :placeholder="$t('page.paper.worker')"
          :options="workerOptions"
          :loading="selectLoading"
          filterable
          clearable
        ></n-select>
      </n-form-item>
      <n-form-item path="worker2Id" :label="$t('page.paper.worker')">
        <n-select
          v-model:value="paperRecord.worker2Id"
          :placeholder="$t('page.paper.worker')"
          :options="workerOptions"
          :loading="selectLoading"
          filterable
          clearable
        ></n-select>
      </n-form-item>
      <n-form-item path="status" :label="$t('page.paper.status')">
        <n-radio-group v-model:value="paperRecord.status">
          <n-radio :value="PaperStatus.Processed">{{ $t('page.paper.statusEnum.processed') }}</n-radio>
          <n-radio :value="PaperStatus.Unprocessed">{{ $t('page.paper.statusEnum.unprocessed') }}</n-radio>
          <n-radio :value="PaperStatus.Deprecated">{{ $t('page.paper.statusEnum.deprecated') }}</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="solution" :label="$t('page.paper.solution')">
        <n-input v-model:value="paperRecord.solution" type="textarea" :placeholder="$t('page.paper.solution')" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
