import React, { FC } from 'react';
import Select, { SelectOptionsShapeType } from 'arui-feather/select';
import { Pagination as UIPagination } from '@alfalab/core-components/pagination';

interface Props {
  selectOptions: SelectOptionsShapeType[];
  limit: Array<string | number>;
  onSelect: (values: number[] | undefined) => void;
  currentPageIndex: number;
  onPageChange: (value: number) => void;
  pagesCount: number;
}

export const Pagination: FC<Props> = ({
  selectOptions,
  limit,
  onSelect,
  currentPageIndex,
  onPageChange,
  pagesCount
}) => {
  return (
    <div className="mb-20">
      <div className="table-pagination">
        <Select
          mode="radio"
          className="mobile-block"
          options={selectOptions}
          value={limit}
          onChange={onSelect}
        />
        <UIPagination
          currentPageIndex={currentPageIndex}
          pagesCount={pagesCount}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
