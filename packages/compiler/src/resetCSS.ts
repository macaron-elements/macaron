import dedent from "dedent";

// minimal CSS reset
export const resetCSS = dedent`
  :host {
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  [hidden] {
    display: none !important;
  }
`;
