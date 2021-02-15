type Dict<T extends any = any> = Record<string, T>;

type BareProps = { children: React.ReactNode; key?: any };

type MeronexIcon = import('@meronex/icons').IconBaseProps;

type NoAria<T> = Omit<T, 'aria-label'>;

type NoChildren<T> = Omit<T, 'children'>;

interface TocHeading {
  value: string;
  id: string;
  children: TocHeading[];
}
