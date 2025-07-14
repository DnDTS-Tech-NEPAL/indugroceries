import { useState } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import Sidebar from "./Sidebar";
import PersonalInfo from "./PersonalInfo";
import Orders from "./Orders";
import Returns from "./Returns";
import Reviews from "./Reviews";
import {
  AccountLogout,
  AccountOrders,
  AccountPersonal,
  AccountReturns,
  AccountReviews,
} from "@/assets/svg";
import { useQueryClient } from "@tanstack/react-query";
import { removeTokenFromClient } from "@/service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export default function AccountDashboard() {
  const [activeSection, setActiveSection] = useState("personal");
  const bgColor = useColorModeValue("white", "gray.800");
  const sidebarItems = [
    {
      id: "personal",
      label: "Personal",
      icon: AccountPersonal,
      active: activeSection === "personal",
    },
    {
      id: "orders",
      label: "Orders",
      icon: AccountOrders,
      active: activeSection === "orders",
    },

    {
      id: "reviews",
      label: "Reviews",
      icon: AccountReviews,
      active: activeSection === "reviews",
    },
    {
      id: "returns",
      label: "Returns & Cancellations",
      icon: AccountReturns,
      active: activeSection === "returns",
    },
    { id: "logout", label: "Logout", icon: AccountLogout, active: false },
  ];
  const orders = [
    {
      id: "ORD-81/82-00001",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jul 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00002",
      total: "3,005",
      quantity: 2,
      status: "Cancelled",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00003",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00004",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];
  const returns = [
    {
      name: "Biotique Bio Papaya Face wash",
      price: "Rs. 305",
      quantity: 1,
      status: "Returned",
      date: "21 Jul 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 400",
      quantity: 2,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 235",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 200",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 50",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    removeTokenFromClient();
    queryClient.resetQueries({ queryKey: ["user-profile"] });
    router.push(ROUTES.APP.HOMEPAGE);
    //Clear cart and wishlist count
    queryClient.resetQueries({ queryKey: ["cart-count"] });
    queryClient.resetQueries({
      queryKey: ["wishlist-count"],
      guid: localStorage.getItem("guest_id"),
    });
    queryClient.resetQueries({ queryKey: ["payment-method"] });
  };

  return (
    <Box minH="100vh">
      <Container maxW="7xl" py={8}>
        <Flex gap={8}>
          <Box
            bg={bgColor}
            rounded="lg"
            border="1px solid"
            height={"fit-content"}
            borderColor={"#2E2E2E24"}
            py={6}
            px={2}
          >
            {/* <Sidebar items={sidebarItems} onSelect={setActiveSection} /> */}
            <Sidebar
              items={sidebarItems}
              onSelect={(id) => {
                if (id === "logout") {
                  handleLogout();
                } else {
                  setActiveSection(id);
                }
              }}
            />
          </Box>

          <Box flex={1}>
            {activeSection === "personal" && <PersonalInfo />}
            {activeSection === "orders" && <Orders orders={orders} />}
            {activeSection === "returns" && <Returns returns={returns} />}
            {activeSection === "reviews" && <Reviews />}
            {/* {activeSection === "wishlist" && <Wishlist />}
            {activeSection === "payment" && <Payment />} */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
