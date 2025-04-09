import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Table, Modal } from "@/components";
import { Input } from "@/components/ui/input";

import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RestClientHeader, restClientHeaderSchema } from "@/schemas";

interface DataItem {
  id: string | number;
  key: string;
  value: string;
}

const headers = [
  { id: 1, value: "Key" },
  { id: 2, value: "Value" },
];

const defaultValues = {
  key: "",
  value: "",
};

const Headers: FC<{
  query: Record<string, string>;
  onQueryChange: (query: string) => void;
}> = ({ query, onQueryChange }) => {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState<DataItem | null>(null);

  const data: DataItem[] = Object.entries(query).map(([key, value], id) => ({
    key,
    value,
    id,
  }));

  const form = useForm({
    resolver: zodResolver(restClientHeaderSchema),
    mode: "all",
    defaultValues,
  });

  const addNewHeader = async ({ key, value }: RestClientHeader) => {
    addParam({ key, value });
    handleClose();
  };

  const addParam = ({ key, value }: RestClientHeader) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    onQueryChange(params.toString());
  };

  const removeHeader = async (value: DataItem) => {
    removeParam(value.key);
  };

  const removeParam = (paramName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramName);
    onQueryChange(params.toString());
  };

  const updateHeader = async ({ key, value }: RestClientHeader) => {
    handleClose();
    addParam({ key, value });
  };

  const handleClose = () => {
    setIsOpen(false);
    setUpdatedItem(null);
    form.reset(defaultValues);
  };

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle>Headers:</CardTitle>
        <CardAction>
          <Button onClick={() => setIsOpen(true)}>Add Header</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 py-6">
        <Table
          data={data}
          headers={headers}
          actions={(row) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => {
                  form.reset(row);
                  setUpdatedItem(row);
                  setIsOpen(true);
                }}
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => removeHeader(row)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </td>
          )}
        />
      </CardContent>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={updatedItem ? "Update Header" : "New Header"}
      >
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                updatedItem ? updateHeader : addNewHeader,
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="key"
                        disabled={!!updatedItem}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="value" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-green-500 hover:bg-green-400">
                {updatedItem ? "Update Header" : "Add Header"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Modal>
    </div>
  );
};

export default Headers;
