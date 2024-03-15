import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import { NButton, NDescriptions, NDescriptionsItem, NPopconfirm, NTag } from 'naive-ui';
import { $t } from '@/locales';
import { PaperStatus } from '@/constants/paper';
import type { Api } from '@/typings/api';

export const createColumns = ({
  handleEdit,
  handleDelete
}: {
  handleEdit: (rowData: Api.Paper.PaperRecord) => Promise<any>;
  handleDelete: (id: string) => Promise<any>;
}): DataTableColumns<Api.Paper.PaperRecord> => {
  return [
    {
      type: 'expand',
      renderExpand: rowData => {
        return h(
          NDescriptions,
          {
            bordered: true,
            labelPlacement: 'left'
          },
          {
            default: () => {
              const nodes = [];
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.address')
                  },
                  {
                    default: () => rowData.address
                  }
                )
              );
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.problemType')
                  },
                  {
                    default: () => rowData.problemType
                  }
                )
              );
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.solution')
                  },
                  {
                    default: () => rowData.solution
                  }
                )
              );
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.receiverName')
                  },
                  {
                    default: () => rowData.receiverName
                  }
                )
              );
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.completeTime')
                  },
                  {
                    default: () => rowData.completeTime
                  }
                )
              );
              nodes.push(
                h(
                  NDescriptionsItem,
                  {
                    label: $t('page.paper.note')
                  },
                  {
                    default: () => rowData.note
                  }
                )
              );
              return nodes;
            }
          }
        );
      }
    },
    {
      title: $t('page.paper.name'),
      key: 'name',
      sorter: true
    },
    {
      title: $t('page.paper.phoneNumber'),
      key: 'phoneNumber',
      sorter: true
    },
    {
      title: $t('page.paper.problemDescription'),
      key: 'problemDescription'
    },
    {
      title: $t('page.paper.status'),
      key: 'status',
      width: 200,
      sorter: true,
      render(rowData, _rowIndex) {
        const status = rowData.status;
        return h(
          NTag,
          {
            type: status === PaperStatus.Processed ? 'success' : 'error',
            bordered: false
          },
          {
            default: () => {
              switch (status) {
                case PaperStatus.Unprocessed:
                  return $t('page.paper.statusEnum.unprocessed');
                case PaperStatus.Processed:
                  return $t('page.paper.statusEnum.processed');
                case PaperStatus.Deprecated:
                  return $t('page.paper.statusEnum.deprecated');
                default:
                  return '';
              }
            }
          }
        );
      }
    },
    {
      title: $t('page.paper.worker'),
      key: 'workerId',
      sorter: true,
      render(rowData, _rowIndex) {
        const workerId = rowData.workerId;
        const workerName = rowData.workerName;
        const worker2Id = rowData.worker2Id;
        const worker2Name = rowData.worker2Name;
        return h('div', null, {
          default: () => {
            const nodes = [];
            if (workerId) {
              nodes.push(
                h(
                  NTag,
                  {
                    type: 'info',
                    bordered: false,
                    style: 'margin-right: 8px'
                  },
                  {
                    default: () => `${workerName}(${workerId})`
                  }
                )
              );
            }
            if (worker2Id) {
              nodes.push(
                h(
                  NTag,
                  {
                    type: 'info',
                    bordered: false
                  },
                  {
                    default: () => `${worker2Name}(${worker2Id})`
                  }
                )
              );
            }
            return nodes;
          }
        });
      }
    },
    {
      title: $t('page.paper.receiveTime'),
      key: 'receiveTime',
      sorter: true
    },
    {
      title: $t('common.action'),
      key: 'actions',
      width: 200,
      render(rowData, _rowIndex) {
        return h('div', null, {
          default: () => [
            h(
              NButton,
              {
                type: 'primary',
                style: 'margin-right: 8px',
                round: true,
                onClick: async () => await handleEdit(rowData)
              },
              {
                default: () => $t('common.edit')
              }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: async () => await handleDelete(rowData.id)
              },
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      type: 'error',
                      round: true,
                      strong: true
                    },
                    {
                      default: () => $t('common.delete')
                    }
                  ),
                default: () => $t('common.confirmDelete')
              }
            )
          ]
        });
      }
    }
  ];
};
