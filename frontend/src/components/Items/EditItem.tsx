import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea, // Ensure this is imported for notes field
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  type ApiError,
  type ItemPublic,
  type ItemUpdate,
  ItemsService,
} from "../../client";
import useCustomToast from "../../hooks/useCustomToast";
import { handleError } from "../../utils";

interface EditItemProps {
  item: ItemPublic;
  isOpen: boolean;
  onClose: () => void;
}

const EditItem = ({ item, isOpen, onClose }: EditItemProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ItemUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: item,
  });

  const mutation = useMutation({
    mutationFn: (data: ItemUpdate) =>
      ItemsService.updateItem({ id: item.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Item updated successfully.", "success");
      onClose();
    },
    onError: (err: ApiError) => {
      handleError(err, showToast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const onSubmit: SubmitHandler<ItemUpdate> = async (data) => {
    mutation.mutate(data);
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              type="text"
            />
            {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.aiwscode}>
            <FormLabel htmlFor="aiwscode">AIWSCODE</FormLabel>
            <Input
              id="aiwscode"
              {...register("aiwscode", { required: "AIWSCODE is required" })}
              type="text"
            />
            {errors.aiwscode && <FormErrorMessage>{errors.aiwscode.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              type="text"
            />
            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.location}>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              {...register("location", { required: "Location is required" })}
              type="text"
            />
            {errors.location && <FormErrorMessage>{errors.location.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.expiry}>
            <FormLabel htmlFor="expiry">Expiry</FormLabel>
            <Input
              id="expiry"
              {...register("expiry")}
              placeholder="Expiry (YYYY-MM-DD)"
              type="date"
            />
            {errors.expiry && <FormErrorMessage>{errors.expiry.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.stk}>
            <FormLabel htmlFor="stk">Stock (STK)</FormLabel>
            <Input
              id="stk"
              {...register("stk", { required: "Stock is required" })}
              type="number"
            />
            {errors.stk && <FormErrorMessage>{errors.stk.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.mtk}>
            <FormLabel htmlFor="mtk">Minimum Threshold (MTK)</FormLabel>
            <Input
              id="mtk"
              {...register("mtk", { required: "Minimum threshold is required" })}
              type="number"
            />
            {errors.mtk && <FormErrorMessage>{errors.mtk.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.lot}>
            <FormLabel htmlFor="lot">Lot</FormLabel>
            <Input id="lot" {...register("lot")} placeholder="Lot" type="text" />
            {errors.lot && <FormErrorMessage>{errors.lot.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.serial}>
            <FormLabel htmlFor="serial">Serial</FormLabel>
            <Input id="serial" {...register("serial")} placeholder="Serial" type="text" />
            {errors.serial && <FormErrorMessage>{errors.serial.message}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.notes}>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea id="notes" {...register("notes")} placeholder="Notes" />
            {errors.notes && <FormErrorMessage>{errors.notes.message}</FormErrorMessage>}
          </FormControl>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button variant="primary" type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditItem;
