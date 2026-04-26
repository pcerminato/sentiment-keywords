import { ReactElement } from "react";

/* Parses only <em> tag, only to avoids using dangerouslySetInnerHtml*/
export function parseHTML(t: string): ReactElement | string {
  if (t.indexOf("<em>") > -1) {
    return <em>{t.replace("<em>", "").replace("</em>", "")}</em>
  }
  return t;
}