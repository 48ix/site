import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Center, Flex, Icon, Text } from '@chakra-ui/react';
import { usePagination, useSortBy, useTable } from 'react-table';
import { CardBody, CardFooter, CardHeader } from '~components';
import { useMobile } from '~context';
import { TableMain } from './TableMain';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { TableBody } from './TableBody';
import { TableIconButton } from './TableIconButton';
import { TableSelectShow } from './TableSelectShow';

import type { TableOptions, PluginHook } from 'react-table';
import type { ParticipantAccessor, ParticipantEntry } from '~types';
import type { DataTableProps, CellRender } from './types';

const LeftArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ios').then(i => i.IosArrowBack),
);
const RightArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ios').then(i => i.IosArrowForward),
);
const DownArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ios').then(i => i.IosArrowDown),
);
const UpArrow = dynamic<MeronexIcon>(() => import('@meronex/icons/ios').then(i => i.IosArrowUp));

const defaultColumn = {
  minWidth: 100,
  width: 150,
  maxWidth: 300,
};

const plugins = [useSortBy, usePagination] as PluginHook<ParticipantEntry>[];

export const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const {
    data,
    Cell,
    columns: columnArgs,
    heading,
    rowHighlightBg,
    striped = false,
    rowHighlightProp,
    initialPageSize = 10,
    bordersVertical = false,
    bordersHorizontal = false,
  } = props;

  const isMobile = useMobile();
  const columns = useMemo(() => columnArgs, [columnArgs]);

  const hiddenColumns = useMemo<ParticipantAccessor[]>(() => {
    return columns.filter(col => col.hidden === true).map(col => col.accessor);
  }, [columns]);

  const options = {
    columns,
    defaultColumn,
    data,
    initialState: { pageIndex: 0, pageSize: initialPageSize, hiddenColumns },
  } as TableOptions<ParticipantEntry>;

  const instance = useTable<ParticipantEntry>(options, ...plugins);

  const {
    page,
    gotoPage,
    nextPage,
    pageCount,
    prepareRow,
    canNextPage,
    pageOptions,
    setPageSize,
    headerGroups,
    previousPage,
    getTableProps,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = instance;

  return (
    <CardBody>
      {typeof heading !== 'undefined' && <CardHeader>{heading}</CardHeader>}
      <TableMain {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  as="th"
                  py={2}
                  align={column.align}
                  {...column.getHeaderProps()}
                  {...column.getSortByToggleProps()}>
                  <Text as="span" fontSize="sm" fontWeight="bold" display="inline-block">
                    {column.render('Header')}
                  </Text>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Icon as={DownArrow} boxSize={3} ml={1} />
                    ) : (
                      <Icon as={UpArrow} boxSize={3} ml={1} />
                    )
                  ) : (
                    ''
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, key) => {
            prepareRow(row);
            const highlight =
              typeof rowHighlightProp !== 'undefined' ? row.values[rowHighlightProp] : false;
            return (
              <TableRow
                index={key}
                doStripe={striped}
                doHorizontalBorders={bordersHorizontal}
                highlight={highlight}
                highlightBg={rowHighlightBg}
                {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  const { column, row, value } = cell;
                  return (
                    <TableCell
                      align={cell.column.align}
                      bordersVertical={[bordersVertical, i]}
                      {...cell.getCellProps()}>
                      {typeof Cell !== 'undefined' ? (
                        <Cell column={column} row={row} value={value} />
                      ) : (
                        cell.render('Cell')
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableMain>
      <CardFooter>
        <Flex direction="row">
          <TableIconButton
            mr={2}
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<LeftArrow size="1rem" />}
          />
          <TableIconButton
            mr={2}
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
            icon={<RightArrow size="1rem" />}
          />
        </Flex>
        <Center>
          <Text as="span" fontSize="sm" mr={4} whiteSpace="nowrap">
            Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
          </Text>
          {!isMobile && (
            <TableSelectShow
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            />
          )}
        </Center>
        <Flex direction="row">
          <TableIconButton
            ml={2}
            isDisabled={!canNextPage}
            onClick={() => nextPage()}
            icon={<LeftArrow size="1rem" />}
          />
          <TableIconButton
            ml={2}
            onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
            isDisabled={!canNextPage}
            icon={<RightArrow size="1rem" />}
          />
        </Flex>
      </CardFooter>
    </CardBody>
  );
};
