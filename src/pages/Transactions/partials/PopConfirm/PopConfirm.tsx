import React, { FC, ReactElement, useState } from 'react';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';

type PropTypes = {
  title: string;
  text: string;
  okText: string;
  cancelText: string;
  onCancel: () => void;
  children: ReactElement;
};

const PopConfirm: FC<PropTypes> = ({
  title,
  text,
  okText,
  cancelText,
  onCancel,
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
      <Typography.Title
        tag="h4"
        view="small"
        weight="bold"
        className="modal-responsive--title"
      >
        {title}
      </Typography.Title>
      <Typography.Text view="primary-medium">{text}</Typography.Text>
      <div className="mt-24">
        <Button size="l" type="submit" view="extra" onClick={handleButtonClick}>
          {okText}
        </Button>
        <Button size="l" onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </>
  );
};

export default PopConfirm;
