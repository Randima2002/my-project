import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import CreateUserModel from "./createmodel";
import Updatemodel from "./updatemodel";

export default function User() {
  const [refresh, setRefresh] = useState(false);

  const handleUpdateSuccess = () => {
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Do You need to Delete this Booking.")){
        await fetch(`/api/user/${id}`, {
          method: "DELETE",
        });
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error("Delete Error: ", error);
    }
  };

  let list = useAsyncList({
    async load({ signal }) {
      try {
        const response = await fetch("/api/user", { cache: "no-store", signal });
        const data = await response.json();
        return {
          items: data,
        };
      } catch (error) {
        console.error("Fetching Error: ", error);
        return { items: [] };
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  // Refresh the data when refresh state changes
  React.useEffect(() => {
    list.reload();
  }, [refresh]);

  return (
    <>
      <div className="w-full flex justify-end h-auto">
        <CreateUserModel action={true} pagefresh={handleUpdateSuccess} />
      </div>
      <Table
        aria-label="Example table with client-side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-auto ",
        }}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Name
          </TableColumn>
          <TableColumn key="email" >
            Email
          </TableColumn>
          <TableColumn key="nic" >
            NIC
          </TableColumn>
          <TableColumn key="contact" >
            Contact No
          </TableColumn>
          <TableColumn key="isadmin" >
            User Type
          </TableColumn>
          <TableColumn key="username" >
            User name
          </TableColumn>
          <TableColumn key="actions">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={list.isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                columnKey === "actions" ? (
                  <TableCell className=" flex flex-row gap-2">
                    <button className=" "><Updatemodel data={user} action={true} onUpdateSuccess={handleUpdateSuccess} /></button>
                    <button onClick={() => handleDelete(user.id)} className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-black text-white font-bold -mt-1 hover:opacity-75">Delete</button>
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(user, columnKey)}</TableCell>
                )
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
