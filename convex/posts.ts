import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl - mutation(async(ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
    args: {
        caption: v.optional(v.string()),
        storageId: v.string(),
    },

    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).first();

        if(!currentUser) throw new Error("User not found");
    }
})