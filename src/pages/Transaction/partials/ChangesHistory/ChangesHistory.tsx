import React, { FC, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import { Label } from 'arui-feather/label';
import { TagButton } from 'arui-feather/tag-button';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

export const ChangesHistory: FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.historyOfChanges')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="collapse">
        <Row>
          <Col lg={4} md={6} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">
                {t('transaction.data.statusChangedDate')}:
              </Label>
              <span className="collapse__box-value">21.12.2020</span>
            </div>
          </Col>
          <Col lg={4} md={6} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">
                {t('transaction.data.changedStatus')}:
              </Label>
              <span className="collapse__box-value">
                <TagButton size="s" className="status status-paid">
                  {t(`transactions.status.type.paid`).toUpperCase()}
                </TagButton>
              </span>
            </div>
          </Col>
          <Col lg={4} md={6} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">
                {t('transaction.data.changeResponsibility')}:
              </Label>
              <span className="collapse__box-value">00 ₸</span>
            </div>
          </Col>
        </Row>
      </Collapse>
    </>
  );
};
