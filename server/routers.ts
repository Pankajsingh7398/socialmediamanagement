import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { connectMongoDB } from "./mongodb";
import { Contact } from "./models/Contact";
import { ServiceRequest } from "./models/ServiceRequest";
import { FeatureRequest } from "./models/FeatureRequest";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact Form Procedures
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        message: z.string().min(1, "Message is required"),
      }))
      .mutation(async ({ input }) => {
        try {
          await connectMongoDB();
          const contact = new Contact({
            name: input.name,
            email: input.email,
            message: input.message,
          });
          await contact.save();
          return { success: true, message: "Contact submitted successfully" };
        } catch (error) {
          console.error("Error submitting contact:", error);
          throw new Error("Failed to submit contact form");
        }
      }),
  }),

  // Service Request Procedures
  serviceRequest: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        companyName: z.string().min(1),
        serviceType: z.string().min(1),
        clientType: z.enum(['brand', 'customer']),
        projectDescription: z.string().min(1),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        additionalInfo: z.string().optional(),
        websiteType: z.string().optional(),
        appPlatform: z.string().optional(),
        marketingGoal: z.string().optional(),
        socialPlatforms: z.array(z.string()).optional(),
        targetKeywords: z.array(z.string()).optional(),
        influencerNiche: z.string().optional(),
        prObjective: z.string().optional(),
        memeStyle: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await connectMongoDB();
          const request = new ServiceRequest(input);
          await request.save();
          return { success: true, message: "Service request submitted successfully" };
        } catch (error) {
          console.error("Error submitting service request:", error);
          throw new Error("Failed to submit service request");
        }
      }),
  }),

  // Feature Request Procedures (for Brands)
  featureRequest: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        companyName: z.string().min(1),
        featureTitle: z.string().min(1),
        featureDescription: z.string().min(1),
        priority: z.enum(['low', 'medium', 'high']),
        timeline: z.string().optional(),
        budget: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await connectMongoDB();
          const request = new FeatureRequest(input);
          await request.save();
          return { success: true, message: "Feature request submitted successfully" };
        } catch (error) {
          console.error("Error submitting feature request:", error);
          throw new Error("Failed to submit feature request");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
