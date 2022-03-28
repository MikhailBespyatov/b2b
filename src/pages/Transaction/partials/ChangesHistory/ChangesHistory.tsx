import React, { FC, useState } from 'react';
import { Grid } from '@alfalab/core-components/grid';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Label } from 'arui-feather/label';
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
        <Grid.Row className="collapse">
          <Grid.Col
            width={{
              mobile: { s: 8, m: 8, l: 8 },
              tablet: { s: 6, m: 6, l: 4 },
              desktop: { s: 5, m: 5, l: 5 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.registrationDate')}:</Label>
              <span className="ml-4">
                {format(parseISO(order.created_at), 'dd.MM.yyyy, HH:mm')}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 8, m: 8, l: 8 },
              tablet: { s: 6, m: 6, l: 4 },
              desktop: { s: 3, m: 3, l: 3 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.orderStatus')}:</Label>
              <span className="ml-4">
                <TagButton
                  size="s"
                  className={`status status-${order.app_status} bold-700`}
                >
                  {status ??
                    t('transactions.status.type.unexpected').toUpperCase()}
                </TagButton>
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 6, m: 6, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.orderEdited')}:</Label>
              <span className="ml-4">Мухоряпов Рамиль Евгеньевич</span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Collapse>
    </>
  );
};
