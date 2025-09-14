import { CheckIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { proSubscription } from "../../server/checkout";
import { fetchTiers } from "../../server/tiers";
import useSession from "../../hooks/useSession";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

// Transform backend tier to UI format
const transformTierForUI = (tier) => ({
  ...tier,
  id: tier.slug,
  priceMonthly: `$${(tier.price / 100).toFixed(2)}`,
  featured: tier.price > 990,
  href: "#",
});

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const {
    data: tiers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-tiers"],
    queryFn: fetchTiers,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const displayTiers = useMemo(() => (tiers ? tiers.map(transformTierForUI) : []), [tiers]);
  const { user } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const checkout = async (polarRefId) => {
    setCheckoutLoading(true);
    setSubscriptionError("");
    try {
      const paymentUrl = await proSubscription(polarRefId, user);
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (error) {
      setSubscriptionError("An error occurred during subscription. Please try again, if persists, contact support.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Show loading state - wait for both tiers data and user data
  if (isLoading || !user) {
    return (
      <div className=" flex-1 overflow-y-auto px-6 py-24 sm:py-32 lg:px-8 bg-white w-full">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-100 rounded-3xl h-96"></div>
              <div className="bg-gray-100 rounded-3xl h-96"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex-1  overflow-y-auto  px-6 py-24 sm:py-32 lg:px-8 bg-white w-full">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{error.message}</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">Please refresh the page or try again later.</p>
          <div className="mt-10">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no tiers
  if (!displayTiers || displayTiers.length === 0) {
    return (
      <div className=" px-6 py-24 sm:py-32 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">No pricing plans available</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">Please check back later for our pricing plans.</p>
        </div>
      </div>
    );
  }

  console.log(user);
  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-20 lg:px-8 bg-white w-full">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl tracking-tight text-pretty text-gray-900 sm:text-5xl">Choose the right plan for you</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-600 text-lg/8 text-pretty">
          Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
        </p>
        {subscriptionError && (
          <div className="mt-4 text-center min-h-[32px]">
            <span className="text-red-600 font-bold text-lg">{subscriptionError}</span>
          </div>
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-full lg:grid-cols-2">
        {displayTiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? "relative bg-gray-900 shadow-2xl" : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3 id={tier.id} className={classNames(tier.featured ? "text-indigo-400" : "text-indigo-600", "text-base/7 font-semibold")}>
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className={classNames(tier.featured ? "text-white" : "text-gray-900", "text-5xl font-semibold tracking-tight")}>{tier.priceMonthly}</span>
              <span className={classNames(tier.featured ? "text-gray-400" : "text-gray-500", "text-base")}>/month</span>
            </p>
            <p className={classNames(tier.featured ? "text-gray-300" : "text-gray-600", "mt-6 text-base/7")}>{tier.description}</p>
            <ul role="list" className={classNames(tier.featured ? "text-gray-300" : "text-gray-600", "mt-8 space-y-3 text-sm/6 sm:mt-10")}>
              {tier.features.map((feature) => (
                <li key={feature.name} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className={classNames(tier.featured ? "text-indigo-400" : "text-indigo-600", "h-6 w-5 flex-none")} />
                  {feature.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => checkout(tier.polarRefId)}
              className={classNames(
                tier.featured
                  ? "bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                  : "text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
              disabled={checkoutLoading}
            >
              <span className="flex items-center justify-center gap-2">
                {checkoutLoading ? <Loader2 className="animate-spin" /> : null}
                Get started today
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
