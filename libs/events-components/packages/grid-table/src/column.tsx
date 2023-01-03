import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ComponentProps } from '@stitches/react';
import { forwardAs } from '@events-components/forward-as';
import { DownMiniIcon, UpMiniIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { useGridTableContext } from './GridTableContext';
import {
  column,
  Header,
  HeaderText,
  Resizer,
  ResizerLine,
} from './grid-table.styled';

export interface ColumnProps extends ComponentPropsWithoutRef<'th'> {
  columnId: string;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  disableResize?: boolean;
  disableSort?: boolean;
}

export const Column = forwardAs<ColumnProps, 'th'>((props, ref) => {
  const {
    as: Component = 'th',
    columnId,
    minWidth = 50,
    maxWidth,
    defaultWidth,
    disableResize = false,
    disableSort = false,
    style,
    children,
    className,
    ...thProps
  } = props;
  const {
    sort,
    onSort,
    sizes,
    onResize,
    disableResize: globalDisableResize,
  } = useGridTableContext();

  const cellRef = useRef<HTMLTableCellElement>(null);

  // #region sort
  const isSortable = !disableSort && sort !== undefined;
  const isSorted = isSortable && sort !== null && sort.columnId === columnId;
  let sortIcon = null;
  if (isSorted) {
    if (sort.direction === 'asc') {
      sortIcon = <UpMiniIcon />;
    } else {
      sortIcon = <DownMiniIcon />;
    }
  }

  const onClick = () => {
    if (isDragging || !isSortable) {
      return;
    }
    onSort(columnId);
  };
  // #endregion

  // #region resize
  const isResizable = !disableResize && !globalDisableResize;
  const [size, setSize] = useState<number | undefined>(
    sizes[columnId] ?? defaultWidth
  );
  const sizeRef = useRef(size);
  sizeRef.current = size;
  const startSizeRef = useRef<number>(0);
  const startPositionRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setSize(sizes[columnId] ?? defaultWidth);
  }, [sizes, columnId, defaultWidth]);

  const onMouseDown: MouseEventHandler = (e) => {
    if (!cellRef.current) {
      return;
    }
    startPositionRef.current = e.clientX;
    startSizeRef.current =
      sizes[columnId] ?? cellRef.current.getBoundingClientRect().width;
    setSize(startSizeRef.current);
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) {
      return;
    }
    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startPositionRef.current;
      const size = startSizeRef.current + delta;
      if (size < minWidth) {
        setSize(minWidth);
        return;
      }
      if (maxWidth && size > maxWidth) {
        setSize(maxWidth);
        return;
      }
      setSize(size);
    };
    const onMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      if (sizeRef.current === undefined) {
        return;
      }
      onResize(columnId, sizeRef.current);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.userSelect = 'none';
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.userSelect = 'initial';
    };
  }, [isDragging, columnId, minWidth, maxWidth]);
  // #endregion

  const refs = useMergeRefs(ref, cellRef);

  return (
    <Component
      data-resizable={isResizable}
      aria-sort={
        isSorted ? ariaSort[sort.direction] : isSortable ? 'none' : undefined
      }
      {...thProps}
      style={{
        width: size,
        minWidth: minWidth,
        maxWidth: maxWidth,
        ...style,
      }}
      className={clsx(
        'grid-table-column',
        column({ clickable: isSortable }).toString(),
        className
      )}
      ref={refs}
    >
      <Header className="grid-table-header" onClick={onClick}>
        <HeaderText className="grid-table-header-text">{children}</HeaderText>
        {sortIcon}
      </Header>
      {isResizable && (
        <Resizer
          className="grid-table-resizer"
          onMouseDown={onMouseDown}
          data-dragging={isDragging}
        >
          <ResizerLine />
        </Resizer>
      )}
    </Component>
  );
});

const ariaSort = {
  asc: 'ascending',
  desc: 'descending',
} as const;
