import * as React from "react"

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className || ""}`} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`border-b-2 border-slate-900 bg-slate-50 ${className || ""}`} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`divide-y-2 divide-slate-900 ${className || ""}`} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b-2 border-slate-900 bg-white transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-100 ${
        className || ""
      }`}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`h-10 px-4 text-left align-middle font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600 [&:has([role=checkbox])]:pr-0 ${
        className || ""
      }`}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`p-4 align-middle font-mono text-xs text-slate-900 [&:has([role=checkbox])]:pr-0 ${
        className || ""
      }`}
      {...props}
    />
  )
}
