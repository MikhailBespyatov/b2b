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
};

export const ChangesHistory: FC<PropTypes> = ({ order }) => {
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
        <Grid.Row>
          <Grid.Col width={{ desktop: { s: 4, m: 6 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.statusChangedDate')}:
              </Label>
              <span className="collapse__box-value">
                {format(parseISO(order.created_at), 'dd.MM.yyyy')}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 6 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.changedStatus')}:
              </Label>
              <span className="collapse__box-value">
                <TagButton
                  size="s"
                  className={`status status-${order.app_status}`}
                >
                  {t(
                    `transactions.status.type.${order.app_status}`
                  ).toUpperCase()}
                </TagButton>
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 6 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.changeResponsibility')}:
              </Label>
              <span className="collapse__box-value">{order.fio}</span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Collapse>
    </>
  );
};
