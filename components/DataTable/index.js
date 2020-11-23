import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, Text } from '@chakra-ui/react';
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

const LeftArrow = dynamic(() => import('@meronex/icons/ios').then(i => i.IosArrowBack));
const RightArrow = dynamic(() => import('@meronex/icons/ios').then(i => i.IosArrowForward));
const DownArrow = dynamic(() => import('@meronex/icons/ios').then(i => i.IosArrowDown));
const UpArrow = dynamic(() => import('@meronex/icons/ios').then(i => i.IosARrowUp));

export const DataTable = ({
  columns,
  data,
  tableHeading,
  initialPageSize = 10,
  onRowClick,
  striped = false,
  bordersVertical = false,
  bordersHorizontal = false,
  cellRender = null,
  rowHighlightProp,
  rowHighlightBg,
  rowHighlightColor,
}) => {
  const tableColumns = useMemo(() => columns, [columns]);

  const isMobile = useMobile();

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 150,
      maxWidth: 300,
    }),
    [],
  );

  let hiddenColumns = [];

  tableColumns.map(col => {
    if (col.hidden === true) {
      hiddenColumns.push(col.accessor);
    }
  });

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      defaultColumn,
      data,
      initialState: { pageIndex: 0, pageSize: initialPageSize, hiddenColumns: hiddenColumns },
    },
    useSortBy,
    usePagination,
  );

  return (
    <CardBody>
      {!!tableHeading && <CardHeader>{tableHeading}</CardHeader>}
      <TableMain {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  as="th"
                  py={2}
                  align={column.align}
                  key={column.id}
                  {...column.getHeaderProps()}
                  {...column.getSortByToggleProps()}>
                  <Text as="span" fontSize="sm" fontWeight="bold" display="inline-block">
                    {column.render('Header')}
                  </Text>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Box as={DownArrow} boxSize={3} d="inline-block" ml={1} />
                    ) : (
                      <Box as={UpArrow} boxSize={3} d="inline-block" ml={1} />
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
          {page.map(
            (row, key) =>
              prepareRow(row) || (
                <TableRow
                  index={key}
                  doStripe={striped}
                  doHorizontalBorders={bordersHorizontal}
                  onClick={() => onRowClick && onRowClick(row)}
                  key={key}
                  highlight={row.values[rowHighlightProp] ?? false}
                  highlightBg={rowHighlightBg}
                  highlightColor={rowHighlightColor}
                  {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <TableCell
                        align={cell.column.align}
                        cell={cell}
                        bordersVertical={[bordersVertical, i]}
                        key={cell.row.index}
                        {...cell.getCellProps()}>
                        {cell.render(cellRender ?? 'Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ),
          )}
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
        <Flex justifyContent="center" alignItems="center">
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
        </Flex>
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
