import { TableCell, TableRow } from "flowbite-react";
import { Product } from "../types/product";

function ProductTableItem({ item }: { item: Product }) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
        {item.name}
      </TableCell>
      <TableCell>{item.color}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>
        <a
          href="#"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </a>
        <a
          href="#"
          className="ml-4 font-medium text-red-600 hover:underline dark:text-red-500"
        >
          Delete
        </a>
      </TableCell>
    </TableRow>
  );
}

export default ProductTableItem;
