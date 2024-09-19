import React, { useEffect, useState } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Header from '@/components/header';
import WordFadeIn from '@/components/magicui/word-fade-in';
import { DockDemo } from '@/components/dockdemo';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/magicui/border-beam';
import { ShieldCheck, ShoppingCart, UserRoundPlus, UsersRound } from 'lucide-react';
import NumberTicker from '@/components/magicui/number-ticker';

export type Payment = {
  id: string;
  name: string;
  username: string;
  phone: number;
  email: string;
  orders: number;
  ordertotal: number;
  customersince: string;
  status: 'Activo' | 'Suspended';
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <div className="capitalize">{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="capitalize">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'orders',
    header: 'Orders',
    cell: ({ row }) => <div className="capitalize">{row.getValue('orders')}</div>,
  },
  {
    accessorKey: 'ordertotal',
    header: 'Order Total',
    cell: ({ row }) => <div className="capitalize">{row.getValue('ordertotal')}</div>,
  },
  {
    accessorKey: 'customersince',
    header: 'Customer Since',
    cell: ({ row }) => <div className="capitalize">{row.getValue('customersince')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      const isActive = status === 'Activo';
      return (
        <div className="capitalize">
          <Badge
            className={`rounded-md ${isActive ? 'bg-[#32936f2a] text-[#519C66]' : 'bg-[#e74c3c2a] text-[#e74c3c]'}`}
          >
          </Badge>
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link to={`/profile/${row.getValue('username')}`}>
            <DropdownMenuItem>View profile</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function Customers() {
  const [data, setData] = useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/network');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <Header />
      <DockDemo />
      <div className="w-full p-3 sm:p-14">
        <WordFadeIn className="text-3xl font-bold" words="Customers" />
        <div className="grid xl:grid-cols-4 md:grid-cols-2 mt-12 grid-cols-1 gap-7">
          <div className="h-[130px] relative border rounded-[0.6rem] p-7 flex justify-center flex-col">
            <BorderBeam size={50} duration={12} delay={9} />
            <div className="flex justify-between flex-row mb-1 items-center">
              <h4 className="text-sm font-medium">All Customers</h4>
              <UsersRound width={18} height={18} color="hsl(var(--muted-foreground))" />
            </div>
            <h1 className="text-2xl font-extrabold"><NumberTicker value={1250} /></h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">+21%</p>
          </div>
          <div className="h-[130px] relative border rounded-[0.6rem] p-7 flex justify-center flex-col">
            <BorderBeam size={50} duration={12} delay={9} />
            <div className="flex justify-between flex-row mb-1 items-center">
              <h4 className="text-sm font-medium">Active</h4>
              <ShieldCheck width={18} height={18} color="hsl(var(--muted-foreground))" />
            </div>
            <h1 className="text-2xl font-extrabold">$<NumberTicker value={1180} /></h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">+85%</p>
          </div>
          <div className="h-[130px] border relative rounded-[0.6rem] p-7 flex justify-center flex-col">
            <BorderBeam size={50} duration={12} delay={9} />
            <div className="flex justify-between flex-row mb-1 items-center">
              <h4 className="text-sm font-medium">New Customers</h4>
              <UserRoundPlus width={18} height={18} color="hsl(var(--muted-foreground))" />
            </div>
            <h1 className="text-2xl font-extrabold"><NumberTicker value={30} /></h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">-20%</p>
          </div>
          <div className="h-[130px] border rounded-[0.6rem] relative p-7 flex justify-center flex-col">
            <BorderBeam size={50} duration={12} delay={9} />
            <div className="flex justify-between flex-row mb-1 items-center">
              <h4 className="text-sm font-medium">Purchasing</h4>
              <ShoppingCart width={18} height={18} color="hsl(var(--muted-foreground))" />
            </div>
            <h1 className="text-2xl font-extrabold"><NumberTicker value={657} /></h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">+20%</p>
          </div>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Name..."
            value={[(table.getColumn('name')?.getFilterValue() as string) ?? '']}
            onChange={(event) => {
              table.getColumn('name')?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}