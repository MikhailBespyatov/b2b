import React, { FC, useState } from 'react';
import CalendarInput from 'arui-feather/calendar-input';
import { useTranslation } from 'react-i18next';
import IconButton from 'arui-feather/icon-button';
import Button from 'arui-feather/button';
import { Space } from '@alfalab/core-components/space';
import { FileCSVIcon, FilePDFIcon } from 'components/ui/icons';

export const TableExport: FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string | undefined>('');
  const [endDate, setEndDate] = useState<string | undefined>('');

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="mb-32 d-flex align-end justify-between">
      <Space direction="horizontal" align="end" size={16} className="mr-32">
        <CalendarInput
          size="s"
          label={t('transactions.table.export.startDate')}
          onChange={setStartDate}
          value={startDate}
        />
        <CalendarInput
          size="s"
          label={t('transactions.table.export.endDate')}
          onChange={setEndDate}
          value={endDate}
        />
        {startDate && endDate && (
          <Button size="s" onClick={handleReset}>
            {t('button.reset')}
          </Button>
        )}
      </Space>
      <span>
        <IconButton size="s">
          <FileCSVIcon width={18} height={22} />
        </IconButton>
        <IconButton size="s">
          <FilePDFIcon width={18} height={22} />
        </IconButton>
      </span>
    </div>
  );
};
