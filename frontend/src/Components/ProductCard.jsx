import {
  Box,
  Image,
  Heading,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  useDisclosure,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProducts, setUpdatedProducts] = useState(product);
  const handleUpdate = async (pid, updatedProducts) => {
    const {success,message} = await updateProduct(pid, updatedProducts);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        });
    }
    else{
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        });
    }
  };
  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
      });
    } else {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully",
        status: "success",
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" mb={4} fontSize="xl" color={textColor}>
          ${product.price}
        </Text>
        <HStack>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={updatedProducts.name}
                onChange={(e) =>
                  setUpdatedProducts({
                    ...updatedProducts,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Product price"
                name="price"
                type="number"
                value={updatedProducts.price}
                onChange={(e) =>
                  setUpdatedProducts({
                    ...updatedProducts,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image-URL"
                name="image"
                value={updatedProducts.image}
                onChange={(e) =>
                  setUpdatedProducts({
                    ...updatedProducts,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProducts)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
