import type { DataTableColumns } from 'naive-ui';
import { $t } from '@/locales';
import type { Api } from '@/typings/api';
import { createEditDeleteActionsColumn } from '@/utils/common';

export const createColumns = ({
  handleEdit,
  handleDelete
}: {
  handleEdit: (rowData: Api.Worker.WorkerRecord) => Promise<any>;
  handleDelete: (id: string) => Promise<any>;
}): DataTableColumns<Api.Worker.WorkerRecord> => {
  return [
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
    createEditDeleteActionsColumn(
      async rowData => await handleEdit(rowData),
      async rowData => await handleDelete(rowData.userId!)
    )
  ];
};
