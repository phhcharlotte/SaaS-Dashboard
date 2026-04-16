import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { toast } from "react-toastify";

export const useProducts = (params: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    keepPreviousData: true,
  });

  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const update = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { ...query, create, update, remove };
};
