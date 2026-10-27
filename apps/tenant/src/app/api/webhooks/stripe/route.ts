import { NextResponse } from "next/server";
import { stripe, StripeService } from "@saas/core";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura do Stripe ausente" },
      { status: 400 }
    );
  }

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Processa o evento atualizando o PlanTier no banco de dados
    await StripeService.handleWebhookEvent(event);

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    console.error("❌ Erro no webhook do Stripe:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
