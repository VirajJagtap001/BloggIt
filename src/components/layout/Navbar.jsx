import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Tooltip,
  Image,
  Icon,
} from "@chakra-ui/react";
import logo from "../../../logo.png";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { LOGIN, REGISTER, ROOT } from "../../lib/routes";
import { Link as RouterLink } from "react-router-dom";
import Newpost from "../posts/NewPost";
import { useLogout, useAuth } from "../../hooks/auths";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, isLoading } = useLogout();
  const { user, authLoading } = useAuth();
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const Links = [
    { id: 1, path: ROOT, name: "Home" },
    { id: 2, path: LOGIN, name: "Sign in" },
    { id: 3, path: REGISTER, name: "Create an account" },
  ];

  return (
    <Container maxW="1300px">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"lg"}
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as="b" fontSize="xl">
              <Link
                as={RouterLink}
                to={ROOT}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Image src={logo} alt="Logo" height="60px" />
              </Link>
            </Box>

            <HStack as={"nav"} spacing={6} display={{ base: "none", md: "flex" }}>
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={4}
                    py={2}
                    as={RouterLink}
                    to={link.path}
                    fontSize="md"
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={4}
                  py={2}
                  fontSize="lg"
                  rounded={"lg"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Tooltip label={ colorMode === "light" ? "Go Dark!" : "Go Light!"}>
              <Button mr={4} onClick={toggleColorMode} size="lg">
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Tooltip>
            {user ? (
              <Tooltip label="Your Words, Your World - Start Blogging!">
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"md"}
                  fontSize="md"
                  mr={4}
                  onClick={onModalOpen}
                  leftIcon={<AddIcon />}
                >
                  Create Post
                </Button>
              </Tooltip>
            ) : (
              <Tooltip label="Activate me, captain! Login required">
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"md"}
                  fontSize="md"
                  isDisabled={true}
                  mr={4}
                  onClick={onModalOpen}
                  leftIcon={<AddIcon />}
                >
                  Action
                </Button>
              </Tooltip>
            )}
            
            <Modal
              closeOnOverlayClick={false}
              isOpen={isModalOpen}
              onClose={onModalClose}
              size={"xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={12}>
                  <Newpost onModalClose={onModalClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
            
            {user && (
              <Tooltip label="Don't forget to log out before you go!">
                <Button
                  ml="auto"
                  colorScheme="teal"
                  size="md"
                  fontSize="md"
                  onClick={logout}
                  isLoading={isLoading}
                >
                  <Icon as={RiLogoutCircleLine} />
                </Button>
              </Tooltip>
            )}
          </Flex>
        </Flex>

        {isMenuOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={4}
                    py={2}
                    as={RouterLink}
                    to={link.path}
                    fontSize="md"
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={4}
                  py={2}
                  fontSize="lg"
                  rounded={"lg"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
