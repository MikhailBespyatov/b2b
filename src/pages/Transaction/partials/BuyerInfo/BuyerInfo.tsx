import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { Label } from 'arui-feather/label';
import { Link } from 'arui-feather/link';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';
import { IOrder } from 'models/IOrder';
import { phoneNumberFormatter } from 'utils/helpers';

type PropTypes = {
  order: IOrder;
};

export const BuyerInfo: FC<PropTypes> = ({ order }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible title-3 mb-24"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.buyer')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="mb-32">
        <Grid.Row className="collapse" align="top">
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 4, m: 4, l: 4 },
              desktop: { s: 4, m: 4, l: 4 }
            }}
          >
            <div className="collapse__box-item">
              <Label className="bold-600">{t('user.surname')}:</Label>
              <span className="collapse__box-value">Бандюков</span>
            </div>
            <div className="collapse__box-item">
              <Label className="bold-600">{t('user.phoneNumber')}:</Label>
              <span className="collapse__box-value">
                <Link
                  text={phoneNumberFormatter(order.phoneNumber)}
                  url={`tel:${phoneNumberFormatter(order.phoneNumber)}`}
                  size="m"
                  view="blue"
                />
              </span>
            </div>
            <div className="collapse__box-item">
              <Label className="bold-600">{t('user.paymentCard')}:</Label>
              <span className="collapse__box-value">****1234</span>
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
              <Label className="bold-600">{t('user.name')}:</Label>
              <span className="collapse__box-value">Анатолий</span>
            </div>
            <div className="collapse__box-item">
              <Label className="bold-600">{t('user.email')}:</Label>
              <span className="collapse__box-value">
                bandyukov_anatoliy@mail.ru
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
              <Label className="bold-600">{t('user.middleName')}:</Label>
              <span className="collapse__box-value">Бердымухамедович</span>
            </div>
            <div className="collapse__box-item">
              <Label className="bold-600">{t('user.comment')}:</Label>
              <br />
              <span className="collapse__box-value">
                Не доставляйте до 8 утра, я сплю как удав, поэтому курьер не
                дозвонится — я не услышу звонок
              </span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Collapse>
    </>
  );
};
