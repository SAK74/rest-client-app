interface NewHistoryItem {
  method: string;
  url: string;
  body: string;
  headers: { [k: string]: string };
}

export function prepareHistory(
  historyJSON: string,
  newValues: NewHistoryItem,
): string {
  let history;
  if (!historyJSON.length) {
    history = [];
  } else {
    history = JSON.parse(historyJSON);
  }

  history.push({ ...newValues, executionTime: new Date().getTime() });

  return JSON.stringify(history);
}
