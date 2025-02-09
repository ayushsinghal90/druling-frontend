import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { CreditCard, Receipt, Shield } from "lucide-react";
import { useGetAllTransactionsQuery } from "../../store/services/transactionApi";
import { useGetAllSubscriptionsQuery } from "../../store/services/subscriptionApi";
import { Transaction, Subscription } from "../../types";
import LoadingScreen from "../../components/common/LoadingScreen";

const Billing = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<Subscription>();  
  const { data: transactionsResponse, isLoading: isTransactionLoading, refetch: refetchTransaction } = useGetAllTransactionsQuery();
  const { data: subscriptionsResponse, isLoading: isSubscriptionLoading, refetch: refetchSubscription } = useGetAllSubscriptionsQuery();
  

  useEffect(() => {
    if (transactionsResponse?.success) {
      setTransactionData(transactionsResponse.data);
    }

    if (subscriptionsResponse?.success) {
      setSubscriptionData(subscriptionsResponse.data[0]);
    }
  }, [transactionsResponse, subscriptionsResponse]);

  useEffect(() => {
    refetchTransaction();
    refetchSubscription();
  }, [location, refetchTransaction, refetchSubscription]);

  if (isTransactionLoading || isSubscriptionLoading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Billing Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and payment methods
          </p>
        </div>

        {/* Current Plan */}
        <div className="rounded-xl bg-white shadow-sm">
          {subscriptionData?.id ? (
            <div>
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Current Plan
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {subscriptionData.plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Single restaurant location
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {subscriptionData.status === "completed" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Your plan will renew on {subscriptionData?.next_billing_date}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    ₹{subscriptionData?.transaction?.total_amount}
                    <span className="text-sm font-normal text-gray-500">/year</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm font-medium text-center">
                No subscription found
              </p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Payment Method
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gray-100 p-3">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-sm text-gray-500">Expires 12/24</p>
                </div>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Billing History
                </h2>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Download All
              </button>
            </div>
          </div>
          <div className="p-6">
            {transactionData.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactionData.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        {invoice.completed_at}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {invoice.total_amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-500">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-sm font-medium text-center">No Payment history</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
