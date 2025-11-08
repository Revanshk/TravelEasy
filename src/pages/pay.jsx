import React, { useState } from 'react'
import { CheckCircle, Receipt } from 'lucide-react'

import delhiHotels from '../store/delhi.js';
import indoreHotels from '../store/indore.js';
import jabalpurHotels from '../store/jabalpur.js';
import mumbaiHotels from '../store/mumbai.js';
import puneHotels from '../store/pune.js';

// Razorpay script load helper
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const cityHotelData = [
  { city: "Delhi",     list: delhiHotels },
  { city: "Indore",    list: indoreHotels },
  { city: "Jabalpur",  list: jabalpurHotels },
  { city: "Mumbai",    list: mumbaiHotels },
  { city: "Pune",      list: puneHotels },
];

const DEFAULT_CITY_INDEX = 0;
const DEFAULT_HOTEL_INDEX = 0;

const TAX_RATE = 0.12;
const DEFAULT_PEOPLE = 3;

// Supported payment methods for Razorpay demo/test mode
const DEFAULT_RAZORPAY_METHODS = {
  upi: true,
  card: true,
  netbanking: true,
  wallet: false,
  emi: false,
  paylater: false,
  bank_transfer: false,
  app: false,
};

const DEFAULT_RAZORPAY_UPI_OPTIONS = {
  flow: "collect", // default
  // Use with scheme, but show it only if supported (compatibility)
  apps: ["google_pay", "phonepe", "paytm", "bhim"], // only show common schemes
  // Provide a test UPI if needed for visibility (test mode)
  upi_only: false,
};

