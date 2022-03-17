import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

export const OrderComposition: FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible title-3 mb-24"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.orderComposition')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="mb-32">
        <div className="overflowX">
          <table className="table">
            <thead>
              <tr>
                <td>{t('transaction.data.title')}</td>
                <td>{t('transaction.data.vendorCode')}</td>
                <td>{t('transaction.data.numberOfGoods')}</td>
                <td>{t('transaction.data.price')}</td>
                <td>{t('transaction.data.amount')}</td>
              </tr>
            </thead>
            <tbody> </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
