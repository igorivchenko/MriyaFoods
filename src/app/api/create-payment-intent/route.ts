import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/shared/api/supabaseClient";

interface CartItemRequest {
  productId: string;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body as { items?: CartItemRequest[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required." },
        { status: 400 },
      );
    }

    // Extract product IDs
    const productIds = items
      .map((item: CartItemRequest) => item.productId)
      .filter(Boolean);

    if (productIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid product list." },
        { status: 400 },
      );
    }

    // Fetch products from the Supabase database to avoid price tampering
    const { data: products, error: dbError } = await supabase
      .from("products")
      .select("id, price")
      .in("id", productIds);

    if (dbError || !products) {
      console.error("Database error fetching products:", dbError);
      return NextResponse.json(
        { error: "Failed to verify product details." },
        { status: 500 },
      );
    }

    // Calculate total on the server side
    let totalPrice = 0;
    for (const item of items) {
      const dbProduct = products.find((p) => p.id === item.productId);
      if (!dbProduct) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found.` },
          { status: 400 },
        );
      }
      const price = Number(dbProduct.price);
      totalPrice += price * item.quantity;
    }

    // Add fixed delivery cost if cart is not empty
    const deliveryCost = items.length > 0 ? 5.0 : 0.0;
    const grandTotal = totalPrice + deliveryCost;

    // Stripe expects amount in cents
    const amountInCents = Math.round(grandTotal * 100);

    if (amountInCents <= 0) {
      return NextResponse.json(
        { error: "Total amount must be greater than zero." },
        { status: 400 },
      );
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        integration: "stripe_payment",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    console.error("Error creating payment intent:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
