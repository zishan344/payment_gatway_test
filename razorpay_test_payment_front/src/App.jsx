import "./App.css";
import useRazorpay from "react-razorpay";

import axios from "axios";
function App() {
  const [Razorpay] = useRazorpay();

  const loadscript = (src) => {
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
  };
  const handlePayment = async () => {
    // create api integration
    let orderId = "oD" + Math.random() * Math.floor(Math.random() * Date.now());
    const res = await loadscript("http://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      return alert("Razorpay SDK failed to Load. Are you online");
    }
    let paymentRes = {
      order_id: orderId,
      amount: "100",
      currency: "INR",
      payment_capture: 1,
    };
    let result = await axios.post(
      "http://localhost:8080/api/v1/createorder",
      paymentRes
    );
    // start
    if (!result.data.data) {
      return alert("Server error, Are you online");
    } else {
      const options = {
        key: "rzp_test_oCEcj0vYBjA2Jn",
        currency: result.data.data.currency,
        amount: result.data.data.amount * 100,
        order_id: result.data.id,
        name: "payment test",
        description: "Test Transaction",
        image:
          "https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI=",
        handler: async function (response) {
          /*  const result = await GetOrderDetails.GetPaymentOrderList(
            response.razorpay_payment_id
          ); */
          const result_1 = await axios.post(
            "http://localhost:8080/api/v1/cardDetail",
            response.razorpay_payment_id
          );
          console.log(result_1);
          /*   if (result) {
            const finalList = {
              OrderId: orderId,
              payment: result.data.method,
              addressId: newCart.addressId,
              shippingPrice: newCart.shippingPrice,
              total: result.data.amount / 100,
              cart: newCart.cart,
              status: result.data.status,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            };
          } */
        },
        prefill: {
          name: "Piyush Garg",
          email: "zishanahmed344@gmail.com",
          contact: "+88 01810272303",
        },
        notes: {
          address: "payment test",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
    // end
  };
  return (
    <div>
      <h2>Welcome to Payment tester project</h2>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default App;
