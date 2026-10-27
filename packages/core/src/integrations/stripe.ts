import Stripe from "stripe";
import { prisma } from "../db/client";
import { PlanTier, SubscriptionStatus } from "@prisma/client";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-09-30.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});

export class StripeService {
  /**
   * Cria uma sessão de checkout para upgrade de plano
   */
  static async createCheckoutSession({
    companyId,
    ownerEmail,
    priceId,
    successUrl,
    cancelUrl,
  }: {
    companyId: string;
    ownerEmail: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: ownerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        companyId,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session;
  }

  /**
   * Cria uma sessão do Portal do Cliente para gerenciamento de cartão e cancelamento
   */
  static async createBillingPortalSession({
    stripeCustomerId,
    returnUrl,
  }: {
    stripeCustomerId: string;
    returnUrl: string;
  }) {
    return stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });
  }

  /**
   * Processador de eventos dos Webhooks do Stripe
   */
  static async handleWebhookEvent(event: Stripe.Event) {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.CheckoutSession;
        const companyId = session.metadata?.companyId;

        if (companyId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          const priceId = subscription.items.data[0]?.price.id;

          const isPro = priceId === process.env.STRIPE_PRICE_ID_PRO;

          await prisma.company.update({
            where: { id: companyId },
            data: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              planTier: isPro ? PlanTier.PRO : PlanTier.BASIC,
              subscriptionStatus: SubscriptionStatus.ACTIVE,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const company = await prisma.company.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (company) {
          const priceId = subscription.items.data[0]?.price.id;
          const isPro = priceId === process.env.STRIPE_PRICE_ID_PRO;

          let status: SubscriptionStatus = SubscriptionStatus.ACTIVE;
          if (subscription.status === "past_due") status = SubscriptionStatus.PAST_DUE;
          if (subscription.status === "canceled") status = SubscriptionStatus.CANCELED;
          if (subscription.status === "unpaid") status = SubscriptionStatus.UNPAID;

          await prisma.company.update({
            where: { id: company.id },
            data: {
              planTier: isPro ? PlanTier.PRO : PlanTier.BASIC,
              subscriptionStatus: status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.company.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            planTier: PlanTier.BASIC,
            subscriptionStatus: SubscriptionStatus.CANCELED,
          },
        });
        break;
      }
    }
  }
}
