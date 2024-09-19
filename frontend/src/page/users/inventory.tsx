import React, { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export type Payment = {
  id: string;
  productName: string;
  category: string;
  unitPrice: number;
  stock: number | "Out of Stock";
  discount: number;
  totalValue: number;
  status: "enabled" | "disabled";
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'productName',
    header: 'Product Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('productName')}</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="capitalize">{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => <div className="capitalize">{row.getValue('unitPrice')}</div>,
  },
  {
    accessorKey: 'stock',
    header: 'In-Stock',
    cell: ({ row }) => <div className="capitalize">{row.getValue('stock')}</div>,
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => <div className="capitalize">{row.getValue('discount')}</div>,
  },
  {
    accessorKey: 'totalValue',
    header: 'Total Value',
    cell: ({ row }) => <div className="capitalize">{row.getValue('totalValue')}</div>,
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
];

export function Inventory() {
  const [data, setData] = useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/inventory');
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
        <div className='flex justify-between'>
        <WordFadeIn className="text-3xl font-bold" words="Inventory" />
        <Link to="/inventory/add"><Button><Plus width={17} height={17} className="mr-2" /> Add a New Product</Button></Link>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Name..."
            value={[(table.getColumn('productName')?.getFilterValue() as string) ?? '']}
            onChange={(event) => {
              table.getColumn('productName')?.setFilterValue(event.target.value);
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
                    No products registered.
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