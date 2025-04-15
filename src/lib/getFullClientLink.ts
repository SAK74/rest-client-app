import { HistoryItem } from "./prepareHistory";

export function getFullClientLink(item: HistoryItem): string {
  let link = `client/${item.method}/${btoa(item.url)}`;

  if (item.body) {
    link += `/${btoa(item.body)}`;
  }

  if (item.headers) {
    let searchParams = "?";
    const headers = Object.entries(item.headers).map(([key, value]) => ({
      key,
      value,
    }));

    headers.forEach(({ key, value }) => {
      searchParams += `${key}=${value}`;
    });

    link += searchParams;
  }

  return link;
}
