import type { DataTableColumns } from 'naive-ui';
import { $t } from '@/locales';
import type { Api } from '@/typings/api';
import { createEditDeleteActionsColumn } from '@/utils/common';

export const createColumns = ({
  handleEdit,
  handleDelete,
  showEditDelete
}: {
  handleEdit: (rowData: Api.Worker.WorkerRecord) => Promise<any>;
  handleDelete: (id: string) => Promise<any>;
  showEditDelete: boolean;
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
