import {
  Container,
  Heading,
  Box,
  VStack,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newproduct, setnewproduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const toast = useToast();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newproduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product Added",
        description: "Product has been added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setnewproduct({name:"",price:"",image:""})
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newproduct.name}
              onChange={(e) =>
                setnewproduct({ ...newproduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product price"
              name="price"
              type="number"
              value={newproduct.price}
              onChange={(e) =>
                setnewproduct({ ...newproduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image-URL"
              name="image"
              value={newproduct.image}
              onChange={(e) =>
                setnewproduct({ ...newproduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
