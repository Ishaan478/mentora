import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "mentora", name: "mentora",
    credentials: {
        gemini: {
            apikey: process.env.GEMINI_API_KEY,
        }
    }
 });
