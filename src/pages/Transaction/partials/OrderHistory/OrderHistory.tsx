import React, { FC, useState } from 'react';
import { Grid } from '@alfalab/core-components/grid';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Label } from 'arui-feather/label';
import { TagButton } from 'arui-feather/tag-button';
import { Link } from 'arui-feather/link';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';
import { IOrder } from 'models/IOrder';
import { moneyFormatter } from 'utils/helpers';

type PropTypes = {
  order: IOrder;
};

export const OrderHistory: FC<PropTypes> = ({ order }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible title-3 mb-24"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.historyOfOrder')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="mb-32">
        <Grid.Row>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.registrationDate')}:
              </Label>
              <span className="collapse__box-value">
                {format(parseISO(order.created_at), 'dd.MM.yyyy')}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.orderStatus')}:
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
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.orderAmount')}:
              </Label>
              <span className="collapse__box-value">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.bankCommission')}:
              </Label>
              <span className="collapse__box-value">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.amountToBePaid')}:
              </Label>
              <span className="collapse__box-value">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.paymentTerms')}:
              </Label>
              <span className="collapse__box-value">
                <Link
                  text="alfa.kz"
                  url="https://alfabank.kz"
                  target="_blank"
                  size="m"
                  view="blue"
                />
              </span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Collapse>
    </>
  );
};
