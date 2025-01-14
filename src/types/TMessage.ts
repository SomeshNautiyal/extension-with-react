import { TTheme } from "./TTheme";

export type TMessage =
    | {
          action: "APPLY_THEME";
          theme: TTheme;
          tabId?: number;
      }
    | {
          action: "INIT_THEME";
          theme?: TTheme;
          tabId?: number;
      };
