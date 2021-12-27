import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Button } from '@alfalab/core-components/button';
import { Row } from '@alfalab/core-components/grid/row';

type PropTypes = {
  title: string;
};

export const ConfirmOrder: FC<PropTypes> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {title}
        </Typography.Title>
      </FormField>
      <div className="modal-responsive__footer">
        <Row align="middle">
          <Col>
            <Button size="m" view="primary" block={true}>
              {t('transactions.modal.button.confirm')}
            </Button>
          </Col>
          <Col>
            <Button size="m" view="tertiary" block={true}>
              {t('transactions.modal.button.cancel')}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
