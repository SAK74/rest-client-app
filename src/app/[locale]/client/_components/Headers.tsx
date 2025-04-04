import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Headers() {
  const data = [
    { id: 1, key: "key 1", value: "key 1" },
    { id: 2, key: "key 2", value: "key 2" },
    { id: 3, key: "key 3", value: "key 3" },
  ];

  const headers = [
    { id: 1, value: "Key" },
    { id: 2, value: "Value" },
  ];

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle>Headers:</CardTitle>
        <CardAction>
          <Button>Add Header</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 py-6">
        <Table
          data={data}
          headers={headers}
          actions={
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                Delete
              </button>
            </td>
          }
        />
      </CardContent>
    </div>
  );
}
