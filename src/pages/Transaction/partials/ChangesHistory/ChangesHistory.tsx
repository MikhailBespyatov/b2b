import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TagButton } from 'arui-feather/tag-button';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

import { IOrder } from 'models/IOrder';

type PropTypes = {
  order: IOrder;
  status: string;
};

export const ChangesHistory: FC<PropTypes> = ({ order, status }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible title-3 mb-24"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.historyOfChanges')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="mb-32">
        <div className="overflowX">
          <table className="table">
            <thead>
              <tr>
                <td>{t('transaction.data.updatedDT')}</td>
                <td>{t('transactions.table.status')}</td>
                <td>{t('transactions.table.action')}</td>
                <td>{t('transaction.data.employee')}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {format(
                    parseISO(order.orderInfo.created_at),
                    'dd.MM.yyyy, HH:mm'
                  )}
                </td>
                <td>
                  <TagButton
                    size="s"
                    className={`status status-${order.orderInfo.app_status} bold-700`}
                  >
                    {status ??
                      t('transactions.status.type.unexpected').toUpperCase()}
                  </TagButton>
                </td>
                <td>оформлен</td>
                <td>Мухоряпов Рамиль Евгеньевич</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
