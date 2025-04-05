"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
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
  id: number;
  key: string;
  value: string;
}

export default function Headers() {
  const headers = [
    { id: 1, value: "Key" },
    { id: 2, value: "Value" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  const form = useForm({
    resolver: zodResolver(restClientHeaderSchema),
    mode: "all",
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const addNewHeader = async ({ key, value }: RestClientHeader) => {
    const newData = [...data, { id: data.length, key, value }];
    setData(newData);
    setIsOpen(false);
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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Header"
      >
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addNewHeader)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="key" />
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
                Add Header
              </Button>
            </form>
          </Form>
        </CardContent>
      </Modal>
    </div>
  );
}
