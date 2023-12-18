const express = require("express");
let router = express.Router();

const { postUserFeedback, fetchUserFeedbacks} = require("../../operations/feedback_operation");
const authenticatedUser = require("../../middlewares/auth_authentication");

router.get("/feedback", authenticatedUser, async (req, res)=> {
  req.session.myRequestedRoute = "/feedback";
  let feedbacks = await fetchUserFeedbacks();
  res.render('feedback/feedback', {feedbacks});
});

router.post("/feedback", async (req, res) => {

  try {
    const userEmail = req.session.userEmail;
    console.log("User Email is: "+userEmail);
    await postUserFeedback(res, req.body.name, userEmail, req.body.message);
    return;
  } catch (error) {
    console.error("Error occur while posting user feedback: ", error);
  }
})

module.exports = router;
