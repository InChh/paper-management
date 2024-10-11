import type { DataTableColumns } from 'naive-ui';
import { NTag } from 'naive-ui';
import { h } from 'vue';
import { useKeycloak } from '@josempgon/vue-keycloak';
import { $t } from '@/locales';
import type { Api } from '@/typings/api';
import { createEditDeleteActionsColumn } from '@/utils/common';
import SvgIcon from '@/components/custom/svg-icon.vue';

export const createColumns = ({
  handleEdit,
  handleDelete,
  showEditDelete,
  handleOnDuty,
  handleOffDuty
}: {
  handleEdit: (rowData: Api.Worker.WorkerRecord) => Promise<any>;
  handleDelete: (id: string) => Promise<any>;
  showEditDelete: boolean;
  handleOnDuty: (id: string) => Promise<any>;
  handleOffDuty: (id: string) => Promise<any>;
}): DataTableColumns<Api.Worker.WorkerRecord> => {
  const columns: DataTableColumns<Api.Worker.WorkerRecord> = [
    {
      title: $t('page.worker.name'),
      key: 'name',
      sorter: true
    },
    {
      title: $t('page.worker.workerId'),
      key: 'workerId',
      sorter: true
    },
    {
      title: $t('page.worker.isOnDuty'),
      key: 'isOnDuty',
      render(rowData) {
        const { hasRoles } = useKeycloak();

        return h(
          NTag,
          {
            bordered: false,
            checkable: hasRoles(['leader']),
            type: rowData.isOnDuty ? 'success' : 'error',
            onUpdateChecked: async (checked: boolean) => {
              if (checked) {
                await handleOnDuty(rowData.userId!);
              } else {
                await handleOffDuty(rowData.userId!);
              }
            },
            checked: rowData.isOnDuty!
          },
          {
            default: () => (rowData.isOnDuty ? $t('page.worker.onDuty') : $t('page.worker.offDuty')),
            icon: () =>
              h(SvgIcon, {
                icon: rowData.isOnDuty ? 'ion:checkmark-circle' : 'ion:close-circle'
              })
          }
        );
      }
    }
  ];
  if (showEditDelete) {
    columns.push(
      createEditDeleteActionsColumn(
        async rowData => await handleEdit(rowData),
        async rowData => await handleDelete(rowData.userId!)
      )
    );
  }
  return columns;
};
