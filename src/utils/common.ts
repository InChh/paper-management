import type { DataTableColumn } from 'naive-ui';
import { NButton, NPopconfirm } from 'naive-ui';
import { h } from 'vue';
import { $t } from '@/locales';
import type { Api } from '@/typings/api';

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[];
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}

export function createEditDeleteActionsColumn<T extends Api.Common.CommonRecord>(
  onEditClick: (rowData: T) => Promise<any>,
  onDeleteClick: (rowData: T) => Promise<any>
): DataTableColumn<T> {
  return {
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
              onClick: async () => await onEditClick(rowData)
            },
            {
              default: () => $t('common.edit')
            }
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: async () => await onDeleteClick(rowData)
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
  };
}
