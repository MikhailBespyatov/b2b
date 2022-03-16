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
        <Grid.Row>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.surname')}:
              </Label>
              <span className="collapse__box-value">Surname</span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">{t('transaction.data.name')}:</Label>
              <span className="collapse__box-value">Name</span>
            </div>
          </Grid.Col>
          <Grid.Col width={{ desktop: { s: 4, m: 4 } }}>
            <div className="collapse__box-item">
              <Label className="bold-600">
                {t('transaction.data.phoneNumber')}:
              </Label>
              <span className="collapse__box-value">
                <Link
                  text={phoneNumberFormatter(order.phoneNumber)}
                  url={`tel:${phoneNumberFormatter(order.phoneNumber)}`}
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