const Pay = (props) => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(props.selectedCityIndex ?? DEFAULT_CITY_INDEX);
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(props.selectedHotelIndex ?? DEFAULT_HOTEL_INDEX);

  // Invoice info
  const [numPeople, setNumPeople] = useState(DEFAULT_PEOPLE);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [success, setSuccess] = useState(false);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState(""); // not needed for demo/testmode

  const selectedCityObj = cityHotelData[selectedCityIndex] || cityHotelData[0];
  const hotels = selectedCityObj.list;
  const selectedHotel = hotels[selectedHotelIndex] || hotels[0];
  const ROOM_CHARGE = selectedHotel.price;

  // --- Calculate number of nights ---
  function calcNights() {
    if (!checkin || !checkout) return 1;
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diff = outDate.getTime() - inDate.getTime();
    let nights = Math.floor(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  }
  const nights = calcNights();

  const roomsNeeded = Math.ceil(numPeople / 2);
  const baseAmount = roomsNeeded * ROOM_CHARGE * nights;
  const taxAmount = baseAmount * TAX_RATE;
  const totalAmount = baseAmount + taxAmount;

  const handleNumPeople = (delta) => {
    setNumPeople(p => {
      let next = p + delta;
      if (next < 1) next = 1;
      if (next > 12) next = 12;
      return next;
    });
  };

  // City/hotel selection resets
  const handleCitySelect = idx => {
    setSelectedCityIndex(idx);
    setSelectedHotelIndex(0);
    setSuccess(false);
  };
  const handleHotelSelect = idx => {
    setSelectedHotelIndex(idx);
    setSuccess(false);
  };

  // Razorpay trigger
  const handleRazorpayPay = async (e) => {
    e.preventDefault();
    setRazorpayLoading(true);

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      setRazorpayLoading(false);
      return;
    }

    // For demo/testmode, add UPI option explicitly with scheme, but visible only if compatible
    const razorpayOptions = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Test key, replace with live in prod
      amount: Math.round(totalAmount * 100), // in paise
      currency: 'INR',
      name: selectedHotel.name,
      description: `Hotel Booking: ${selectedCityObj.city}`,
      image: "https://razorpay.com/favicon.png",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        hotel: selectedHotel.name,
        city: selectedCityObj.city,
        rooms: roomsNeeded,
        people: numPeople,
        nights: nights,
      },
      theme: { color: "#2563eb" },
      handler: function (response) {
        setSuccess(true);
        setRazorpayOrderId(response.razorpay_payment_id);
        setRazorpayLoading(false);
      },
      modal: {
        ondismiss: function () {
          setRazorpayLoading(false);
        }
      },
      method: { ...DEFAULT_RAZORPAY_METHODS },
      upi: {
        ...DEFAULT_RAZORPAY_UPI_OPTIONS,
        // Use intent/collect both so intent enabled, but visible only if compatible
        // (Razorpay auto-selects as per environment, so this is for visibility/schema exposure)
        // In real world, can use scheme and show based on device support
        // apps specifies preference and compatible apps; only visible if on device/supports it
        apps: ["google_pay", "phonepe", "paytm", "bhim"],
        // flow stays "collect", so collect and intent both show based on scheme support
      }
    };

    // Use Razorpay checkout
    const rzpay = new window.Razorpay(razorpayOptions);
    rzpay.open();
  };

  // --- Invoice UI helper ---
  function Invoice() {
    return (
      <div className="mt-4 mb-2 bg-white border border-blue-200 rounded-xl shadow-lg px-5 py-4 text-left w-full max-w-md mx-auto text-gray-800 animate-fade-in-smooth">
        <div className="flex items-center mb-3">
          <Receipt className="text-blue-500 mr-2" size={28} />
          <span className="font-semibold text-lg text-blue-700 tracking-tight">Invoice</span>
        </div>
        <div className="text-sm space-y-1 mb-2">
          <div>
            <span className="text-gray-600 font-semibold">Hotel:</span> {selectedHotel.name}
            <span className="text-blue-500 font-medium ml-2">({selectedCityObj.city})</span>
          </div>
          <div>
            <span className="text-gray-600 font-semibold">Check-In:</span> {checkin || <span className="italic text-gray-400">[not set]</span>}
          </div>
          <div>
            <span className="text-gray-600 font-semibold">Check-Out:</span> {checkout || <span className="italic text-gray-400">[not set]</span>}
          </div>
          <div>
            <span className="text-gray-600 font-semibold">Nights:</span> {nights}
          </div>
          <div>
            <span className="text-gray-600 font-semibold">People:</span> {numPeople}
            <span className="ml-4"><span className="text-gray-600 font-semibold">Rooms:</span> {roomsNeeded}</span>
          </div>
        </div>
        <hr />
        <div className="py-2 text-sm">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{(ROOM_CHARGE * roomsNeeded * nights).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (@{Math.round(TAX_RATE*100)}%)</span>
            <span>₹{taxAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>
          <div className="flex justify-between font-extrabold text-blue-700 pt-2 text-lg">
            <span>Total Payable</span>
            <span>
              ₹{totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </span>
          </div>
        </div>
        {success && razorpayOrderId && (
          <div className="pt-2 text-xs text-green-700">
            <div className="flex items-center gap-1">
              <CheckCircle size={14} />
              Razorpay Payment ID: {razorpayOrderId}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-blue-100 px-2 md:px-4 py-10 selection:bg-blue-200">

      {/* --- Select City --- */}
      <div className="mb-6 flex flex-wrap justify-center gap-3 w-full max-w-2xl">
        <span className="text-sm text-gray-500 font-semibold self-center pr-1">Choose City:</span>
        {cityHotelData.map((city, i) => (
          <button
            key={city.city}
            onClick={() => handleCitySelect(i)}
            className={
              "px-3 py-2 rounded-lg shadow font-medium border text-sm transition " +
              (selectedCityIndex === i
                ? "bg-blue-600 text-white border-blue-700 scale-105"
                : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
              )
            }
            type="button"
            data-testid={`select-city-${i}`}
            style={{
              color: selectedCityIndex === i ? "#ffffff" : "#2563eb",
            }}
          >
            {city.city}
          </button>
        ))}
      </div>

      {/* --- Select Hotel from chosen city --- */}
      <div className="mb-7 flex flex-wrap justify-center gap-4 w-full max-w-3xl">
        <span className="text-sm text-gray-500 font-semibold self-center pr-1">Select Hotel:</span>
        {hotels.map((h, idx) => (
          <button
            key={h.id ?? `${selectedCityObj.city}-${idx}`}
            onClick={() => handleHotelSelect(idx)}
            className={
              "px-4 py-2 rounded-lg shadow font-medium border transition text-sm " +
              (selectedHotelIndex === idx
                ? "bg-blue-600 text-white border-blue-700 scale-105"
                : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
              )
            }
            type="button"
            data-testid={`select-hotel-${selectedCityObj.city}-${idx}`}
            style={{
              color: selectedHotelIndex === idx ? "#ffffff" : "#2563eb",
            }}
          >
            {h.name}
            <span className="ml-2 font-semibold">₹{h.price.toLocaleString()}</span>
          </button>
        ))}
      </div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-0 sm:p-6 border border-blue-100 relative overflow-hidden animate-fade-in">
        <div className="absolute -right-12 -top-20 opacity-10 text-blue-300 text-[13rem] select-none pointer-events-none">
          <Receipt />
        </div>
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center drop-shadow-sm tracking-tight flex items-center justify-center gap-2">
          <span>Payment & Invoice</span>
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 mb-7 shadow flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full p-2 shadow">
              <Receipt size={30} />
            </span>
            <div>
              <div className="text-gray-600 font-medium">Total Amount</div>
              <div className="text-3xl font-extrabold text-blue-800 tracking-tight mt-0.5">
                ₹{totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
              </div>
              <div className="text-xs text-gray-500 font-light mt-1">
                (
                  {roomsNeeded} room{roomsNeeded > 1 ? 's' : ''} &times; ₹{ROOM_CHARGE.toLocaleString()} x {nights} night{nights>1?"s":""} + GST ₹{taxAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                )
              </div>
              <div className="text-xs text-gray-400 font-light mt-1">
                {selectedHotel.name} <span className="font-medium text-blue-500">({selectedCityObj.city})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Number of People Control */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full shadow border border-blue-100">
            <span className="font-medium text-gray-700 text-sm">People:</span>
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center hover:bg-blue-200"
              onClick={() => handleNumPeople(-1)}
              disabled={numPeople <= 1}
              style={{ color: "#2563eb" }}
            >-</button>
            <span className="mx-2 text-lg font-bold">{numPeople}</span>
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center hover:bg-blue-200"
              onClick={() => handleNumPeople(1)}
              disabled={numPeople >= 12}
              style={{ color: "#2563eb" }}
            >+</button>
          </div>
        </div>

        {/* Check-In / Check-Out controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7">
          <div className="flex gap-2 items-center">
            <label className="text-gray-600 font-medium text-sm" htmlFor="checkin">Check-In</label>
            <input
              type="date"
              id="checkin"
              className="px-3 py-2 rounded border border-blue-200 focus:border-blue-400 outline-none shadow"
              value={checkin}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                setCheckin(e.target.value);
                // If checkout is earlier, reset
                if (checkout && new Date(e.target.value) >= new Date(checkout)) {
                  setCheckout("");
                }
              }}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-gray-600 font-medium text-sm" htmlFor="checkout">Check-Out</label>
            <input
              type="date"
              id="checkout"
              className="px-3 py-2 rounded border border-blue-200 focus:border-blue-400 outline-none shadow"
              value={checkout}
              min={checkin ? (() => {
                const date = new Date(checkin); date.setDate(date.getDate() + 1);
                return date.toISOString().split('T')[0];
              })() : undefined}
              onChange={e => setCheckout(e.target.value)}
              required
              disabled={!checkin}
            />
          </div>
        </div>

        {/* Invoice */}
        <Invoice />

        {/* Razorpay Pay button - hide after success */}
        {!success &&
          <div className="mt-7">
            <button
              disabled={!checkin || !checkout || razorpayLoading}
              onClick={handleRazorpayPay}
              className={`w-full py-3 rounded-lg text-xl font-semibold transition shadow-lg tracking-tight flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 focus:scale-95 focus:outline-none
                ${razorpayLoading ? "opacity-50 cursor-not-allowed" : ""}`
              }
              style={{ color: "#fff" }}
            >
              {razorpayLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : null}
              Pay ₹{totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})} Now (via Razorpay)
            </button>
            <div className="flex justify-center text-xs mt-2 text-gray-400 gap-2 items-center">
              <span className="inline-block text-blue-400">
                <CheckCircle size={14} />
              </span>
              100% Secure Pay · Test Mode Only
            </div>
            <div className="flex justify-center text-xs mt-1 text-blue-600 gap-1 items-center font-medium">
              <span>
                UPI (with scheme) enabled in compatible browsers/apps ·
                <b className="ml-1">Test UPI: success@razorpay</b>
              </span>
            </div>
          </div>
        }

        {/* Success Invoice Bubble */}
        {success && (
          <div className="z-10 mt-8 mb-3 text-center p-4 rounded-xl bg-green-50 border-l-4 border-green-500 shadow-xl animate-bounce-in">
            <div className="flex flex-col items-center gap-1">
              <CheckCircle className="text-green-600 mb-1" size={32} />
              <div className="text-green-700 text-xl font-bold mb-1">
                Payment Successful!
              </div>
              <div className="text-gray-700 font-medium mb-1">
                Thank you for your booking 🎉
              </div>
              <div className="rounded-lg bg-white px-4 py-2 text-gray-600 shadow mt-1 inline-block text-sm">
                <div><span className="font-semibold text-green-800">Hotel:</span> {selectedHotel.name} <span className="text-blue-600">({selectedCityObj.city})</span></div>
                <div><span className="font-semibold text-green-800">Amount Paid:</span> ₹{totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div><span className="font-semibold text-green-800">Check-In:</span> {checkin} | <span className="font-semibold">Check-Out:</span> {checkout}</div>
                <div><span className="font-semibold text-green-800">Nights:</span> {nights}</div>
                <div><span className="font-semibold text-green-800">People:</span> {numPeople} | <span className="font-semibold">Rooms:</span> {roomsNeeded}</div>
                {razorpayOrderId && (
                  <div><span className="font-semibold text-green-800">Razorpay Payment ID:</span> {razorpayOrderId}</div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
      <style>{`
        .animate-fade-in {
          animation: fadein-appear 0.7s cubic-bezier(0.2,0.6,0.35,1) 1;
        }
        .animate-fade-in-smooth {
          animation: fadein-appear 0.8s cubic-bezier(0.18,0.7,0.32,1) 1;
        }
        .animate-bounce-in {
          animation: bounce-in-payment 0.8s cubic-bezier(0.52,1.5,0.59,0.89) 1;
        }
        @keyframes fadein-appear {
          from { opacity: 0; transform: translateY(30px);}
          to   { opacity: 1; transform: none;}
        }
        @keyframes bounce-in-payment {
          0%   { opacity: 0; transform: scale(0.92) translateY(30px);}
          70%  { opacity: 0.85; transform: scale(1.06) translateY(-5px);}
          90%  { opacity: 1; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
};

export default Pay;