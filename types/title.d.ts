interface TitleOptions {
  special: string[];
}

declare module 'title' {
  function Title(newTitle: string, options?: TitleOptions): string;
  namespace Title {
    function reset(): void;
  }

  export = Title;
}
