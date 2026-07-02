interface ExportConfig<T> {
  data: T[];
  filename?: string;
  columns: {
    header: string;
    key: keyof T | ((item: T) => string);
  }[];
}

export const downloadCSV = <T>({
  data,
  columns,
  filename = "export",
}: ExportConfig<T>) => {
  const headers = columns.map((col) => col.header);
  const rows = data.map((item) =>
    columns.map((col) => {
      const value =
        typeof col.key === "function" ? col.key(item) : item[col.key];
      const cleanValue = String(value ?? "").replace(/"/g, '""');
      return `"${cleanValue}"`;
    }),
  );
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}_${new Date().toISOString().split("T")[0]}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
