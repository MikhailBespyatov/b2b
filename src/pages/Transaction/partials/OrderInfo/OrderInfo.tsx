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
  status: string;
};

const OrderInfo: FC<PropTypes> = ({ order, status }) => {
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
        <Grid.Row className="collapse" justify="left">
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.registrationDate')}:</Label>
              <span className="ml-4">
                {format(parseISO(order.created_at), 'dd.MM.yyyy HH:mm')}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transactions.filter.deliveredDate')}:</Label>
              <span className="ml-4">
                {format(parseISO(order.created_at), 'dd.MM.yyyy HH:mm')}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.orderStatus')}:</Label>
              <span className="ml-4">
                {status && (
                  <TagButton
                    size="s"
                    className={`status status-${order.app_status} bold-700`}
                  >
                    {status}
                  </TagButton>
                )}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.orderAmount')}:</Label>
              <span className="ml-4">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.bankCommission')}:</Label>
              <span className="ml-4">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.amountToBePaid')}:</Label>
              <span className="ml-4">
                {moneyFormatter.format(order.amount)}
              </span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.installmentType')}:</Label>
              <span className="ml-4">0-0-12</span>
            </div>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label>{t('transaction.data.paymentTerms')}:</Label>
              <span className="ml-4">
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

export default OrderInfo;
