import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TagButton } from 'arui-feather/tag-button';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

import { IChangeHistory } from 'models/IOrder';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { useSelector } from 'react-redux';
import { RootStateType } from 'redux/store';
import { selectStatusesList } from 'redux/slices/app-slice';

type PropTypes = {
  order: IChangeHistory[];
  appStatus: string;
};

export const ChangesHistory: FC<PropTypes> = ({ order, appStatus }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const statusList = useSelector((state: RootStateType) =>
    selectStatusesList(state)
  );

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
              {order?.map(item => {
                return (
                  <tr key={item.adjusted}>
                    <td>
                      {format(parseISO(item.adjusted), 'dd.MM.yyyy HH:mm')}
                    </td>
                    <td>
                      <TagButton
                        size="s"
                        className={`status status-${item.status.toLowerCase()} bold-700 text-line-through`}
                      >
                        {statusList[item.status]?.toUpperCase() ??
                          t(
                            'transactions.status.type.unexpected'
                          ).toUpperCase()}
                      </TagButton>
                      {item.last === 1 && (
                        <TagButton
                          size="s"
                          className={`status status-${appStatus.toLowerCase()} bold-700`}
                        >
                          {statusList[appStatus]?.toUpperCase() ??
                            t(
                              'transactions.status.type.unexpected'
                            ).toUpperCase()}
                        </TagButton>
                      )}
                    </td>
                    <td>{item.action}</td>
                    <td>{item.responsible}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
