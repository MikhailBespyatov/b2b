import React, { FC, useRef } from 'react';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { uuid } from 'utils/uuid';
import { IProps } from './types';

import s from './Table.module.css';
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
export const Table: FC<IProps> = ({
  columns,
  dataSource,
  width = '1132px',
  isLoading,
  limit,
  onClick
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const gridTemplateColumns = columns
    .map(({ grid }) => (grid ? `${grid}fr` : '1fr'))
    .join(' ');

  // const onWheel: WheelEventHandler = e => {
  //   const scrollSpeed = 50;
  //   if (tableRef) {
  //     const target = tableRef.current as HTMLDivElement;
  //     if (e.deltaY > 0) {
  //       target.scrollTo({
  //         left: target.scrollLeft + scrollSpeed
  //       });
  //     } else if (e.deltaY < 0) {
  //       target.scrollTo({
  //         left: target.scrollLeft - scrollSpeed
  //       });
  //     }
  //   }
  // };

  return (
    <div className={s.wrapper} ref={tableRef}>
      <div className={s.table_wrapper} style={{ width }}>
        <div className={s.header_wrapper} style={{ gridTemplateColumns }}>
          {columns.map(({ title, key }) => (
            <div key={key} className={s.header_item}>
              {title ?? ''}
            </div>
          ))}
        </div>
        {isLoading
          ? Array.from({ length: limit }).map(() => (
              <div
                key={uuid()}
                style={{ gridTemplateColumns }}
                className={s.body_item}
              >
                {columns.map(column => {
                  return (
                    <div key={column.key}>
                      <Skeleton className={s.skeleton} visible animate>
                        -
                      </Skeleton>
                    </div>
                  );
                })}
              </div>
            ))
          : dataSource?.map(item => {
              return (
                <div
                  key={uuid()}
                  style={{ gridTemplateColumns }}
                  className={s.body_item}
                >
                  {columns.map(column => {
                    return (
                      <div key={uuid()} onClick={onClick(item)}>
                        {typeof column.render === 'function'
                          ? column.render(item[column.dataIndex], item)
                          : item[column.dataIndex]}
                      </div>
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
};
