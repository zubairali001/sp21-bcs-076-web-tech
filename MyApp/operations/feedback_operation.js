const feedbackModel = require("../models/feedback_model");

async function postUserFeedback(res, name, email, message) {
    console.log("Creating user...");

    let feedback = new feedbackModel();

    feedback.name = name;
    feedback.email = email;
    feedback.message = message;

    console.log("Name:"+name+"Email:"+email+"Message"+message);
    console.log('postng feedback...');
    await feedback.save();
    console.log("Feedback posted successfully.");
    res.redirect("/feedback");
}

async function fetchUserFeedbacks(){
    let feedbacks = await feedbackModel.find();
    console.log("Fetched Feedbacks: "+feedbacks);
    return feedbacks;
}

module.exports.postUserFeedback = postUserFeedback;
module.exports.fetchUserFeedbacks = fetchUserFeedbacks;
