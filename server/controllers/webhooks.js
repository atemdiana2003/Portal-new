import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk Webhooks with Database
export const clerWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                res.status(200).json({ success: true });
                break;
            }

            case 'user.updated': {
                const updatedData = {
                    email: data.email_addresses[0]?.email,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, updatedData);
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
            }

            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:'Webhooks Error' });
    }
};
