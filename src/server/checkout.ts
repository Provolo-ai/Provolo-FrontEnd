import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  server: "sandbox",
  accessToken: import.meta.env.VITE_POLAR_ACCESS_TOKEN || "",
});

export const listSubscription = async () => {
  const result = await polar.products.list({
    organizationId: import.meta.env.VITE_POLAR_ORG_ID || "",
  });

  return result;
};

export const proSubscription = async (polarRefId: string, user) => {
  if (!polarRefId) throw new Error("No subscription ref ID provided, if error persists, contact support.");
  if (!user || !user.uid || !user.email) throw new Error("You must be logged in to subscribe, if error persists, contact support.");
  const checkoutData: any = {
    products: [polarRefId],
    metadata: {
      user_id: user.uid,
    },
    customerEmail: user.email,
  };
  const checkout = await polar.checkouts.create(checkoutData);
  return checkout.url;
};
