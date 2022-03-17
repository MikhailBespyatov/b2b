import React, { FC, ReactElement, useState } from 'react';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';

type PropTypes = {
  title: string;
  text: string;
  okText: string;
  cancelText: string;
  children: ReactElement;
};

const PopConfirm: FC<PropTypes> = ({
  title,
  text,
  okText,
  cancelText,
  children
}) => {
  const [isShowChildren, setIsShowChildren] = useState(false);

  const handleButtonClick = () => {
    setIsShowChildren(true);
  };

  if (isShowChildren) {
    return children;
  }

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h4" view="medium" weight="bold">
          {title}
        </Typography.Title>
      </FormField>
      <Typography.Text view="primary-medium">{text}</Typography.Text>
      <div className="modal-responsive__footer">
        <Row align="middle">
          <Col>
            <Button
              size="l"
              view="extra"
              width="available"
              onClick={handleButtonClick}
            >
              {okText}
            </Button>
          </Col>
          <Col>
            <Button size="l" view="default" width="available">
              {cancelText}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PopConfirm;
