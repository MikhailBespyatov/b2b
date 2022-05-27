import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { Label } from 'arui-feather/label';
import { Link } from 'arui-feather/link';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';
import { IClientInfo } from 'models/IOrder';
import { phoneNumberFormatter } from 'utils/formatter/phoneNumberFormatter';

type PropTypes = {
  order: IClientInfo;
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
              <Label>{t('user.surname')}:</Label>
              <span className="ml-4">
                {order.cLastName || t('system.param.notSpecified')}
              </span>
            </div>
            <div className="collapse__box-item">
              <Label>{t('user.phoneNumber')}:</Label>
              <span className="ml-4">
                <Link
                  text={phoneNumberFormatter(order.phoneNumber)}
                  url={`tel:${phoneNumberFormatter(order.phoneNumber)}`}
                  size="m"
                  view="blue"
                />
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
              <Label>{t('user.name')}:</Label>
              <span className="ml-4">
                {order.cName || t('system.param.notSpecified')}
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
              <Label>{t('user.middleName')}:</Label>
              <span className="ml-4">
                {order.cMiddleName || t('system.param.notSpecified')}
              </span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Collapse>
    </>
  );
};
