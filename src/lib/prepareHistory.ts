export interface HistoryItem {
  method: string;
  url: string;
  body: string;
  headers: { [k: string]: string };
}

export function prepareHistory(
  historyJSON: string,
  newValues: HistoryItem,
): string {
  let history: Array<HistoryItem> = [];

  if (!historyJSON) {
    history = [];
  } else {
    history = JSON.parse(historyJSON) as Array<HistoryItem>;
  }

  history.push(newValues);

  return JSON.stringify(history);
}
