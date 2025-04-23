import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

import { ProductService } from '../service/ProductService';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function TodoList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 5))
    );
  }, []);

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const itemTemplate = (product: Product, index: number) => {
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
            { 'border-top-1 surface-border': index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/QWER_Southkorean_band.png/500px-QWER_Southkorean_band.png`}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>

              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {/* Edit function */}
              <Button
                icon="pi pi-pen-to-square"
                className="p-button-rounded"
              ></Button>
              {/* Delete function */}
              <Button
                icon="pi pi-trash"
                className="p-button-rounded"
                severity="danger"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items: Product[]) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="card">
      <DataView value={products} listTemplate={listTemplate} />
    </div>
  );
}
