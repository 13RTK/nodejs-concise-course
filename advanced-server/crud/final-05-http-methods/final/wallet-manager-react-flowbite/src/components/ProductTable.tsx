import { useSetAtom } from "jotai";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";

import ProductTableItem from "./ProductTableItem";

import { openModalAtom } from "../atoms/modal";
import { Product } from "../types/product";
import { getProducts } from "../services/apiProduct";
import { useQuery } from "@tanstack/react-query";

function ProductTable() {
  const setOpenModal = useSetAtom(openModalAtom);

  const { isPending, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      {isError && <h1 className="text-7xl">Error</h1>}
      {isPending && <h1 className="text-7xl">Loading...</h1>}
      {!isPending && (
        <main>
          {data?.length === 0 && <h1 className="text-7xl">No Products</h1>}
          {(data ?? []).length > 0 && (
            <div className="overflow-x-auto">
              <Table hoverable>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>
                      <span className="sr-only">Edit</span>
                    </TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                  {data?.map((product: Product) => (
                    <ProductTableItem key={product.id} item={product} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <Button className="mx-auto" onClick={() => setOpenModal(true)}>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                clipRule="evenodd"
              />
            </svg>
            Bookkeeping
          </Button>
        </main>
      )}
    </>
  );
}

export default ProductTable;
