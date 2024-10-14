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
  Textarea,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddItemProps {
  isOpen: boolean
  onClose: () => void
}

const AddItem = ({ isOpen, onClose }: AddItemProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
      aiwscode: "",
      name: "",
      location: "",
      expiry: "",
      stk: "",
      mtk: "",
      lot: "",
      serial: "",
      notes: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ItemCreate) =>
      ItemsService.createItem({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Item created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const onSubmit: SubmitHandler<ItemCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                {...register("title", {
                  required: "Title is required.",
                })}
                placeholder="Title"
                type="text"
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.aiwscode}>
              <FormLabel htmlFor="aiwscode">AIWSCODE</FormLabel>
              <Input
                id="aiwscode"
                {...register("aiwscode", {
                  required: "AIWSCODE is required.",
                })}
                placeholder="AIWSCODE"
                type="text"
              />
              {errors.aiwscode && (
                <FormErrorMessage>{errors.aiwscode.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is required.",
                })}
                placeholder="Name"
                type="text"
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.location}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                {...register("location", {
                  required: "Location is required.",
                })}
                placeholder="Location"
                type="text"
              />
              {errors.location && (
                <FormErrorMessage>{errors.location.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.expiry}>
              <FormLabel htmlFor="expiry">Expiry</FormLabel>
              <Input
                id="expiry"
                {...register("expiry")}
                placeholder="Expiry (YYYY-MM-DD)"
                type="date"
              />
              {errors.expiry && (
                <FormErrorMessage>{errors.expiry.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.stk}>
              <FormLabel htmlFor="stk">STK</FormLabel>
              <Input
                id="stk"
                {...register("stk")}
                placeholder="Stock"
                type="date"
              />
              {errors.stk && (
                <FormErrorMessage>{errors.stk.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.mtk}>
              <FormLabel htmlFor="mtk">MTK</FormLabel>
              <Input
                id="mtk"
                {...register("mtk")}
                placeholder="Minimum Threshold"
                type="date"
              />
              {errors.mtk && (
                <FormErrorMessage>{errors.mtk.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.lot}>
              <FormLabel htmlFor="lot">Lot</FormLabel>
              <Input
                id="lot"
                {...register("lot")}
                placeholder="Lot Number"
                type="text"
              />
              {errors.lot && (
                <FormErrorMessage>{errors.lot.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.serial}>
              <FormLabel htmlFor="serial">Serial</FormLabel>
              <Input
                id="serial"
                {...register("serial")}
                placeholder="Serial Number"
                type="text"
              />
              {errors.serial && (
                <FormErrorMessage>{errors.serial.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.notes}>
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Additional notes"
              />
              {errors.notes && (
                <FormErrorMessage>{errors.notes.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddItem
