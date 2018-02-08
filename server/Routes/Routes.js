"use strict";
module.exports = function(app) {
  var adminlogin = require("../Controllers/admin_login_Controller");
  var user = require("../Controllers/user_Controller");
  var booking = require("../Controllers/booking_Controller");
  var feedback = require("../Controllers/feedback_controller");
  var coupon = require("../Controllers/coupon_Controller");
  var cors = require("cors");
  var nakli = require("../Controllers/nakli_controller");
  var passenger = require("../Controllers/passenger_details_Controller");
  var insurance = require("../Controllers/insurance_Controller");
  var recommendation = require("../Controllers/recommendation_Controller");

  app.use(cors());

  // Admin Routes
  app.route("/admin").post(adminlogin.post_details);
  app.route("/admin/all").get(adminlogin.list_all_admin);
  app.route("/admin/:name").delete(adminlogin.delete_admin);
  app.route("/admin/login/:name/:password").get(adminlogin.get_details);

  //User Routes
  app.route("/user").post(user.register_user);
  app.route("/user/update/:email").put(user.profile_update);
  app.route("/user/all").get(user.list_all_user);
  app.route("/user/login/:email/:password").get(user.get_details);
  app.route("/user/password").post(user.send_password);
  app.route("/user/settoken").post(user.set_reset_token);
  app.route("/user/resetpassword").post(user.reset_password);
  app.route("/user/checktoken").post(user.checktoken);
  app.route("/user/count").get(user.user_count);
  app.route("/user/upgrade/:email").put(user.upgrade);

  //Booking Route
  app.route("/booking/all").get(booking.list_all_booking);
  app.route("/booking").post(booking.post_booking);
  app.route("/booking/update/:booking_id").put(booking.cancel_booking);
  app
    .route("/booking/find/:source/:destination/:date")
    .get(booking.find_bookings);
  app.route("/booking/find/:user_email").get(booking.find_booking_user);
  app.route("/booking/count_status").get(booking.count_status);
  app.route("/booking/count/airline").get(booking.booking_flight_count);
  app.route("/booking/revenue/all").get(booking.revenue);
  app.route("/booking/revenue").get(booking.booking_revenue);
  app.route("/booking/airlinerevenue").get(booking.airline_revenue);
  app.route("/booking/count").get(booking.count_all);
  app.route("/booking/count_cancelled").get(booking.count_cancelled);

  //Feedback Routes
  app.route("/feedback/all").get(feedback.list_all);
  app.route("/feedback/count").get(feedback.get_count);
  app.route("/feedback").post(feedback.post_feedback);
  app.route("/feedback/:email").get(feedback.get_feedback);
  app.route("/feedback/reply").post(feedback.send_reply);
  

  //Coupons Routes
  app.route("/coupon/add").post(coupon.add_coupon);
  app.route("/coupon/delete/:coupon_code").delete(coupon.delete_coupon);
  app.route("/coupon/all").get(coupon.list_all_coupons);

  //Nakli Routes
  app.route("/nakli").post(nakli.add_booking);
  app.route("/nakli/all").get(nakli.list_all_booking);

  //Passengers Routes
  app.route("/passenger/all").get(passenger.get_all_passenger);
  app.route("/passenger/add").post(passenger.add_passenger);

  //Recommendation Routes
  app.route("/recommendation/all").get(recommendation.all_recommendation);
  app.route("/recommendation/add").post(recommendation.add_recommendation);
  app.route("/recommendation/delete/:r_code").delete(recommendation.delete_recommendation);
};
