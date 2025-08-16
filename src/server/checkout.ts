import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
    server:"sandbox",
    accessToken: process.env.VITE_POLAR_ACCESS_TOKEN || "",
});

export const proSubscription = async () => {
  const checkout = await polar.checkouts.create({
    products: ["503fe6a4-b148-41bb-b779-60334594794e"]
  });

  return checkout.url;
}
