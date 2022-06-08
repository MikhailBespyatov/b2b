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
import { IOrderInfo } from 'models/IOrder';
import { moneyFormatter } from 'utils/formatter/moneyFormatter';
import { useSelector } from 'react-redux';
import { RootStateType } from 'redux/store';
import { selectStatusesList } from 'redux/slices/app-slice';

type PropTypes = {
  item: IOrderInfo;
};

const OrderInfo: FC<PropTypes> = ({ item }) => {
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
        {t('transaction.collapse.historyOfOrder')} - {item.merchant_order_id}
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
                {format(parseISO(item.created_at), 'dd.MM.yyyy, HH:mm')}
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
                {format(parseISO(item.created_at), 'dd.MM.yyyy')}
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
                <TagButton
                  size="s"
                  className={`status status-${item.app_status.toLowerCase()} bold-700`}
                >
                  {statusList[item.app_status]?.toUpperCase() ??
                    t('transactions.status.type.unexpected').toUpperCase()}
                </TagButton>
                {/* <TagButton
                  size="s"
                  className={`status status-${order.app_status} bold-700`}
                >
                  {order.app_status ??
                    t('transactions.status.type.unexpected').toUpperCase()}
                </TagButton> */}
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
              <span className="ml-4">{moneyFormatter.format(item.amount)}</span>
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
              <span className="ml-4">{moneyFormatter.format(item.amount)}</span>
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
              <span className="ml-4">{moneyFormatter.format(item.amount)}</span>
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
              <span className="ml-4">0-0-4</span>
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
                  text="alfabank.kz/bnpl"
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
