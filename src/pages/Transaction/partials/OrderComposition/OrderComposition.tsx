import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'arui-feather/input';
import IconButton from 'arui-feather/icon-button';
import FormField from 'arui-feather/form-field';
import Label from 'arui-feather/label';
import Button from 'arui-feather/button';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';
import { Typography } from '@alfalab/core-components/typography';

type PropTypes = {
  isEdit: boolean;
};

export const OrderComposition: FC<PropTypes> = ({ isEdit }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
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
                    <IconButton onClick={handleModalOpen}>
                      <TrashCanMIcon />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
      <ModalResponsive open={open} onClose={handleModalClose} size="m">
        <ModalResponsive.Content>
          <Typography.Title
            view="small"
            tag="h4"
            weight="bold"
            className="modal-responsive--title"
          >
            {t('transactions.modal.title.deleteOrder')}
          </Typography.Title>
          <FormField size="m">
            <Label size="m">{t('transactions.modal.text.deleteOrder')}</Label>
          </FormField>
          <div className="modal-responsive__footer">
            <Row align="middle">
              <Col>
                <Button size="m" view="extra" width="available">
                  {t('button.confirm')}
                </Button>
              </Col>
              <Col>
                <Button
                  size="m"
                  view="default"
                  width="available"
                  onClick={handleModalClose}
                >
                  {t('button.cancel')}
                </Button>
              </Col>
            </Row>
          </div>
        </ModalResponsive.Content>
      </ModalResponsive>
    </>
  );
};
