import moment from "moment";

import { SubscriptionPlan } from "../models/subscription.js";
import { User } from "../models/user.js";
export const plans = async (req, res, next) => {
  try {
    const { name, price, durationDays } = req.body;

    let user = await SubscriptionPlan.create({
      name,
      price,
      durationDays,
    });
    console.log("Hy");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const subscription = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.subscriptionPlan = plan.price;
    user.subscription = planId;
    user.subscriptionStartDate = new Date();
    user.subscriptionEndDate = moment().add(plan.durationDays, "days").toDate();
    await user.save();
    res.status(200).json({ message: "Subscription Sucessfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//   async function checkSubscriptionExpiry() {
//     try {
//       const users = await User.find({ 'subscription.endDate': { $lte: moment().add(10, 'days').toDate() } });

//       for (const user of users) {
//         // Send notification logic here
//         console.log(`Send notification to user ${user.username} that subscription is expiring soon.`);
//       }
//     } catch (error) {
//       console.error('Error in checkSubscriptionExpiry:', error);
//     }
//   }

//   setInterval(checkSubscriptionExpiry, 6000); // Run every 6 seconds

async function checkSubscriptionExpiry() {
  try {
    console.log("Checking subscription expiry...");

    const users = await User.find({
      "subscription.endDate": { $lte: moment().add(10, "days").toDate() },
    });

    for (const user of users) {
      // Send notification logic here
      console.log(
        `Send notification to user ${user.username} that subscription is expiring soon.`
      );
    }
  } catch (error) {
    console.error("Error in checkSubscriptionExpiry:", error);
  }
}

setInterval(checkSubscriptionExpiry, 15000); // Run every 6 seconds
