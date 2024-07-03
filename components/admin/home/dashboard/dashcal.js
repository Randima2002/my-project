// dashcal.js
'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react';
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { SearchIcon } from './SearchIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { columns, statusOptions } from './data';
import { capitalize } from './utils';
import Popupmodel from './popupmodel';
import { MdDelete } from "react-icons/md";
import Popupeditmodel from './popupeditmodel';

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'email', 'checking_date', 'checkout_date', 'actions'];

export default function Dashcal() {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'checking_date',
    direction: 'descending',
  });
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/booking',{cache:"no-store"});
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Fetching Error: ', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleUpdateSuccess = () => {
    setRefresh(!refresh);
};

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'ascending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const deleteuser = async (user) => {
    const id = user.id;
    try {
      if (confirm("Do You need to Delete this Booking.")) {
        const response = await fetch(`/api/booking/${id}`, {
          method: 'DELETE',
        });

      }

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      handleUpdateSuccess();

      console.log('Booking deleted successfully');

    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }

  const renderCell = React.useCallback((user, columnKey, id) => {
    const cellValue = user[columnKey];
    // const cellid = user.id;
    // console.log("user : " ,user);
    // console.log("columnKey : " ,columnKey)
    // console.log("cellValue : " ,cellValue)
    // console.log("cellid : " , id)
    switch (columnKey) {
      // case 'name':
      //   return (
      //     <User
      //       avatarProps={{ radius: 'full', size: 'sm', src: user.avatar }}
      //       classNames={{
      //         description: 'text-default-500',
      //       }}
      //       description={user.email}
      //       name={cellValue}
      //     >
      //       {user.email}
      //     </User>
      //   );
      // case 'role':
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
      //     </div>
      //   );
      // case 'status':
      //   return (
      //     <Chip
      //       className="capitalize border-none gap-1 text-default-600"
      //       color={statusColorMap[user.status]}
      //       size="sm"
      //       variant="dot"
      //     >
      //       {cellValue}
      //     </Chip>
      //   );
      case 'actions':
        return (
          <div className="relative flex items-center">
            {/* <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem onClick={() => editBooking(user.id)}>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            <div className=' flex flex-row gap-3'>
              <button className=' '><Popupeditmodel data={user} action={true} onUpdateSuccess={handleUpdateSuccess} /></button>
              <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-black text-white font-bold -mt-1 hover:opacity-75" onClick={() => deleteuser(user)}>Delete Booking</button>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: 'w-full ml-3 mobile:max-w-[40%] ',
              inputWrapper: 'border-1 ml-3',
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300 mr-3" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
            className=" border-none"
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden mobile:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden mobile:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Popupmodel action={true} onUpdateSuccess={handleUpdateSuccess}/>
            {/* <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Add New
            </Button> */}
            {/* <Button size="md" startContent={<PlusIcon fill="currentColor" />}>
              New Booking
            </Button> */}
          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, onSearchChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label>
            Rows per page:
            <select value={rowsPerPage} onChange={onRowsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
        </div>
        <Pagination
          showControls
          isCompact
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  }, [page, pages, rowsPerPage, onRowsPerPageChange]);

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={bottomContent}
      classNames={{
        base: 'border-1 ml-3',
        table: 'min-h-[440px]',
      }}
      sortDescriptor={sortDescriptor}
      stickyHeader
      topContent={topContent}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No users found" items={sortedItems}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

