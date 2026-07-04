import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type InventoryItem = {
  id: number;
  productName: string;
  stock: number;
  price: number | string;
};

type CartItem = InventoryItem & {
  quantity: number;
};

type InventoryResponse = {
  data?: InventoryItem[];
  inventory?: InventoryItem[];
  items?: InventoryItem[];
};

const getInventoryItems = (data: InventoryResponse | InventoryItem[]) => {
  if (Array.isArray(data)) return data;

  return data.data || data.inventory || data.items || [];
};

const getScannedValue = (value: string) => {
  const trimmed = value.trim();

  try {
    const parsed = JSON.parse(trimmed) as {
      id?: string | number;
      productName?: string;
      name?: string;
    };

    return String(parsed.id || parsed.productName || parsed.name || trimmed);
  } catch {
    return trimmed;
  }
};

const Scanner = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastScanned, setLastScanned] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const stopScanner = async () => {
    try {
      await scannerRef.current?.stop();
      await scannerRef.current?.clear();
    } catch {
      // Scanner may already be stopped.
    }
  };

  const addToCart = (item: InventoryItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const lookupScannedItem = async (decodedText: string) => {
    const scannedValue = getScannedValue(decodedText);

    setLastScanned(scannedValue);
    setError("");
    setMessage("Looking up item...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/inventory`,
        {
          credentials: "include",
        },
      );

      const data = (await response.json()) as
        | InventoryResponse
        | InventoryItem[];

      if (!response.ok) {
        setError("Could not load inventory.");
        setMessage("");
        return;
      }

      const inventoryItems = getInventoryItems(data);
      const lowerScannedValue = scannedValue.toLowerCase();

      const foundItem =
        inventoryItems.find((item) => String(item.id) === scannedValue) ||
        inventoryItems.find((item) =>
          item.productName.toLowerCase().includes(lowerScannedValue),
        );

      if (!foundItem) {
        setError("Item not found in inventory.");
        setMessage("");
        return;
      }

      if (foundItem.stock <= 0) {
        setError(`${foundItem.productName} is out of stock.`);
        setMessage("");
        return;
      }

      addToCart(foundItem);
      setMessage(`${foundItem.productName} added to cart`);
    } catch {
      setError("Server error while looking up item.");
      setMessage("");
    }
  };

  const startScanner = async () => {
    const scannerId = "qr-reader";
    setError("");

    try {
      if (scannerRef.current) {
        await stopScanner();
      }

      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          await stopScanner();
          await lookupScannedItem(decodedText);
        },
        () => {},
      );
    } catch {
      setError("Camera permission denied or camera cannot be opened.");
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const removeFromCart = (id: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const increaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cart.map((item) => ({
            inventoryId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Checkout failed.");
        return;
      }

      setCart([]);
      setMessage(`Checkout done: ${data.transactionNumber}`);
      await startScanner();
    } catch {
      setError("Server error during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
        <h1 className="text-2xl font-black text-gray-950 text-center mb-4">
          Scanner
        </h1>

        <div id="qr-reader" className="overflow-hidden rounded-2xl bg-black" />

        <button
          type="button"
          onClick={startScanner}
          className="mt-4 w-full rounded-xl bg-gray-950 py-3 text-sm font-bold text-white"
        >
          Scan Next Item
        </button>

        {lastScanned && (
          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3">
            <p className="text-xs font-bold text-gray-500 mb-1">Last Scan</p>
            <p className="text-sm text-gray-950 break-all">{lastScanned}</p>
          </div>
        )}

        {message && (
          <p className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold p-3">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-semibold p-3">
            {error}
          </p>
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-gray-950">Cart</h2>
            <span className="text-xs font-bold text-gray-500">
              {cart.length} items
            </span>
          </div>

          {cart.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-sm font-semibold text-gray-400">
              Scan items to add them here.
            </p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-gray-950">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stock: {item.stock} · Price: {Number(item.price || 0)}{" "}
                        EGP
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-rose-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-8 w-8 rounded-lg bg-white border border-gray-200 font-black"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center text-sm font-black">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="h-8 w-8 rounded-lg bg-white border border-gray-200 font-black"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-black text-gray-950">
                      {Number(item.price || 0) * item.quantity} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-indigo-700">Total</span>
            <span className="text-xl font-black text-indigo-950">
              {total} EGP
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={cart.length === 0 || isCheckingOut}
          onClick={handleCheckout}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white disabled:bg-gray-300"
        >
          {isCheckingOut ? "Checking out..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Scanner;
