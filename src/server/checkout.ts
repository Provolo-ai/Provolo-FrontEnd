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
  const checkoutData: any = {
    products: [polarRefId],
  };
  if (user && user.email) {
    checkoutData.customerEmail = user.email;
  }
  const checkout = await polar.checkouts.create(checkoutData);
  return checkout.url;
};
