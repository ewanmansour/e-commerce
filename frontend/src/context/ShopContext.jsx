import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ShopContext } from "./shop-context";
import { calculateCartAmount, cloneCart } from "../utils/cart";

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const authHeaders = useCallback((authToken = token) => ({
        headers: { token: authToken },
    }), [token]);

    const {
        data: products = [],
        error: productsError,
        isFetching: productsLoading,
        refetch: refetchProducts,
    } = useQuery({
        queryKey: ["products", backendUrl],
        queryFn: async () => {
            const response = await axios.get(`${backendUrl}/api/product/list`);

            if (response.data.success) {
                return response.data.products || [];
            }

            throw new Error(response.data.message || "Could not load products");
        },
    });

    useEffect(() => {
        if (productsError) {
            toast.error(productsError.response?.data?.message || productsError.message);
        }
    }, [productsError]);

    const getUserCart = useCallback(async (authToken) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                authHeaders(authToken),
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }, [authHeaders, backendUrl]);

    const addToCart = useCallback(async (itemId, size) => {
        if (!size) {
            toast.error("Please select a product size");
            return;
        }

        const previousCart = cartItems;
        const cartData = cloneCart(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, authHeaders());
            } catch (error) {
                setCartItems(previousCart);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    }, [authHeaders, backendUrl, cartItems, token]);

    const updateQuantity = useCallback(async (itemId, size, quantity) => {
        const nextQuantity = Math.max(Number(quantity), 0);
        const previousCart = cartItems;
        const cartData = cloneCart(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (nextQuantity === 0) {
            delete cartData[itemId][size];

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = nextQuantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity: nextQuantity },
                    authHeaders(),
                );
            } catch (error) {
                setCartItems(previousCart);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    }, [authHeaders, backendUrl, cartItems, token]);

    const getCartCount = useCallback(() => {
        return Object.values(cartItems).reduce((count, sizes) => (
            count + Object.values(sizes).reduce((sizeCount, quantity) => sizeCount + Number(quantity || 0), 0)
        ), 0);
    }, [cartItems]);

    const getCartAmount = useCallback(() => (
        calculateCartAmount(cartItems, products)
    ), [cartItems, products]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            getUserCart(token);
        } else {
            localStorage.removeItem("token");
        }
    }, [getUserCart, token]);

    const value = useMemo(() => ({
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        productsLoading,
        refetchProducts,
    }), [
        addToCart,
        backendUrl,
        cartItems,
        getCartAmount,
        getCartCount,
        navigate,
        products,
        search,
        showSearch,
        token,
        productsLoading,
        refetchProducts,
        updateQuantity,
    ]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
