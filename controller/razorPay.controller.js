const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");


//create the razorpay instance
let razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


//create the order with razorpay integration
const createOrderRazorPay = async (req, res) => {
  console.log("amount");
  const {amount}  = req.body;
  
  if(!amount) {
    res.json({
    message:"Please give the amount to pay"
  })
}
  

  const uid = uuidv4();
  console.log("uid->>", uid);

  orderRazorpayParams = {
    amount: amount * 100,
    currency: "INR",
    receipt: uid,
    payment_capture: "1",
  };

  razorPayInstance.orders
    .create(orderRazorpayParams)
    .then(async (response) => {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

      // Save orderId and other payment details

      res.json({
        success: true,
        order_id: response.id,
        receipt_id: response.receipt,
        razorpayKeyId,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  
};


//verify the razorpay id to successfully payment

const verifyRazorPayOrder = async(req,res) => {
     const {razorpay_order_id , razorpay_payment_id , razorpay_signature} = req.body;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        res.json({
            message:"Please give the all details to verify the order"
          })
    }

     
    body = razorpay_order_id + "|" + razorpay_payment_id;
    let crypto = require("crypto");
    let expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");


      if (expectedSignature === razorpay_signature) {
        
        res.json({
          success: true,
          message: "Payment Successfull",
        });
      } else {
        return res.json({
            success: false,
            message: "Invalid Crediantals",
          });
      }

}



module.exports = {createOrderRazorPay,verifyRazorPayOrder}