import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from '@alfalab/core-components/space';

import { FileCSVIcon } from '../../../../components/ui/icons/FileCSV';
import { FilePDFIcon } from '../../../../components/ui/icons/FilePDF';

export const TableExport: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="transactions__export">
      <div className="transactions__btn-group">
        <button className="btn-csv">
          <FileCSVIcon width={23} height={24} />
        </button>
        <div className="divider"></div>
        <button>
          <FilePDFIcon width={23} height={24} />
        </button>
      </div>
      <div className="transactions__date-picker">
        <Space direction="horizontal">
          {t('date.range.from')}
          <input type="date" />
          {t('date.range.till')}
          <input type="date" />
        </Space>
      </div>
    </div>
  );
};
