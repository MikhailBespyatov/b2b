import { Skeleton } from '@alfalab/core-components/skeleton';
import React, { FC, useRef, WheelEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { uuid } from 'utils/uuid';
import s from './Table.module.css';
import { Props } from './types';

export const Table: FC<Props> = ({
  tHeadItems,
  data,
  width = '1132px',
  isFetching,
  limit
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const gridTemplateColumns = tHeadItems
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
          {tHeadItems.map(({ title }) => (
            <div key={title} className={s.header_item}>
              {title ? t(title) : ''}
            </div>
          ))}
        </div>
        <div style={{ gridTemplateColumns }} className={s.body_item}>
          {isFetching &&
            Array.from({ length: limit }).map(() =>
              tHeadItems.map(() => {
                return (
                  <div key={uuid()}>
                    <Skeleton className={s.skeleton} visible animate>
                      -
                    </Skeleton>
                  </div>
                );
              })
            )}
          {data?.map(item => {
            return tHeadItems.map(({ key }) => {
              return <div key={uuid()}>{item[key]}</div>;
            });
          })}
        </div>
      </div>
    </div>
  );
};
