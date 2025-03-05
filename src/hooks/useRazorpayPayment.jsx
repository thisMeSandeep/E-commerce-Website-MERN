import { useState } from "react"
import axiosInstance from "../utils/axiosInstance";

const useRazorpayPayment = () => {
    const [loading, setLoading] = useState(false);


    const processPayment = async({ amount, userId, products, quantity, onSuccess, onFailure }=> {
    setLoading(true);
    try {
        //   step-1 :create order on backend
        const { data } = axiosInstance.post("/api/order/create-order", { amount });
        let order;
        if (data.success) {
            order = data;
        }


        // step-2:open razorpay gateway
        const options = {
            key: 'rzp_test_DYjIofeJHP2lJU',
            amount: order.amount,
            currency: "INR",
            name: "DropCart",
            description: "Fake Transaction",
            order_id: order.orderId,
            handler: async (response) => {
                try {
                    // verify payment
                    const verifyRes = await axiosInstance.post("/api/order/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        product,
                        quantity,
                        amount,
                    });
                    if (verifyRes.data.success) {
                        onSuccess();
                    } else {
                        onFailure("Payment verification failed");
                    }
                } catch (err) {
                    onFailure("Payment verification failed");
                }
            }
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (err) {
        onFailure("Payment process failed");
    } finally {
        setLoading(false);
    }
})

return { processPayment, loading };
}

export default useRazorpayPayment