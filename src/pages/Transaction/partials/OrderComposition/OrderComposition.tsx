import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'arui-feather/input';
import IconButton from 'arui-feather/icon-button';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';

type PropTypes = {
  isEdit: boolean;
};

export const OrderComposition: FC<PropTypes> = ({ isEdit }) => {
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
                <td> </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Туфли женские с замочком, серые Michael Kors</td>
                <td>0000123498</td>
                <td width={64}>
                  {isEdit ? (
                    <Input size="s" type="number" defaultValue="1" />
                  ) : (
                    '1 шт'
                  )}
                </td>
                <td>22 300 ₸</td>
                <td>22 300 ₸</td>
                <td>
                  {isEdit && (
                    <IconButton>
                      <TrashCanMIcon />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
