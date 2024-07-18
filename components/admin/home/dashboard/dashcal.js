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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { SearchIcon } from './SearchIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { columns, statusOptions } from './data';
import { capitalize } from './utils';
import Popupmodel from './popupmodel';
import { MdDelete } from "react-icons/md";
import Popupeditmodel from './popupeditmodel';
;

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'email', 'checking_date', 'checkout_date'];

export default function Dashcal({ Logedusername }) {
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    if (startDate && endDate) {
      filteredUsers = filteredUsers.filter((user) => {
        const checkingDate = new Date(user.checking_date);
        return checkingDate >= new Date(startDate) && checkingDate <= new Date(endDate);
      });
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, startDate, endDate]);

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

  const fetchData = async () => {
    try {
      const response = await fetch('/api/booking', { cache: "no-store" });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetching Error: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/booking', { cache: "no-store" });
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

  const deleteUser = async (user) => {
    const id = user.id;
    try {
      if (confirm("Do You need to Delete this Booking.")) {
        const response = await fetch(`/api/booking/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          alert('Failed to delete booking');
        }
        alert('Booking deleted successfully');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }

  const renderCell = React.useCallback((user, columnKey, id) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
     
      case 'actions':
        return (
          <div className="relative flex items-center">
            <div className=' flex flex-row gap-3'>
              <button className=' '><Popupeditmodel data={user} action={true} onUpdateSuccess={handleUpdateSuccess} /></button>
              <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-black text-white font-bold -mt-1 hover:opacity-75" onClick={() => deleteUser(user)}>Delete Booking</button>
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

  const generatePDF = () => {
    const input = document.getElementById('table-to-print');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('./../../../../public/Logo.webp');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save('Booking-Details.pdf');
      pdf.setFontSize(16);
      const margin = 5;
      // pdf.text('Booking Details', 15, 15); 
      const headerText = `Booking Details${startDate && endDate ? ` From ${startDate} To ${endDate}` : ''}`;
      // pdf.text("Booking Details+`${startDate && endDate ? ` From ${startDate} To ${endDate}` : ' '}"); // Adding header text with date range
      pdf.text(headerText, margin, margin + 10);
      pdf.addImage(imgData, 'PNG', 15, 25, pdfWidth - 25, pdfHeight); // Adjust coordinates and size as needed

      pdf.save('Booking-Details.pdf');
    });
  };



  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-[2.5rem] items-end">
          <div className=' w-[30%] my-auto'>
            <Input
              isClearable
              classNames={{
                base: 'w-full mobile:w-[40%] laptop:w-[100%] my-auto',
                inputWrapper: 'border-1',
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
          </div>
          <div className="flex gap-2 w-[70%] justify-end my-auto">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              size=""
              className="border-1 w-[25vw] rounded-sm h-fit  my-auto"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              size=""
              className="border-1 w-[25vw] ml-3 rounded-sm h-fit  my-auto"
            />
            <Dropdown>
              <DropdownTrigger className="hidden mobile:flex mt-[8px] my-auto px-2">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="md"
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
            <Popupmodel action={true} onUpdateSuccess={handleUpdateSuccess} />
            <Button onClick={generatePDF} className=' bg-green-700 text-white font-bold text-lg'>Print</Button>

          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, startDate, endDate, onSearchChange]);

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
    <div className=' mt-[2vh] w-[98%]'>
      <Table
        id="table-to-print"
        aria-label="Example table with dynamic content"
        bottomContent={bottomContent}
        classNames={{
          base: 'border-1 ml-3 p-4',
          table: 'min-h-auto max-h-[80vh] w-[78vw] overflow-scroll',
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
            <TableRow key={user.id} className=' hover:bg-slate-400'>
              {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  );
}

