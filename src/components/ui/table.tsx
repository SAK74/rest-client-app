import { ReactNode } from "react";

interface TableData {
  id: string | number | null;
  key: string;
  value: string;
}

interface TableHeader {
  id: string | number;
  value: string;
}

interface TableProps {
  data: TableData[];
  headers: TableHeader[];
  actions?: (row: TableData) => ReactNode;
}

function Table({ data, headers, actions }: TableProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((item) => (
              <th
                key={item.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {item.value}
              </th>
            ))}
            {!!actions && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {item.key}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {item.value}
              </td>
              {!!actions && actions(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
