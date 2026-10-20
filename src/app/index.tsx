import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const FOOD = [
  // FAST FOOD - 10
  {
    id: "1",
    name: "Classic Burger",
    category: "Fast Food",
    price: 650,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  },
  {
    id: "2",
    name: "Zinger Burger",
    category: "Fast Food",
    price: 750,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
  },
  {
    id: "3",
    name: "Chicken Burger",
    category: "Fast Food",
    price: 700,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
  },
  {
    id: "4",
    name: "Chicken Shawarma",
    category: "Fast Food",
    price: 450,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
  },
  {
    id: "5",
    name: "Chicken Strips",
    category: "Fast Food",
    price: 550,
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800",
  },
  {
    id: "6",
    name: "Loaded Fries",
    category: "Fast Food",
    price: 450,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
  },
  {
    id: "7",
    name: "Chicken Nuggets",
    category: "Fast Food",
    price: 500,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800",
  },
  {
    id: "8",
    name: "Grilled Sandwich",
    category: "Fast Food",
    price: 500,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
  },
  {
    id: "9",
    name: "Club Sandwich",
    category: "Fast Food",
    price: 600,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800",
  },
  {
    id: "10",
    name: "Chicken Wrap",
    category: "Fast Food",
    price: 500,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
  },

  // PIZZA - 10
  {
    id: "11",
    name: "Chicken Fajita Pizza",
    category: "Pizza",
    price: 1100,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    id: "12",
    name: "Chicken Tikka Pizza",
    category: "Pizza",
    price: 1100,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  },
  {
    id: "13",
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1250,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
  },
  {
    id: "14",
    name: "Cheese Pizza",
    category: "Pizza",
    price: 950,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800",
  },
  {
    id: "15",
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    price: 1200,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    id: "16",
    name: "Malai Boti Pizza",
    category: "Pizza",
    price: 1200,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800",
  },
  {
    id: "17",
    name: "Vegetable Pizza",
    category: "Pizza",
    price: 900,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800",
  },
  {
    id: "18",
    name: "Creamy Chicken Pizza",
    category: "Pizza",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1618213837799-25d5552820d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JlYW15JTIwY2hpY2tlbiUyMHBpenphfGVufDB8fDB8fHww",
  },
  {
    id: "19",
    name: "Peri Peri Pizza",
    category: "Pizza",
    price: 1150,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    id: "20",
    name: "Mexican Pizza",
    category: "Pizza",
    price: 1150,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  },

  // CROWN CRUST - 5
  {
    id: "21",
    name: "Chicken Crown Crust",
    category: "Crown Crust",
    price: 1350,
    image:
      "https://t4.ftcdn.net/jpg/19/00/24/85/240_F_1900248500_PMy3E7cZaw235NbuCfCBLJixWhplsMz0.jpg",
  },
  {
    id: "22",
    name: "Cheese Crown Crust",
    category: "Crown Crust",
    price: 1250,
    image:
      "https://images.unsplash.com/photo-1672856398893-2fb52d807874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMGNyb3duJTIwY3J1c3QlMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "23",
    name: "BBQ Crown Crust",
    category: "Crown Crust",
    price: 1400,
    image:
      "https://t4.ftcdn.net/jpg/10/56/48/29/240_F_1056482961_Q4efL36fBi5KFy4GIMYPdqx7KbxldowK.jpg",
  },
  {
    id: "24",
    name: "Malai Boti Crown Crust",
    category: "Crown Crust",
    price: 1450,
    image:
      "https://t3.ftcdn.net/jpg/01/68/30/90/240_F_168309033_7AwxJsLto8Wk0W15aarxk8gaCIqr1pGz.jpg",
  },
  {
    id: "25",
    name: "Fajita Crown Crust",
    category: "Crown Crust",
    price: 1400,
    image:
      "https://t4.ftcdn.net/jpg/08/32/30/55/240_F_832305515_zoOIt2mWUxKHII7BY3P6hn7RgjJshK7P.jpg",
  },

  // DESI - 10
  {
    id: "26",
    name: "Chicken Karahi",
    category: "Desi",
    price: 1200,
    image:
      "https://t4.ftcdn.net/jpg/15/35/71/59/240_F_1535715915_YGdZ6bfaJ1KEToyH2hwxDHtjSwIb5Ld1.jpg",
  },
  {
    id: "27",
    name: "Mutton Karahi",
    category: "Desi",
    price: 1800,
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=800",
  },
  {
    id: "28",
    name: "Chicken Biryani",
    category: "Desi",
    price: 450,
    image:
      "https://t3.ftcdn.net/jpg/08/18/97/86/240_F_818978614_BY0RVLq6A8K8v6psl4WkVuRHcokZQH0R.jpg",
  },
  {
    id: "29",
    name: "Chicken Handi",
    category: "Desi",
    price: 1100,
    image:
      "https://t4.ftcdn.net/jpg/13/92/14/21/240_F_1392142152_5ejTaR6SKQ8yYxirShEh0B1lNIzx7EgO.jpg",
  },
  {
    id: "30",
    name: "Chicken Tikka",
    category: "Desi",
    price: 700,
    image:
      "https://t3.ftcdn.net/jpg/07/10/05/16/240_F_710051617_NZe37WWT3N90E1eHuCOWkza0GFJMQK5l.jpg",
  },
  {
    id: "31",
    name: "Seekh Kebab",
    category: "Desi",
    price: 650,
    image:
      "https://t3.ftcdn.net/jpg/04/81/11/52/240_F_481115296_pB8lEZ1pIcYzjtSmGdZq4K5amn1CreZm.jpg",
  },
  {
    id: "32",
    name: "Beef Pulao",
    category: "Desi",
    price: 550,
    image:
      "https://t3.ftcdn.net/jpg/20/03/96/22/240_F_2003962253_zXN8TJ2e4KeaszaRAdC2Hlb1f5Fxw8hg.jpg",
  },
  {
    id: "33",
    name: "Daal Makhani",
    category: "Desi",
    price: 500,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
  },
  {
    id: "34",
    name: "Butter Chicken",
    category: "Desi",
    price: 950,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
  },
  {
    id: "35",
    name: "Chicken Chowmein",
    category: "Desi",
    price: 700,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
  },

  // COLD DRINKS - 6
  {
    id: "36",
    name: "Coca Cola",
    category: "Cold Drinks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1682872368755-f0295f25e945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sYSUyMG5leHR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "37",
    name: "Pepsi",
    category: "Cold Drinks",
    price: 120,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
  },
  {
    id: "38",
    name: "7UP",
    category: "Cold Drinks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1688075806859-dc30dbbc068c?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8N3VwfGVufDB8fDB8fHww",
  },
  {
    id: "39",
    name: "Sprite",
    category: "Cold Drinks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1680404005217-a441afdefe83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3ByaXRlfGVufDB8fDB8fHww",
  },
  {
    id: "40",
    name: "Mountain Dew",
    category: "Cold Drinks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1632161927166-0aea13d8f7e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBkZXd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "41",
    name: "Fanta",
    category: "Cold Drinks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1787453712931-2fe6b53d888d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZhbnRhfGVufDB8fDB8fHww",
  },

  // DRINKS - 6
  {
    id: "42",
    name: "Mint Margarita",
    category: "Drinks",
    price: 350,
    image:
      "https://t4.ftcdn.net/jpg/06/24/20/73/240_F_624207307_GXwGUYbPWmWAEcNEYJrNr2uhZRxGCsZR.jpg",
  },
  {
    id: "43",
    name: "Lemonade",
    category: "Drinks",
    price: 300,
    image:
      "https://t4.ftcdn.net/jpg/08/51/03/59/240_F_851035919_gC7SsF4tWsyaCiNbTpF3AIhFWberKaeG.jpg",
  },
  {
    id: "44",
    name: "Blue Lagoon",
    category: "Drinks",
    price: 400,
    image:
      "https://t3.ftcdn.net/jpg/01/55/10/62/240_F_155106237_0wLx41RGFb6r6vtZf8GAK3iSChKNx7Uo.jpg",
  },
  {
    id: "45",
    name: "Strawberry Mojito",
    category: "Drinks",
    price: 400,
    image:
      "https://t3.ftcdn.net/jpg/02/03/37/20/240_F_203372074_09qIFk6vM8H9ZGcivw7RvwkVoRMOVSWL.jpg",
  },
  {
    id: "46",
    name: "Fresh Lime",
    category: "Drinks",
    price: 250,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
  },
  {
    id: "47",
    name: "Peach Iced Tea",
    category: "Drinks",
    price: 350,
    image:
      "https://t3.ftcdn.net/jpg/16/70/76/70/240_F_1670767084_25hYb4Yf5A326FDpKxvQIG2JpQD78luF.jpg",
  },

  // DESSERTS - 5
  {
    id: "48",
    name: "Chocolate Cake",
    category: "Desserts",
    price: 500,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
  },
  {
    id: "49",
    name: "Brownie",
    category: "Desserts",
    price: 450,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800",
  },
  {
    id: "50",
    name: "Cheesecake",
    category: "Desserts",
    price: 550,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
  },
  {
    id: "51",
    name: "Chocolate Sundae",
    category: "Desserts",
    price: 400,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
  },
  {
    id: "52",
    name: "Ice Cream",
    category: "Desserts",
    price: 350,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
  },
];

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Index() {
  const API_URL = "http://192.168.100.84:5000/api";

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`);

        if (!response.ok) {
          throw new Error("Menu is not loading.");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.log("Menu API error:", error);
        Alert.alert("Menu Error", "Menu is not loading.");
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenu();
  }, []);
  const [screen, setScreen] = useState("welcome");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [adminScreen, setAdminScreen] = useState("dashboard");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    const restoreLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const savedUser = await AsyncStorage.getItem("currentUser");

        if (token && savedUser) {
          const user = JSON.parse(savedUser);

          setAuthToken(token);
          setCurrentUser(user);
          setSignupName(user.name);

          if (user.role === "manager") {
            setAdminScreen("dashboard");
            setScreen("admin");
          } else {
            setScreen("home");
          }
        }
      } catch (error) {
        console.log("Restore login error:", error);
      }
    };

    restoreLogin();
  }, []);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [tableStatuses, setTableStatuses] = useState<
    { tableNumber: number; seats: number; isAvailable: boolean }[]
  >([]);

  const [tablesLoading, setTablesLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Menu");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Confirmed");
  const [trackingStep, setTrackingStep] = useState(1);
  const [reserved, setReserved] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [tableAvailability, setTableAvailability] = useState<any[]>([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [selectedDate, setSelectedDate] = useState("4 Oct 2026");
  const reservationDates = [
    "4 Oct 2026",
    "5 Oct 2026",
    "6 Oct 2026",
    "7 Oct 2026",
    "8 Oct 2026",
    "9 Oct 2026",
    "10 Oct 2026",
    "11 Oct 2026",
    "12 Oct 2026",
    "13 Oct 2026",
    "14 Oct 2026",
    "15 Oct 2026",
    "16 Oct 2026",
    "17 Oct 2026",
    "18 Oct 2026",
    "19 Oct 2026",
    "20 Oct 2026",
    "21 Oct 2026",
    "22 Oct 2026",
    "23 Oct 2026",
    "24 Oct 2026",
    "25 Oct 2026",
    "26 Oct 2026",
    "27 Oct 2026",
    "28 Oct 2026",
    "29 Oct 2026",
    "30 Oct 2026",
    "31 Oct 2026",
    "1 Nov 2026",
    "2 Nov 2026",
    "3 Nov 2026",
    "4 Nov 2026",
    "5 Nov 2026",
    "6 Nov 2026",
    "7 Nov 2026",
    "8 Nov 2026",
    "9 Nov 2026",
    "10 Nov 2026",
    "11 Nov 2026",
    "12 Nov 2026",
    "13 Nov 2026",
    "14 Nov 2026",
    "15 Nov 2026",
    "16 Nov 2026",
    "17 Nov 2026",
    "18 Nov 2026",
    "19 Nov 2026",
    "20 Nov 2026",
    "21 Nov 2026",
    "22 Nov 2026",
    "23 Nov 2026",
    "24 Nov 2026",
    "25 Nov 2026",
    "26 Nov 2026",
    "27 Nov 2026",
    "28 Nov 2026",
    "29 Nov 2026",
    "30 Nov 2026",
    "1 Dec 2026",
    "2 Dec 2026",
    "3 Dec 2026",
    "4 Dec 2026",
    "5 Dec 2026",
    "6 Dec 2026",
    "7 Dec 2026",
    "8 Dec 2026",
    "9 Dec 2026",
    "10 Dec 2026",
    "11 Dec 2026",
    "12 Dec 2026",
  ];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTables, setShowTables] = useState(false);
  const [reservedTable, setReservedTable] = useState<number | null>(null);
  const [cancellingReservation, setCancellingReservation] = useState(false);
  const [reservedTime, setReservedTime] = useState<string | null>(null);
  const [reservedDate, setReservedDate] = useState<string | null>(null);
  const [reservedGuests, setReservedGuests] = useState<string>("2");
  const fetchTableAvailability = async (
    date: string,
    time: string,
    guestValue: string,
  ) => {
    if (!date || !time || !guestValue || Number(guestValue) < 1) {
      setTableAvailability([]);
      return;
    }

    try {
      setLoadingTables(true);

      const response = await fetch(
        `http://192.168.100.84:5000/api/reservations/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&guests=${encodeURIComponent(guestValue)}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Availability could not be loaded");
      }

      setTableAvailability(
        (data.tables || data.availableTables || []).map((table: any) => ({
          ...table,
          isManagerAvailable: table.isManagerAvailable !== false,
        })),
      );
      setSelectedTable(null);
    } catch (error) {
      console.log("Availability error:", error);
      Alert.alert("Error", "Table availability load nahi hui.");
      setTableAvailability([]);
    } finally {
      setLoadingTables(false);
    }
  };

  const tables = [
    { id: 1, name: "Table 1", seats: 2 },
    { id: 2, name: "Table 2", seats: 2 },
    { id: 3, name: "Table 3", seats: 4 },
    { id: 4, name: "Table 4", seats: 4 },
    { id: 5, name: "Table 5", seats: 6 },
    { id: 6, name: "Table 6", seats: 6 },
  ];

  const timeSlots = [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [guests, setGuests] = useState("2");
  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword) {
      Alert.alert("Missing Information", "Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setAuthToken(data.token);
      setCurrentUser(data.user);
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("currentUser", JSON.stringify(data.user));
      setSignupName(data.user.name);

      if (data.user.role === "manager") {
        setAdminScreen("dashboard");
        setScreen("admin");
      } else {
        setScreen("home");
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const handleSignup = async () => {
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      Alert.alert("Missing Information", "Please fill all fields.");
      return;
    }

    if (signupPassword.length < 8) {
      Alert.alert(
        "Password Too Short",
        "Password must be at least 8 characters.",
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName.trim(),
          email: signupEmail.trim().toLowerCase(),
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setAuthToken(data.token);
      setCurrentUser(data.user);
      setSignupName(data.user.name);

      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("currentUser", JSON.stringify(data.user));

      setSignupPassword("");
      setScreen("home");

      Alert.alert(
        "Welcome to Bite Club!",
        "Your account has been created successfully.",
      );
    } catch (error) {
      Alert.alert(
        "Signup Failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const fetchManagerOrders = async () => {
    if (!authToken) return;

    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Orders could not be loaded");
      }

      const savedOrders = Array.isArray(data) ? data : data.orders || [];

      setOrders(
        savedOrders.map((order: any) => ({
          id: order._id,
          items: order.items || [],
          total: order.total || 0,
          date: order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "",
          status: order.status,
        })),
      );
    } catch (error) {
      Alert.alert(
        "Orders Error",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const addToCart = (food: any) => {
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === food.id);

      if (existing) {
        return oldCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...oldCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((oldFavorites) => {
      if (oldFavorites.includes(id)) {
        return oldFavorites.filter((itemId) => itemId !== id);
      }

      return [...oldFavorites, id];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discountAmount = Math.round((subtotal * discount) / 100);

  const finalTotal = subtotal - discountAmount;

  const placeOrder = async () => {
    if (!signupName.trim()) {
      Alert.alert(
        "Name Required",
        "Please enter your name in your profile/signup.",
      );
      return;
    }

    if (!orderPhone.trim() || !orderAddress.trim()) {
      Alert.alert(
        "Details Required",
        "Please enter your phone number and delivery address.",
      );
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Please add food to your cart first.");
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch("http://192.168.100.84:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          customerName: signupName.trim(),
          phone: orderPhone.trim(),
          address: orderAddress.trim(),

          items: cart.map((item) => {
            const dbItem = menuItems.find(
              (menu) =>
                menu.name.trim().toLowerCase() ===
                item.name.trim().toLowerCase(),
            );

            if (!dbItem?._id) {
              throw new Error(`Food item not found in database: ${item.name}`);
            }

            return {
              menuItem: dbItem._id,
              quantity: item.quantity,
            };
          }),

          paymentMethod: paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not place order");
      }

      const savedOrder = {
        id: data.order._id,
        items: cart.map((item) => ({ ...item })),
        total: data.order.total,
        date: new Date(data.order.createdAt).toLocaleDateString(),
        status: data.order.status,
      };

      setOrders((oldOrders) => [savedOrder, ...oldOrders]);
      setTrackingStep(1);

      Alert.alert(
        "Order Confirmed",
        "Your order has been saved successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              setCart([]);
              setScreen("orders");
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Order Failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "manager" && authToken) {
      fetchManagerOrders();
    }
  }, [currentUser, authToken]);

  const cancelOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://192.168.100.84:5000/api/orders/${orderId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Cancel Failed", data.message || "Please try again.");
        return;
      }

      setOrders((oldOrders) =>
        oldOrders.map((order) =>
          order.id === orderId || order._id === orderId
            ? { ...order, status: "Cancelled" }
            : order,
        ),
      );

      Alert.alert("Success", "Your order has been cancelled.");
    } catch (error) {
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  // =========================
  // WELCOME SCREEN
  // =========================

  if (screen === "welcome") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>B</Text>
        </View>

        <Text style={styles.title}>BITE CLUB</Text>

        <Text style={styles.subtitle}>Delicious food. Great moments.</Text>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScreen("login")}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>

          <Text style={styles.smallText}>
            Your favorite food, all in one place.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // LOGIN SCREEN
  // =========================

  if (screen === "login") {
    return (
      <SafeAreaView style={styles.loginScreen}>
        <View style={styles.loginBox}>
          <View style={styles.logoCircleSmall}>
            <Text style={styles.logoSmall}>B</Text>
          </View>

          <Text style={styles.loginTitle}>Welcome Back</Text>

          <Text style={styles.loginSubtitle}>
            Login to continue to Bite Club
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen("welcome")}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setScreen("signup")}
            style={styles.signupButton}
          >
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={styles.signupHighlight}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // SIGNUP SCREEN
  // =========================

  if (screen === "signup") {
    return (
      <SafeAreaView style={styles.loginScreen}>
        <View style={styles.loginBox}>
          <View style={styles.logoCircleSmall}>
            <Text style={styles.logoSmall}>B</Text>
          </View>

          <Text style={styles.loginTitle}>Create Account</Text>

          <Text style={styles.loginSubtitle}>Join Bite Club today</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={signupName}
            onChangeText={setSignupName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={signupEmail}
            onChangeText={setSignupEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password (minimum 8 characters)"
            placeholderTextColor="#888"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen("login")}
          >
            <Text style={styles.backText}>← Back to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // RESERVATION SCREEN
  // =========================

  if (screen === "reservation") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.cartTitle}>Reservation</Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          <View
            style={[
              styles.reservationCard,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.reservationTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              {reserved ? "Reserve a Table" : "Reserve a Table"}
            </Text>

            <Text
              style={[
                styles.reservationSubtitle,
                darkMode && { color: "#AAAAAA" },
              ]}
            >
              Book your table at Bite Club
            </Text>
            <Text
              style={[
                styles.reservationLabel,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Select Date
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {reservationDates.map((date) => (
                <TouchableOpacity
                  key={date}
                  style={{
                    padding: 12,
                    marginRight: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      selectedDate === date
                        ? "#000"
                        : darkMode
                          ? "#444444"
                          : "#ddd",

                    backgroundColor:
                      selectedDate === date
                        ? "#000"
                        : darkMode
                          ? "#2A2A2A"
                          : "#fff",
                  }}
                  onPress={() => {
                    setSelectedDate(date);
                    setReservationDate(date);
                    setSelectedTime(null);
                    setReservationTime("");
                    setSelectedTable(null);
                    setTableAvailability([]);
                    setShowTables(false);
                    setReserved(false);
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedDate === date
                          ? "#fff"
                          : darkMode
                            ? "#FFFFFF"
                            : "#000",
                      fontWeight: selectedDate === date ? "bold" : "normal",
                    }}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* =========================
              TIME SELECTION
          ========================= */}

            <Text
              style={[
                styles.reservationLabel,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Select Time
            </Text>

            <View style={styles.timeGrid}>
              {/* 12 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "12:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("12:00 PM");
                  setReservationTime("12:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);

                  fetchTableAvailability(selectedDate, "12:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "12:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  12:00 PM
                </Text>

                <Text style={styles.availableTableText}>▤ 3 Tables</Text>
              </TouchableOpacity>

              {/* 1 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "1:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("1:00 PM");
                  setReservationTime("1:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "1:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "1:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  1:00 PM
                </Text>

                <Text style={styles.availableTableText}>▤ 5 Tables</Text>
              </TouchableOpacity>

              {/* 2 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "2:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("2:00 PM");
                  setReservationTime("2:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "2:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "2:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  2:00 PM
                </Text>

                <Text style={styles.availableTableText}>▤ 2 Tables</Text>
              </TouchableOpacity>

              {/* 6 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "6:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("6:00 PM");
                  setReservationTime("6:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "6:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "6:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  6:00 PM
                </Text>
                <Text style={styles.availableTableText}>▤ 6 Tables</Text>
              </TouchableOpacity>

              {/* 7 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "7:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("7:00 PM");
                  setReservationTime("7:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "7:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "7:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  7:00 PM
                </Text>
                <Text style={styles.availableTableText}>▤ 4 Tables</Text>
              </TouchableOpacity>

              {/* 8 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "8:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("8:00 PM");
                  setReservationTime("8:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "8:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "8:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  8:00 PM
                </Text>
                <Text style={styles.availableTableText}>▤ 2 Tables</Text>
              </TouchableOpacity>

              {/* 9 PM */}

              <TouchableOpacity
                style={[
                  styles.timeCard,
                  selectedTime === "9:00 PM" && styles.selectedTime,
                ]}
                onPress={() => {
                  setSelectedTime("9:00 PM");
                  setReservationTime("9:00 PM");
                  setShowTables(true);
                  setSelectedTable(null);
                  setReserved(false);
                  fetchTableAvailability(selectedDate, "9:00 PM", guests);
                }}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === "9:00 PM" && styles.selectedTimeText,
                  ]}
                >
                  9:00 PM
                </Text>
                <Text style={styles.availableTableText}>
                  🔐 <Text style={{ color: "#FF0000" }}>Fully Reserved</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {showTables && selectedTime !== "9:00 PM" && (
              <View style={{ marginTop: 20 }}>
                <Text
                  style={[
                    styles.reservationLabel,
                    darkMode && { color: "#FFFFFF" },
                  ]}
                >
                  Available Tables
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  {loadingTables ? (
                    <Text style={{ color: darkMode ? "#FFFFFF" : "#000000" }}>
                      Checking availability...
                    </Text>
                  ) : (
                    tableAvailability.map((table) => {
                      const booked = table.isBooked;
                      const suitable = table.suitableForGuests;
                      const managerUnavailable =
                        table.isManagerAvailable === false;
                      const isSelected = selectedTable === table.tableNumber;

                      return (
                        <TouchableOpacity
                          key={table.tableNumber}
                          disabled={booked || managerUnavailable || !suitable}
                          style={{
                            width: "48%",
                            padding: 15,
                            borderWidth: 1,
                            borderColor:
                              booked || managerUnavailable
                                ? "#DC2626"
                                : isSelected
                                  ? "#FF6B35"
                                  : darkMode
                                    ? "#444444"
                                    : "#DDDDDD",
                            borderRadius: 10,
                            backgroundColor:
                              booked || managerUnavailable
                                ? darkMode
                                  ? "#452020"
                                  : "#FEE2E2"
                                : isSelected
                                  ? darkMode
                                    ? "#493025"
                                    : "#FFF5EF"
                                  : darkMode
                                    ? "#2A2A2A"
                                    : "#FFFFFF",
                            opacity: !suitable && !booked ? 0.5 : 1,
                          }}
                          onPress={() => setSelectedTable(table.tableNumber)}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: darkMode ? "#FFFFFF" : "#000000",
                            }}
                          >
                            Table {table.tableNumber}
                          </Text>

                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 13,
                              color: booked
                                ? "#DC2626"
                                : darkMode
                                  ? "#CCCCCC"
                                  : "#666666",
                              fontWeight: booked ? "bold" : "normal",
                            }}
                          >
                            {booked
                              ? "Booked"
                              : managerUnavailable
                                ? "Unavailable"
                                : !suitable
                                  ? `Needs ${table.seats} seats`
                                  : isSelected
                                    ? "Selected ✓"
                                    : `${table.seats} seats · Available`}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  )}

                  {!loadingTables && tableAvailability.length === 0 && (
                    <Text style={{ color: darkMode ? "#FFFFFF" : "#666666" }}>
                      No table information available. Please select a time.
                    </Text>
                  )}
                </View>
              </View>
            )}

            {/* =========================
              DATE
          ========================= */}

            {/* =========================
              GUESTS
          ========================= */}

            <Text
              style={[
                styles.reservationLabel,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Number of Guests
            </Text>

            <TextInput
              style={[
                styles.reservationInput,
                darkMode && {
                  backgroundColor: "#2A2A2A",
                  color: "#FFFFFF",
                  borderColor: "#444444",
                },
              ]}
              placeholder="Number of guests"
              placeholderTextColor={darkMode ? "#AAAAAA" : "#999"}
              value={guests}
              onChangeText={setGuests}
              keyboardType="numeric"
            />

            {/* =========================
              RESERVE BUTTON
          ========================= */}

            <TouchableOpacity
              style={styles.reserveButton}
              onPress={async () => {
                if (
                  !selectedTable ||
                  !selectedTime ||
                  !reservationDate ||
                  !guests
                ) {
                  Alert.alert(
                    "Missing Information",
                    "Please select a date, time, table and enter the number of guests.",
                  );
                  return;
                }

                const guestCount = Number(guests);

                if (
                  !Number.isInteger(guestCount) ||
                  guestCount < 1 ||
                  guestCount > 6
                ) {
                  Alert.alert(
                    "Invalid Guests",
                    "Please enter between 1 and 6 guests.",
                  );
                  return;
                }

                try {
                  const response = await fetch(
                    "http://192.168.100.84:5000/api/reservations",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        customerName: signupName || "Bite Club User",
                        date: reservationDate,
                        time: selectedTime,
                        guests: guestCount,
                        tableNumber: selectedTable,
                      }),
                    },
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    Alert.alert(
                      "Reservation Failed",
                      data.message || "Please try another table or time.",
                    );
                    return;
                  }

                  setReserved(true);
                  setReservedTable(selectedTable);
                  setReservedTime(selectedTime);
                  setReservedDate(reservationDate);
                  setReservedGuests(String(guestCount));
                  await fetchTableAvailability(
                    reservationDate,
                    selectedTime,
                    guests,
                  );

                  Alert.alert(
                    "Reservation Confirmed",
                    `Table ${selectedTable} has been reserved for ${guestCount} guests at ${selectedTime}.`,
                  );
                } catch (error) {
                  Alert.alert(
                    "Connection Error",
                    "Could not connect to the server. Please check that your backend is running.",
                  );
                }
              }}
            >
              <Text style={styles.buttonText}>
                {reserved ? "RESERVED ✓" : "RESERVE TABLE"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* BOTTOM NAV */}

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  // =========================
  // FAVORITES SCREEN
  // =========================

  if (screen === "favorites") {
    const favoriteFood = FOOD.map((food) => {
      const dbItem = menuItems.find(
        (item) => item.name.toLowerCase() === food.name.toLowerCase(),
      );

      return {
        ...food,
        id: String(dbItem?._id || food.id),
        price: dbItem?.price ?? food.price,
        image:
          dbItem?.image ||
          food.image ||
          (food.name.toLowerCase().includes("cold coffee")
            ? "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
            : food.name.toLowerCase().includes("crispy chicken")
              ? "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"
              : ""),
      };
    }).filter((item) => favorites.includes(item.id));

    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.cartTitle}>Favorites</Text>

          <View style={styles.cartCountBox}>
            <Text style={styles.cartCountText}>{favoriteFood.length}</Text>
          </View>
        </View>

        {favoriteFood.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text
              style={[styles.emptyCartIcon, darkMode && { color: "#FFFFFF" }]}
            >
              ♡
            </Text>

            <Text
              style={[styles.emptyCartTitle, darkMode && { color: "#FFFFFF" }]}
            >
              No Favorites Yet
            </Text>

            <Text style={styles.emptyCartText}>
              Tap the heart on a food item to save it here.
            </Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.buttonText}>BROWSE MENU</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 120,
            }}
          >
            {favoriteFood.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.foodCard,
                  darkMode && { backgroundColor: "#1E1E1E" },
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.foodImage} />

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.favoriteIcon}>♥</Text>
                </TouchableOpacity>

                <View style={styles.foodInfo}>
                  <Text
                    style={[styles.foodName, darkMode && { color: "#FFFFFF" }]}
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.foodCategory}>{item.category}</Text>

                  <View style={styles.foodBottom}>
                    <Text style={styles.foodPrice}>Rs. {item.price}</Text>

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  if (screen === "editProfile") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("profile")}>
            <Text style={[styles.backArrow, darkMode && { color: "#FFFFFF" }]}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            Edit Profile
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          <View
            style={[
              styles.profileCard,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <View style={styles.profileCircle}>
              <Text style={styles.profileLetter}>
                {editName ? editName.charAt(0).toUpperCase() : "B"}
              </Text>
            </View>

            <Text
              style={[styles.profileName, darkMode && { color: "#FFFFFF" }]}
            >
              Edit your information
            </Text>
          </View>

          <Text
            style={[styles.reservationLabel, darkMode && { color: "#FFFFFF" }]}
          >
            Name
          </Text>

          <TextInput
            style={[
              styles.reservationInput,
              darkMode && {
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
                borderColor: "#444444",
              },
            ]}
            placeholder="Enter your name"
            placeholderTextColor={darkMode ? "#AAAAAA" : "#999"}
            value={editName}
            onChangeText={setEditName}
          />

          <Text
            style={[styles.reservationLabel, darkMode && { color: "#FFFFFF" }]}
          >
            Email
          </Text>

          <TextInput
            style={[
              styles.reservationInput,
              darkMode && {
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
                borderColor: "#444444",
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={darkMode ? "#AAAAAA" : "#999"}
            value={editEmail}
            onChangeText={setEditEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => {
              if (!editName || !editEmail) {
                Alert.alert("Missing Information", "Please fill all fields.");
                return;
              }

              setSignupName(editName);
              setSignupEmail(editEmail);

              Alert.alert(
                "Profile Updated",
                "Your profile has been updated successfully!",
                [
                  {
                    text: "OK",
                    onPress: () => setScreen("profile"),
                  },
                ],
              );
            }}
          >
            <Text style={styles.buttonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  if (screen === "tracking") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("orders")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            Track Order
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          <View
            style={[
              styles.trackingMainCard,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.trackingMainTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Your Order
            </Text>

            <Text
              style={[
                styles.trackingMainStatus,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              <Text
                style={[
                  trackingStep >= 1
                    ? [styles.timelineActive, { color: "#90EE90" }]
                    : styles.timelinePending,
                ]}
              >
                {trackingStep >= 1 ? "✦" : "○"} Order Confirmed
              </Text>
              {trackingStep === 2 && "Preparing Your Food 🍳"}
              {trackingStep === 3 && "Out for Delivery 🚗"}
              {trackingStep === 4 && "Order Delivered ✓"}
            </Text>

            <View style={styles.timeline}>
              <Text
                style={[
                  trackingStep >= 1
                    ? styles.timelineActive
                    : styles.timelinePending,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                {trackingStep >= 1 ? "✓" : "○"} Order Confirmed
              </Text>

              <Text
                style={
                  trackingStep >= 2
                    ? styles.timelineActive
                    : styles.timelinePending
                }
              >
                {trackingStep >= 2 ? "✓" : "○"} Preparing your food
              </Text>

              <Text
                style={
                  trackingStep >= 3
                    ? styles.timelineActive
                    : styles.timelinePending
                }
              >
                {trackingStep >= 3 ? "✓" : "○"} Out for delivery
              </Text>

              <Text
                style={
                  trackingStep >= 4
                    ? styles.timelineActive
                    : styles.timelinePending
                }
              >
                {trackingStep >= 4 ? "✓" : "○"} Delivered
              </Text>
            </View>

            {currentUser?.role === "manager" && (
              <TouchableOpacity
                style={styles.trackButton}
                onPress={() => {
                  if (trackingStep < 4) {
                    const nextStep = trackingStep + 1;

                    setTrackingStep(nextStep);

                    const statusNames = [
                      "Confirmed",
                      "Preparing",
                      "Out for Delivery",
                      "Delivered",
                    ];

                    setOrders((oldOrders) =>
                      oldOrders.map((order, index) =>
                        index === oldOrders.length - 1
                          ? {
                              ...order,
                              status: statusNames[nextStep - 1],
                            }
                          : order,
                      ),
                    );
                  }
                }}
              >
                <Text style={styles.trackButtonText}>
                  {trackingStep < 4 ? "UPDATE STATUS" : "ORDER DELIVERED ✓"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  if (screen === "orders") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity
            onPress={() => setScreen("profile")}
            style={{ width: 40, height: 40, justifyContent: "center" }}
          >
            <Text style={[styles.backArrow, darkMode && { color: "#FFFFFF" }]}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            My Orders
          </Text>

          <View style={{ width: 30 }} />
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>📦</Text>

            <Text
              style={[styles.emptyCartTitle, darkMode && { color: "#FFFFFF" }]}
            >
              No Orders Yet
            </Text>

            <Text
              style={[styles.emptyCartText, darkMode && { color: "#AAAAAA" }]}
            >
              Your placed orders will appear here.
            </Text>

            <TouchableOpacity
              style={[
                styles.loginButton,
                darkMode && { backgroundColor: "#2A2A2A" },
              ]}
              onPress={() => setScreen("home")}
            >
              <Text
                style={[styles.buttonText, darkMode && { color: "#FFFFFF" }]}
              >
                ORDER NOW
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 120,
            }}
          >
            {orders.map((order) => (
              <View
                key={order.id}
                style={[
                  styles.orderCard,
                  darkMode && { backgroundColor: "#1E1E1E" },
                ]}
              >
                <Text style={styles.orderTitle}>
                  <Text
                    style={[
                      styles.orderTitle,
                      darkMode && { color: "#FFFFFF" },
                    ]}
                  >
                    Order #{order.id.slice(-5)}
                  </Text>
                </Text>

                <Text
                  style={[styles.orderDate, darkMode && { color: "#AAAAAA" }]}
                >
                  Date: {order.date}
                </Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{order.status}</Text>
                </View>

                {order.status === "Pending" && (
                  <TouchableOpacity
                    style={[
                      styles.trackButton,
                      {
                        backgroundColor: "#D93636",
                        marginTop: 10,
                      },
                    ]}
                    onPress={() =>
                      Alert.alert(
                        "Cancel Order",
                        "Are you sure you want to cancel this order?",
                        [
                          {
                            text: "Keep Order",
                            style: "cancel",
                          },
                          {
                            text: "Yes, Cancel",
                            style: "destructive",
                            onPress: () => cancelOrder(order.id),
                          },
                        ],
                      )
                    }
                  >
                    <Text style={styles.trackButtonText}>CANCEL ORDER</Text>
                  </TouchableOpacity>
                )}

                {order.status !== "Cancelled" && (
                  <View
                    style={[
                      styles.trackingBox,
                      darkMode && { backgroundColor: "#2A2A2A" },
                    ]}
                  ></View>
                )}

                <Text
                  style={[styles.orderTotal, darkMode && { color: "#FFFFFF" }]}
                >
                  Total: Rs. {order.total}
                </Text>

                {order.items.map((item: CartItem) => (
                  <Text
                    key={item.id}
                    style={[styles.orderItem, darkMode && { color: "#FFFFFF" }]}
                  >
                    {item.name} × {item.quantity}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        )}

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  const loadTableStatuses = async () => {
    try {
      setTablesLoading(true);

      const response = await fetch(
        "http://192.168.100.84:5000/api/reservations/tables/status",
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not load tables.");
        return;
      }

      setTableStatuses(Array.isArray(data) ? data : data.tables || []);
    } catch (error) {
      Alert.alert("Connection Error", "Could not connect to the server.");
    } finally {
      setTablesLoading(false);
    }
  };

  const toggleTableAvailability = async (
    tableNumber: number,
    isAvailable: boolean,
  ) => {
    try {
      const response = await fetch(
        `http://192.168.100.84:5000/api/reservations/tables/${tableNumber}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAvailable }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not update table.");
        return;
      }

      setTableStatuses((previous) =>
        previous.map((table) =>
          table.tableNumber === tableNumber ? { ...table, isAvailable } : table,
        ),
      );

      Alert.alert(
        "Success",
        `Table ${tableNumber} is now ${isAvailable ? "Available" : "Unavailable"}.`,
      );
    } catch (error) {
      Alert.alert("Connection Error", "Could not connect to the server.");
    }
  };

  if (screen === "admin") {
    const totalOrders = orders.length;

    const totalSales = orders.reduce((total, order) => total + order.total, 0);

    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity
            onPress={() => setScreen("profile")}
            style={{ width: 40, height: 40, justifyContent: "center" }}
          >
            <Text style={[styles.backArrow, darkMode && { color: "#FFFFFF" }]}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            Manager Dashboard
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          <Text
            style={[styles.dashboardWelcome, darkMode && { color: "#FFFFFF" }]}
          >
            Restaurant Overview
          </Text>

          {/* DASHBOARD CARDS */}
          <View style={styles.dashboardGrid}>
            <View
              style={[
                styles.dashboardCard,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
            >
              <Text style={styles.dashboardIcon}>📦</Text>

              <Text
                style={[
                  styles.dashboardNumber,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                {totalOrders}
              </Text>

              <Text style={styles.dashboardLabel}>Total Orders</Text>
            </View>

            <View
              style={[
                styles.dashboardCard,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
            >
              <Text style={styles.dashboardIcon}>💰</Text>

              <Text
                style={[
                  styles.dashboardNumber,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                Rs. {totalSales}
              </Text>

              <Text style={styles.dashboardLabel}>Total Sales</Text>
            </View>

            <View
              style={[
                styles.dashboardCard,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
            >
              <Text style={styles.dashboardIcon}>🍔</Text>

              <Text
                style={[
                  styles.dashboardNumber,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                {FOOD.length}
              </Text>

              <Text style={styles.dashboardLabel}>Menu Items</Text>
            </View>

            <View
              style={[
                styles.dashboardCard,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
            >
              <Text style={styles.dashboardIcon}>🪑</Text>

              <Text
                style={[
                  styles.dashboardNumber,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                {reserved ? 1 : 0}
              </Text>

              <Text style={styles.dashboardLabel}>Reservations</Text>
            </View>
          </View>

          {/* MANAGE TABLES */}
          <View
            style={[
              styles.dashboardSummary,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.dashboardSummaryTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              🪑 Manage Tables
            </Text>

            <Text
              style={[
                styles.dashboardOrderStatus,
                darkMode && { color: "#AAAAAA" },
                { marginBottom: 15 },
              ]}
            >
              Control which tables customers can reserve.
            </Text>

            <TouchableOpacity
              style={styles.trackButton}
              onPress={loadTableStatuses}
            >
              <Text style={styles.trackButtonText}>
                {tablesLoading ? "LOADING..." : "REFRESH TABLES"}
              </Text>
            </TouchableOpacity>

            {tableStatuses.map((table) => (
              <View
                key={table.tableNumber}
                style={[
                  styles.dashboardOrder,
                  { alignItems: "center", flexWrap: "wrap" },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.dashboardOrderTitle,
                      darkMode && { color: "#FFFFFF" },
                    ]}
                  >
                    Table {table.tableNumber}
                  </Text>

                  <Text
                    style={[
                      styles.dashboardOrderStatus,
                      {
                        color: table.isAvailable ? "#16A34A" : "#DC2626",
                      },
                    ]}
                  >
                    {table.seats} seats ·{" "}
                    {table.isAvailable ? "Available" : "Unavailable"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.trackButton,
                    {
                      backgroundColor: table.isAvailable ? "#DC2626" : "green",
                      marginTop: 5,
                    },
                  ]}
                  onPress={() =>
                    toggleTableAvailability(
                      table.tableNumber,
                      !table.isAvailable,
                    )
                  }
                >
                  <Text style={styles.trackButtonText}>
                    {table.isAvailable ? "MAKE UNAVAILABLE" : "MAKE AVAILABLE"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* MENU OVERVIEW */}
          <View
            style={[
              styles.dashboardSummary,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.dashboardSummaryTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Menu Overview
            </Text>

            {FOOD.slice(0, 6).map((item) => (
              <View key={item.id} style={styles.dashboardOrder}>
                <View>
                  <Text
                    style={[
                      styles.dashboardOrderTitle,
                      darkMode && { color: "#FFFFFF" },
                    ]}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={[
                      styles.dashboardOrderStatus,
                      darkMode && { color: "#AAAAAA" },
                    ]}
                  >
                    {item.category}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.dashboardOrderPrice,
                    darkMode && { color: "#FFFFFF" },
                  ]}
                >
                  Rs. {item.price}
                </Text>
              </View>
            ))}
          </View>

          {/* RESERVATION OVERVIEW */}
          <View
            style={[
              styles.dashboardSummary,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.dashboardSummaryTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Reservation Overview
            </Text>

            {reserved ? (
              <>
                <Text
                  style={[
                    styles.dashboardOrderTitle,
                    darkMode && { color: "#FFFFFF" },
                  ]}
                >
                  Table Reservation
                </Text>

                <Text
                  style={[
                    styles.dashboardOrderStatus,
                    darkMode && { color: "#AAAAAA" },
                  ]}
                >
                  Name: {signupName || "Bite Club User"}
                </Text>

                <Text
                  style={[
                    styles.dashboardOrderStatus,
                    darkMode && { color: "#AAAAAA" },
                  ]}
                >
                  Date: {reservationDate}
                </Text>

                <Text
                  style={[
                    styles.dashboardOrderStatus,
                    darkMode && { color: "#AAAAAA" },
                  ]}
                >
                  Time: {reservationTime}
                </Text>

                <Text
                  style={[
                    styles.dashboardOrderStatus,
                    darkMode && { color: "#AAAAAA" },
                  ]}
                >
                  Table: {reservedTable}
                </Text>

                <Text
                  style={[
                    styles.dashboardOrderStatus,
                    darkMode && { color: "#AAAAAA" },
                  ]}
                >
                  Guests: {guests}
                </Text>
              </>
            ) : (
              <View>
                <Text style={styles.dashboardEmpty}>
                  No active reservations.
                </Text>

                {reserved && (
                  <TouchableOpacity
                    style={styles.dashboardCancelButton}
                    onPress={() => {
                      Alert.alert(
                        "Cancel Reservation",
                        "Are you sure you want to cancel this reservation?",
                        [
                          {
                            text: "No",
                            style: "cancel",
                          },
                          {
                            text: "Yes, Cancel",
                            onPress: () => {
                              setReserved(false);
                              setReservationDate("");
                              setReservationTime("");
                              setGuests("0");
                            },
                          },
                        ],
                      );
                    }}
                  >
                    <Text style={styles.dashboardCancelText}>
                      CANCEL RESERVATION
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* ORDER MANAGEMENT */}
          <View
            style={[
              styles.dashboardSummary,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.dashboardSummaryTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Order Management
            </Text>

            {orders.length === 0 ? (
              <Text style={styles.dashboardEmpty}>No orders available.</Text>
            ) : (
              orders.map((order) => (
                <View key={order.id} style={styles.dashboardOrder}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.dashboardOrderTitle,
                        darkMode && { color: "#FFFFFF" },
                      ]}
                    >
                      Order #{order.id.slice(-5)}
                    </Text>
                    <Text
                      style={[
                        styles.dashboardOrderStatus,
                        darkMode && { color: "#AAAAAA" },
                      ]}
                    >
                      Status: {order.status}
                    </Text>
                    <Text
                      style={[
                        styles.dashboardOrderStatus,
                        darkMode && { color: "#AAAAAA" },
                      ]}
                    >
                      Items: {order.items.length}
                    </Text>
                    {/* UPDATE STATUS */}
                    ```tsx
                    {order.status !== "Cancelled" && (
                      <TouchableOpacity
                        style={styles.trackButton}
                        disabled={order.status === "Served"}
                        onPress={async () => {
                          const statusNames = [
                            "Pending",
                            "Preparing",
                            "Ready",
                            "Served",
                          ];

                          const currentIndex = statusNames.indexOf(
                            order.status,
                          );

                          if (
                            currentIndex < 0 ||
                            currentIndex >= statusNames.length - 1
                          ) {
                            Alert.alert(
                              "Notice",
                              "Order status cannot be updated.",
                            );
                            return;
                          }

                          const nextStatus = statusNames[currentIndex + 1];

                          try {
                            const response = await fetch(
                              `${API_URL}/orders/${order.id}/status`,
                              {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${authToken}`,
                                },
                                body: JSON.stringify({ status: nextStatus }),
                              },
                            );

                            const data = await response.json();

                            if (!response.ok) {
                              Alert.alert(
                                "Update Failed",
                                data.message ||
                                  "Could not update order status.",
                              );
                              return;
                            }

                            setOrders((oldOrders) =>
                              oldOrders.map((item) =>
                                item.id === order.id
                                  ? { ...item, status: data.order.status }
                                  : item,
                              ),
                            );

                            Alert.alert(
                              "Success",
                              `Order status: ${data.order.status}`,
                            );
                          } catch (error) {
                            Alert.alert(
                              "Error",
                              "Server se connection nahi ho saka.",
                            );
                          }
                        }}
                      >
                        <Text style={styles.trackButtonText}>
                          {order.status === "Served"
                            ? "ORDER Delivered ✓"
                            : "UPDATE STATUS"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    ```
                  </View>

                  <Text
                    style={[
                      styles.dashboardOrderPrice,
                      darkMode && { color: "#FFFFFF" },
                    ]}
                  >
                    Rs. {order.total}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* RECENT ORDERS */}
          <View
            style={[
              styles.dashboardSummary,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text
              style={[
                styles.dashboardSummaryTitle,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              Recent Orders
            </Text>

            {orders.length === 0 ? (
              <Text
                style={[
                  styles.dashboardEmpty,
                  darkMode && { color: "#AAAAAA" },
                ]}
              >
                No orders yet.
              </Text>
            ) : (
              orders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <View key={order.id} style={styles.dashboardOrder}>
                    <View>
                      <Text
                        style={[
                          styles.dashboardOrderTitle,
                          darkMode && { color: "#FFFFFF" },
                        ]}
                      >
                        Order #{order.id.slice(-5)}
                      </Text>

                      <Text
                        style={[
                          styles.dashboardOrderStatus,
                          darkMode && { color: "#AAAAAA" },
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.dashboardOrderPrice,
                        darkMode && { color: "#FFFFFF" },
                      ]}
                    >
                      Rs. {order.total}
                    </Text>
                  </View>
                ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "myReservation") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("profile")}>
            <Text style={[styles.backArrow, darkMode && { color: "#FFFFFF" }]}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            My Reservation
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
          {reserved &&
          reservedDate &&
          reservedTime &&
          reservedTable !== null ? (
            <View
              style={[
                styles.reservationSuccess,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
            >
              <Text style={styles.successTitle}>Reservation Details</Text>

              <Text style={styles.successText}>
                Name: {signupName || "Bite Club User"}
              </Text>

              <Text style={styles.successText}>
                Table: Table {reservedTable}
              </Text>

              <Text style={styles.successText}>Date: {reservedDate}</Text>

              <Text style={styles.successText}>Time: {reservedTime}</Text>

              <Text style={styles.successText}>Guests: {reservedGuests}</Text>

              <Text style={styles.successAvailable}>
                🟢 Reservation Confirmed
              </Text>

              <TouchableOpacity
                style={[
                  styles.cancelReservationButton,
                  cancellingReservation && { opacity: 0.6 },
                ]}
                disabled={cancellingReservation}
                onPress={() => {
                  Alert.alert(
                    "Cancel Reservation",
                    "Are you sure you want to cancel your reservation?",
                    [
                      { text: "No", style: "cancel" },
                      {
                        text: "Yes, Cancel",
                        style: "destructive",
                        onPress: async () => {
                          if (
                            !reservedDate ||
                            !reservedTime ||
                            reservedTable === null
                          ) {
                            Alert.alert(
                              "Error",
                              "Reservation details nahi milin.",
                            );
                            return;
                          }

                          try {
                            setCancellingReservation(true);

                            const response = await fetch(
                              "http://192.168.100.84:5000/api/reservations/cancel",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  customerName: signupName || "Bite Club User",
                                  date: reservedDate,
                                  time: reservedTime,
                                  tableNumber: reservedTable,
                                }),
                              },
                            );

                            const data = await response.json();

                            if (!response.ok) {
                              throw new Error(
                                data.message || "Reservation cancel nahi hui.",
                              );
                            }

                            setReserved(false);
                            setReservationDate("");
                            setReservationTime("");
                            setGuests("2");
                            setSelectedTable(null);
                            setSelectedTime(null);
                            setShowTables(false);
                            setReservedTable(null);
                            setReservedTime(null);
                            setReservedDate(null);
                            setTableAvailability([]);

                            Alert.alert(
                              "Reservation Cancelled",
                              "Your reservation has been cancelled successfully.",
                            );
                          } catch (error) {
                            Alert.alert(
                              "Cancellation Failed",
                              error instanceof Error
                                ? error.message
                                : "Please try again.",
                            );
                          } finally {
                            setCancellingReservation(false);
                          }
                        },
                      },
                    ],
                  );
                }}
              >
                <Text style={styles.cancelReservationText}>
                  {cancellingReservation
                    ? "CANCELLING..."
                    : "CANCEL RESERVATION"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartIcon}>🪑</Text>

              <Text
                style={[
                  styles.emptyCartTitle,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                No Active Reservation
              </Text>

              <Text
                style={[styles.emptyCartText, darkMode && { color: "#AAAAAA" }]}
              >
                Your confirmed reservation will appear here.
              </Text>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setScreen("reservation")}
              >
                <Text style={styles.buttonText}>BOOK A TABLE</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  if (screen === "profile") {
    const isManager = currentUser?.role === "manager";

    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity
            onPress={() => setScreen(isManager ? "admin" : "home")}
          >
            <Text style={styles.backArrow}></Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            Profile
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        >
          <View
            style={[
              styles.profileCard,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <View style={styles.profileCircle}>
              <Text style={styles.profileLetter}>
                {signupName ? signupName.charAt(0).toUpperCase() : "B"}
              </Text>
            </View>

            <Text
              style={[styles.profileName, darkMode && { color: "#FFFFFF" }]}
            >
              {signupName || "Bite Club User"}
            </Text>

            <Text
              style={[styles.profileEmail, darkMode && { color: "#AAAAAA" }]}
            >
              {signupEmail || currentUser?.email || "Welcome to Bite Club"}
            </Text>

            {isManager && (
              <Text
                style={{ color: "#FF6B35", marginTop: 8, fontWeight: "600" }}
              >
                Manager Account
              </Text>
            )}
          </View>

          {!isManager && (
            <TouchableOpacity
              style={[
                styles.profileOption,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
              onPress={() => setScreen("orders")}
            >
              <Text
                style={[
                  styles.profileOptionText,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                📦 My Orders
              </Text>
            </TouchableOpacity>
          )}

          {!isManager && (
            <TouchableOpacity
              style={[
                styles.profileOption,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
              onPress={() => setScreen("myReservation")}
            >
              <Text
                style={[
                  styles.profileOptionText,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                🪑 My Reservation
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.profileOption,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Text
              style={[
                styles.profileOptionText,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.profileOption,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
            onPress={() => {
              setEditName(signupName);
              setEditEmail(signupEmail || currentUser?.email || "");
              setScreen("editProfile");
            }}
          >
            <Text
              style={[
                styles.profileOptionText,
                darkMode && { color: "#FFFFFF" },
              ]}
            >
              ✏️ Edit Profile
            </Text>
          </TouchableOpacity>

          {isManager && (
            <TouchableOpacity
              style={[
                styles.profileOption,
                darkMode && { backgroundColor: "#1E1E1E" },
              ]}
              onPress={() => {
                setAdminScreen("dashboard");
                setScreen("admin");
              }}
            >
              <Text
                style={[
                  styles.profileOptionText,
                  darkMode && { color: "#FFFFFF" },
                ]}
              >
                📊 Manager Dashboard
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.logoutButton,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
            onPress={() => {
              Alert.alert("Logout", "Are you sure you want to logout?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Logout",
                  style: "destructive",
                  onPress: async () => {
                    await AsyncStorage.removeItem("authToken");
                    await AsyncStorage.removeItem("currentUser");
                    setAuthToken(null);
                    setCurrentUser(null);
                    setLoginEmail("");
                    setLoginPassword("");
                    setSignupName("");
                    setSignupEmail("");
                    setScreen("login");
                  },
                },
              ]);
            }}
          >
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </ScrollView>

        {!isManager && (
          <BottomNav
            screen={screen}
            setScreen={setScreen}
            cartCount={cartCount}
            darkMode={darkMode}
          />
        )}
      </SafeAreaView>
    );
  }

  // =========================
  // CART SCREEN
  // =========================

  if (screen === "cart") {
    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={[styles.cartTitle, darkMode && { color: "#FFFFFF" }]}>
            My Cart
          </Text>

          <View style={styles.cartCountBox}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>🛒</Text>

            <Text
              style={[styles.emptyCartTitle, darkMode && { color: "#FFFFFF" }]}
            >
              Your cart is empty
            </Text>

            <Text style={styles.emptyCartText}>
              Add some delicious food first.
            </Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.buttonText}>BROWSE MENU</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 20,
                paddingBottom: 230,
              }}
            >
              {cart.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.cartCard,
                    darkMode && { backgroundColor: "#1E1E1E" },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cartImage}
                  />

                  <View style={styles.cartInfo}>
                    <Text
                      style={[
                        styles.cartFoodName,
                        darkMode && { color: "#FFFFFF" },
                      ]}
                    >
                      {item.name}
                    </Text>

                    <Text style={styles.cartCategory}>{item.category}</Text>

                    <Text style={styles.cartPrice}>Rs. {item.price}</Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => decreaseQuantity(item.id)}
                      >
                        <Text style={styles.quantityText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => increaseQuantity(item.id)}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.checkoutBox}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                style={{ maxHeight: 350 }}
                contentContainerStyle={{ paddingBottom: 15 }}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.promoBox}>
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter promo code"
                    placeholderTextColor="#999"
                    value={promoCode}
                    onChangeText={setPromoCode}
                    autoCapitalize="characters"
                  />

                  <TouchableOpacity
                    style={styles.promoButton}
                    onPress={() => {
                      if (promoCode.trim().toUpperCase() === "BITE10") {
                        setDiscount(10);
                        Alert.alert(
                          "Promo Applied",
                          "10% discount applied successfully!",
                        );
                      } else {
                        setDiscount(0);
                        Alert.alert("Invalid Code", "Try promo code: BITE10");
                      }
                    }}
                  >
                    <Text style={styles.promoButtonText}>APPLY</Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={[styles.promoInput, { marginTop: 16 }]}
                  placeholder="Enter phone number"
                  placeholderTextColor="#999"
                  value={orderPhone}
                  onChangeText={setOrderPhone}
                  keyboardType="phone-pad"
                />

                <TextInput
                  style={[styles.promoInput, { marginTop: 10, minHeight: 80 }]}
                  placeholder="Enter delivery address"
                  placeholderTextColor="#999"
                  value={orderAddress}
                  onChangeText={setOrderAddress}
                  multiline
                />

                <Text
                  style={[
                    styles.totalLabel,
                    { marginTop: 16, marginBottom: 10, fontSize: 16 },
                    darkMode && { color: "#FFFFFF" },
                  ]}
                >
                  Select Payment Method
                </Text>

                {[
                  { label: "Cash on Delivery", value: "COD", icon: "💵" },
                  { label: "Debit / Credit Card", value: "Card", icon: "💳" },
                  { label: "Easypaisa", value: "Easypaisa", icon: "📱" },
                  { label: "JazzCash", value: "JazzCash", icon: "📲" },
                ].map((method) => (
                  <TouchableOpacity
                    key={method.value}
                    onPress={() => setPaymentMethod(method.value)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor:
                        paymentMethod === method.value ? "#FF6B35" : "#CCCCCC",
                      borderRadius: 10,
                      backgroundColor:
                        paymentMethod === method.value
                          ? darkMode
                            ? "#302017"
                            : "#FFF3ED"
                          : "transparent",
                    }}
                  >
                    <Text style={{ fontSize: 18, marginRight: 10 }}>
                      {method.icon}
                    </Text>

                    <Text
                      style={{
                        flex: 1,
                        color: darkMode ? "#FFFFFF" : "#111111",
                      }}
                    >
                      {method.label}
                    </Text>

                    <Text style={{ color: "#FF6B35", fontWeight: "bold" }}>
                      {paymentMethod === method.value ? "✓" : "○"}
                    </Text>
                  </TouchableOpacity>
                ))}

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>Rs. {subtotal}</Text>
                </View>

                {discount > 0 && (
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>
                      Discount ({discount}%)
                    </Text>
                    <Text style={styles.discountText}>
                      - Rs. {discountAmount}
                    </Text>
                  </View>
                )}

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Delivery</Text>
                  <Text style={styles.freeText}>FREE</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <Text style={styles.grandTotalLabel}>Total</Text>
                  <Text style={styles.grandTotal}>Rs. {finalTotal}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.placeOrderButton,
                    placingOrder && { opacity: 0.6 },
                  ]}
                  onPress={placeOrder}
                  disabled={placingOrder}
                >
                  <Text style={styles.buttonText}>
                    {placingOrder ? "PLACING ORDER..." : "PLACE ORDER"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </>
        )}

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  // =========================
  // HOME SCREEN
  // =========================

  if (screen === "home") {
    const foodWithImages = FOOD.map((food) => {
      const dbItem = menuItems.find(
        (item) => item.name.toLowerCase() === food.name.toLowerCase(),
      );

      return {
        ...food,
        id: String(dbItem?._id || food.id),
        price: dbItem?.price ?? food.price,
        image:
          dbItem?.image ||
          food.image ||
          (food.name.toLowerCase().includes("cold coffee")
            ? "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
            : food.name.toLowerCase().includes("crispy chicken")
              ? "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"
              : ""),
      };
    });
    const filteredFood = foodWithImages.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Menu" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return (
      <SafeAreaView
        style={[
          styles.homeContainer,
          darkMode && { backgroundColor: "#111111" },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.homeHeader}>
            <View>
              <Text
                style={[styles.welcomeText, darkMode && { color: "#FFFFFF" }]}
              >
                GOOD FOOD,
              </Text>

              <Text
                style={[styles.homeTitle, darkMode && { color: "#FFFFFF" }]}
              >
                GOOD MOOD.
              </Text>
            </View>

            <View style={styles.profileCircle}>
              <Text style={styles.profileLetter}>B</Text>
            </View>
          </View>

          <View
            style={[
              styles.searchContainer,
              darkMode && { backgroundColor: "#1E1E1E" },
            ]}
          >
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              style={[styles.searchInput, darkMode && { color: "#FFFFFF" }]}
              placeholder="Search food..."
              placeholderTextColor={darkMode ? "#AAAAAA" : "#999"}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.offerCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerSmall}>TODAY'S SPECIAL</Text>

              <Text style={styles.offerTitle}>Delicious Food</Text>

              <Text style={styles.offerDescription}>
                Freshly prepared just for you.
              </Text>
            </View>

            <Image source={{ uri: FOOD[0].image }} style={styles.offerImage} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 18 }}
            contentContainerStyle={{ paddingRight: 10 }}
          >
            {[
              "All Menu",
              "Fast Food",
              "Pizza",
              "Crown Crust",
              "Desi",
              "Cold Drinks",
              "Drinks",
              "Desserts",
            ].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  backgroundColor:
                    selectedCategory === category ? "#FF6B35" : "#FFFFFF",
                  paddingHorizontal: 18,
                  paddingVertical: 11,
                  borderRadius: 20,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: "#EEEEEE",
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category ? "#FFFFFF" : "#333333",
                    fontWeight: "800",
                    fontSize: 13,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Menu</Text>

            <Text style={styles.seeAll}>{filteredFood.length} Items</Text>
          </View>

          <View style={styles.foodGrid}>
            {filteredFood.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.foodCard,
                  darkMode && { backgroundColor: "#1E1E1E" },
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.foodImage} />

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.favoriteIcon}>
                    {favorites.includes(item.id) ? "♥" : "♡"}
                  </Text>
                </TouchableOpacity>
                <View style={styles.foodInfo}>
                  <Text
                    style={[styles.foodName, darkMode && { color: "#FFFFFF" }]}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={[
                      styles.foodCategory,
                      darkMode && { color: "#AAAAAA" },
                    ]}
                  >
                    {item.category}
                  </Text>

                  <View style={styles.foodBottom}>
                    <Text style={styles.foodPrice}>Rs. {item.price}</Text>

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        <BottomNav
          screen={screen}
          setScreen={setScreen}
          cartCount={cartCount}
          darkMode={darkMode}
        />
      </SafeAreaView>
    );
  }

  return null;
}

// =========================
// BOTTOM NAVIGATION
// =========================

function BottomNav({
  screen,
  setScreen,
  cartCount,
  darkMode,
}: {
  screen: string;
  setScreen: (screen: string) => void;
  cartCount: number;
  darkMode: boolean;
}) {
  return (
    <View
      style={[
        styles.bottomNav,
        darkMode && {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#333333",
        },
      ]}
    >
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setScreen("home")}
      >
        <Text style={screen === "home" ? styles.navIconActive : styles.navIcon}>
          ⌂
        </Text>

        <Text style={screen === "home" ? styles.navActive : styles.navText}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setScreen("favorites")}
      >
        <Text
          style={screen === "favorites" ? styles.navIconActive : styles.navIcon}
        >
          ♡
        </Text>

        <Text
          style={screen === "favorites" ? styles.navActive : styles.navText}
        >
          Favorites
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setScreen("reservation")}
      >
        <Text
          style={
            screen === "reservation" ? styles.navIconActive : styles.navIcon
          }
        >
          ▣
        </Text>

        <Text
          style={screen === "reservation" ? styles.navActive : styles.navText}
        >
          Booking
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setScreen("cart")}
      >
        <View>
          <Text
            style={screen === "cart" ? styles.navIconActive : styles.navIcon}
          >
            🛒
          </Text>

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>

        <Text style={screen === "cart" ? styles.navActive : styles.navText}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setScreen("profile")}
      >
        <Text
          style={screen === "profile" ? styles.navIconActive : styles.navIcon}
        >
          ●
        </Text>

        <Text style={screen === "profile" ? styles.navActive : styles.navText}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 60,
    fontWeight: "900",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 4,
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },

  bottom: {
    position: "absolute",
    bottom: 45,
    left: 25,
    right: 25,
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#FF6B35",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  smallText: {
    color: "#777777",
    marginTop: 15,
    fontSize: 12,
  },

  loginScreen: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "center",
    padding: 25,
  },

  loginBox: {
    width: "100%",
    alignItems: "center",
  },

  logoCircleSmall: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  logoSmall: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
  },

  loginTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },

  loginSubtitle: {
    color: "#999999",
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  loginButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#FF6B35",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  backButton: {
    marginTop: 20,
  },

  backText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "700",
  },

  signupButton: {
    marginTop: 25,
  },

  signupText: {
    color: "#777777",
    fontSize: 13,
  },

  signupHighlight: {
    color: "#FF6B35",
    fontWeight: "900",
  },

  homeContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  promoInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#111111",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  promoButton: {
    height: 48,
    paddingHorizontal: 18,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  dashboardWelcome: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 18,
  },

  dashboardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  dashboardCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  dashboardIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  dashboardNumber: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "900",
  },

  dashboardLabel: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  dashboardSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 5,
  },

  dashboardSummaryTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 15,
  },

  dashboardEmpty: {
    color: "#999999",
    fontSize: 13,
  },

  dashboardOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  dashboardOrderTitle: {
    color: "#222222",
    fontSize: 14,
    fontWeight: "800",
  },

  dashboardOrderStatus: {
    color: "#FF6B35",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  dashboardOrderPrice: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "900",
  },

  homeHeader: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeText: {
    color: "#999999",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  homeTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "900",
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },

  profileLetter: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },

  profileName: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "900",
  },

  profileEmail: {
    color: "#999999",
    fontSize: 13,
    marginTop: 5,
  },

  profileOption: {
    backgroundColor: "#FFFFFF",
    height: 58,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  profileOptionText: {
    color: "#222222",
    fontSize: 15,
    fontWeight: "700",
  },

  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  trackButton: {
    height: 45,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  trackButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  trackingMainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
  },

  trackingMainTitle: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "900",
  },

  trackingMainStatus: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
  },

  timeline: {
    marginTop: 25,
  },

  timelineActive: {
    color: "#FF6B35",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 20,
  },

  timelinePending: {
    color: "#999999",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 20,
  },

  trackingBox: {
    backgroundColor: "#FFF3ED",
    borderRadius: 15,
    padding: 15,
    marginTop: 12,
  },

  trackingTitle: {
    color: "#FF6B35",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 8,
  },

  trackingStep: {
    color: "#555555",
    fontSize: 13,
    marginTop: 6,
  },

  orderTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
  },

  orderDate: {
    color: "#999999",
    fontSize: 12,
    marginTop: 5,
  },

  orderStatus: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 10,
  },

  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF3ED",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 10,
  },

  statusBadgeText: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "900",
  },

  orderTotal: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 10,
  },

  orderItem: {
    color: "#555555",
    fontSize: 13,
    marginTop: 6,
  },

  logoutButton: {
    height: 52,
    backgroundColor: "#FFF0EB",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },

  logoutText: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "900",
  },

  searchContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  searchIcon: {
    fontSize: 25,
    color: "#777777",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  offerCard: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#171717",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    minHeight: 175,
    overflow: "hidden",
  },

  offerSmall: {
    color: "#FF6B35",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  offerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  offerDescription: {
    color: "#AAAAAA",
    fontSize: 12,
    marginTop: 4,
  },

  orderButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 15,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  offerImage: {
    width: 125,
    height: 140,
    borderRadius: 15,
    marginLeft: 8,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "900",
  },

  seeAll: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "700",
  },

  categoryList: {
    paddingHorizontal: 20,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    width: 85,
    height: 90,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: "#FF6B35",
    width: 85,
    height: 90,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  categoryEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },

  categoryText: {
    color: "#555555",
    fontSize: 11,
    fontWeight: "700",
  },

  categoryActiveText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  foodGrid: {
    paddingHorizontal: 20,
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 15,
    overflow: "hidden",
  },

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 4,
  },

  favoriteIcon: {
    fontSize: 23,
    color: "#FF6B35",
    fontWeight: "900",
  },

  foodImage: {
    width: "100%",
    height: 170,
  },

  foodInfo: {
    padding: 14,
  },

  foodName: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "900",
  },

  foodCategory: {
    color: "#999999",
    fontSize: 12,
    marginTop: 3,
  },

  foodBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  foodPrice: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "900",
  },

  addButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
  },

  bottomNav: {
    position: "absolute",
    bottom: 70,
    left: 12,
    right: 12,
    height: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navIcon: {
    color: "#999999",
    fontSize: 22,
  },

  navIconActive: {
    color: "#FF6B35",
    fontSize: 22,
  },

  navText: {
    color: "#999999",
    fontSize: 10,
    marginTop: 3,
  },

  navActive: {
    color: "#FF6B35",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 3,
  },

  badge: {
    position: "absolute",
    right: -8,
    top: -7,
    backgroundColor: "#FF6B35",
    minWidth: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  cartHeader: {
    height: 75,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backArrow: {
    fontSize: 30,
    color: "#111111",
  },

  cartTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
  },

  cartCountBox: {
    backgroundColor: "#FF6B35",
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCountText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
  },

  emptyCartIcon: {
    fontSize: 60,
  },

  emptyCartTitle: {
    fontSize: 23,
    fontWeight: "900",
    marginTop: 15,
    color: "#000000",
  },

  emptyCartText: {
    color: "#999999",
    marginTop: 7,
    marginBottom: 20,
  },

  cartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },

  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },

  cartInfo: {
    flex: 1,
    marginLeft: 14,
  },

  cartFoodName: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
  },

  cartCategory: {
    color: "#999999",
    fontSize: 11,
    marginTop: 3,
  },

  cartPrice: {
    color: "#FF6B35",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 7,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#F0F0F0",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    fontSize: 20,
    color: "#111111",
    fontWeight: "700",
  },

  quantity: {
    marginHorizontal: 14,
    fontSize: 15,
    fontWeight: "900",
  },

  checkoutBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  totalValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },

  discountText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "800",
  },

  grandTotalLabel: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "900",
  },

  totalLabel: {
    color: "#777777",
    fontSize: 13,
  },

  totalPrice: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "700",
  },

  freeText: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 5,
  },

  grandTotal: {
    color: "#FF6B35",
    fontSize: 20,
    fontWeight: "900",
  },

  placeOrderButton: {
    height: 52,
    backgroundColor: "#FF6B35",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  reservationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },

  reservationTitle: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "900",
  },

  reservationSubtitle: {
    color: "#999999",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 25,
  },

  reservationLabel: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 12,
  },

  reservationInput: {
    height: 52,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingHorizontal: 15,
    color: "#111111",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  reserveButton: {
    height: 54,
    backgroundColor: "#FF6B35",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  reservationSuccess: {
    backgroundColor: "#FFF3ED",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },

  cancelReservationButton: {
    height: 48,
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },

  cancelReservationText: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "900",
  },

  successTitle: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },

  successText: {
    color: "#555555",
    fontSize: 13,
    marginTop: 5,
  },

  dashboardCancelButton: {
    height: 45,
    backgroundColor: "#FFF0EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },

  dashboardCancelText: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "900",
  },

  tableGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  tableCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },

  selectedTable: {
    borderColor: "#000",
    borderWidth: 2,
  },

  tableName: {
    fontSize: 17,
    fontWeight: "bold",
  },

  tableSeats: {
    marginTop: 5,
    fontSize: 14,
  },

  availableText: {
    marginTop: 8,
    fontSize: 13,
  },

  reservedText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  timeCard: {
    width: "48%",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },

  selectedTime: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6B35",
    borderWidth: 2,
  },

  timeText: {
    fontSize: 14,
  },

  selectedTimeText: {
    color: "#111111",
    fontWeight: "bold",
  },

  successAvailable: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },

  availableTableText: {
    marginLeft: 10,
    fontSize: 12,
  },
});
