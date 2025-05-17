import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { openModalAtom } from "../atoms/modal";
import { addProduct as addProductApi } from "../services/apiProduct";

function AddProductModal() {
  const [openModal, setOpenModal] = useAtom(openModalAtom);

  const queryClient = useQueryClient();
  const { mutate: addProduct, isPending: isAddingProduct } = useMutation({
    mutationFn: addProductApi,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Adding product...");

    // get data from form
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const color = formData.get("color") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    const newProduct = {
      id: Date.now(),
      name,
      price,
      color,
      category,
      description,
    };

    addProduct(newProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.dismiss();
        toast.success("Event has been created");
        setOpenModal(false);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(error.message);
      },
    });
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
      <ModalHeader>Create New Product</ModalHeader>
      <ModalBody>
        {/* TODO: Missing validation */}
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name" />
              <TextInput
                id="name"
                type="text"
                name="name"
                placeholder="Type product name"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="price" />
              <TextInput
                id="price"
                type="number"
                placeholder="Type product price"
                required
                name="price"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="category" />
              <Select id="category" required name="category">
                <option value="">Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="Gaming">Gaming</option>
                <option value="Phone">Phone</option>
                <option value="Album">Album</option>
                <option value="Accessories">Accessories</option>
                <option value="Laptop">Laptop</option>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="color" />
              <TextInput
                id="color"
                type="text"
                placeholder="Type product color"
                required
                name="color"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description" />
              <Textarea
                id="description"
                placeholder="Type product description"
                required
                name="description"
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" disabled={isAddingProduct}>
            <svg
              className="-ms-1 me-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default AddProductModal;
