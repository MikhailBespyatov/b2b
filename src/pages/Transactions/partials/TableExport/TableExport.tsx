import React, { FC } from 'react';
import CalendarInput from 'arui-feather/calendar-input';
import { useTranslation } from 'react-i18next';
import { FileCSVIcon, FilePDFIcon } from 'components/ui/icons';
import IconButton from 'arui-feather/icon-button';
import { Space } from '@alfalab/core-components/space';

export const TableExport: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-32 d-flex align-end">
      <Space direction="horizontal" size={30} className="mr-32">
        <CalendarInput
          size="s"
          label={t('transactions.table.export.startDate')}
        />
        <CalendarInput
          size="s"
          label={t('transactions.table.export.endDate')}
        />
      </Space>
      <IconButton size="s">
        <FileCSVIcon width={18} height={22} />
      </IconButton>
      <IconButton size="s">
        <FilePDFIcon width={18} height={22} />
      </IconButton>
    </div>
  );
};
