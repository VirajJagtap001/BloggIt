import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddPost } from "../../hooks/posts";
import { useAuth } from "../../hooks/auths";
import { useState } from "react";

export default function SimpleCard({ onModalClose }) {
  const { addPost, isLoading } = useAddPost();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const toast = useToast();

  const [imageBase64, setImageBase64] = useState(null);

  const handleAddPost = async (data) => {
    if (!imageBase64) {
      toast({
        title: "Image is required",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      return;
    }

    await addPost({
      uid: user.id,
      title: data.title,
      desc: data.desc,
      imageUrl: imageBase64,
    });
    reset();
    onModalClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageBase64(null);
    }
  };

  return (
    <Flex minH={"40vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"90%"} minW={"90%"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add new post</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack>
            <form onSubmit={handleSubmit(handleAddPost)}>
              <FormControl id="title" isInvalid={errors.title}>
                <FormLabel>Blog Title</FormLabel>
                <Input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 120,
                      message: "Title must be less than 120 characters",
                    },
                  })}
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="image" isInvalid={errors.image}>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {errors.image && (
                  <FormErrorMessage>{errors.image.message}</FormErrorMessage>
                )}
                {!imageBase64 && (
                  <FormHelperText>Image is required for the post.</FormHelperText>
                )}
              </FormControl>

              <FormControl id="desc" isInvalid={errors.desc}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
                  as={TextareaAutosize}
                  minRows={5}
                  resize={"none"}
                  {...register("desc", {
                    required: "Description is required",
                  })}
                />
                {errors.desc && (
                  <FormErrorMessage>{errors.desc.message}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt={"10px"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Loading..."}
                >
                  Hit the Big Blue Button! POST
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
