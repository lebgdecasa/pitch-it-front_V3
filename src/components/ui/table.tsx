// src/components/ui/table.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';

export interface TableColumn {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (props: { row: any }) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
  getRowId: (row: any) => string;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b bg-gray-50/50", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export function DataTable({
  data,
  columns,
  getRowId,
  selectable = false,
  onSelectionChange
}: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc' | null;
  }>({ key: '', direction: null });

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(sortedData.map(row => getRowId(row)));
      setSelectedRows(newSelected);
      onSelectionChange?.(Array.from(newSelected));
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  // Sort handler
  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === column.accessorKey) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    setSortConfig({ key: column.accessorKey, direction });
  };

  const getSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;
    if (sortConfig.key !== column.accessorKey) return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
    if (sortConfig.direction === 'asc') return <ChevronUp className="w-4 h-4" />;
    if (sortConfig.direction === 'desc') return <ChevronDown className="w-4 h-4" />;
    return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-14">
              <Checkbox
                checked={sortedData.length > 0 &&
                  sortedData.every(row => selectedRows.has(getRowId(row)))}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className={cn(
                column.sortable && "cursor-pointer hover:bg-gray-100",
                "group"
              )}
              onClick={() => handleSort(column)}
            >
              <div className="flex items-center gap-2">
                {column.header}
                {getSortIcon(column)}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => {
          const rowId = getRowId(row);
          return (
            <TableRow
              key={rowId}
              data-state={selectedRows.has(rowId) ? "selected" : undefined}
            >
              {selectable && (
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(rowId)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(rowId, checked as boolean)}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.cell
                    ? column.cell({ row })
                    : row[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
};
