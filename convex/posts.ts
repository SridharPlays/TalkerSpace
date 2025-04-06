import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async(ctx) => {
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

        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if(!imageUrl) throw new Error("Image not Found.");

        const postId = await ctx.db.insert("posts", {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId as Id<"_storage">,
            caption: args.caption,
            likes: 0,
            comments: 0,
        })

        // Increment Post by 1
        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1
        })

        return postId;
    }
})