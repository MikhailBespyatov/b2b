import React, { FC, Fragment, useRef, WheelEventHandler } from 'react';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { uuid } from 'utils/uuid';
import { IProps } from './types';

import s from './Table.module.css';

export const Table: FC<IProps> = ({
  columns,
  dataSource,
  width = '1132px',
  isLoading,
  limit
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const gridTemplateColumns = columns
    .map(({ grid }) => (grid ? `${grid}fr` : '1fr'))
    .join(' ');

  const onWheel: WheelEventHandler = e => {
    const scrollSpeed = 75;
    if (tableRef) {
      const target = tableRef.current as HTMLDivElement;
      if (e.deltaY > 0) {
        target.scrollTo({
          left: target.scrollLeft + scrollSpeed,
          behavior: 'smooth'
        });
      } else if (e.deltaY < 0) {
        target.scrollTo({
          left: target.scrollLeft - scrollSpeed,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className={s.wrapper} onWheel={onWheel} ref={tableRef}>
      <div className={s.table_wrapper} style={{ width }}>
        <div className={s.header_wrapper} style={{ gridTemplateColumns }}>
          {columns.map(({ title, key }) => (
            <div key={key} className={s.header_item}>
              {title ?? ''}
            </div>
          ))}
        </div>
        <div style={{ gridTemplateColumns }} className={s.body_item}>
          {isLoading &&
            Array.from({ length: limit }).map(() =>
              columns.map(column => {
                return (
                  <div key={column.key}>
                    <Skeleton className={s.skeleton} visible animate>
                      -
                    </Skeleton>
                  </div>
                );
              })
            )}

          {dataSource?.map(item => {
            return (
              <Fragment key={uuid()}>
                {columns.map(column => {
                  if (typeof column.render === 'function') {
                    return (
                      <div key={uuid()}>
                        {column.render(item[column.dataIndex], item)}
                      </div>
                    );
                  }
                  return <div key={uuid()}>{item[column.dataIndex]}</div>;
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
