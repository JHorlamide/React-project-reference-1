interface IMonnifyArgs {
  customerEmail: string;
  customerName: string;
  amount: number;
  ownerWalletId: string;
  linkRef: string;
  runFunc?: any;
  title?: string;
  showSuccess: () => void;
  showError: () => void;
}
interface IMonnifyRes {
  amountPaid: number;
  authorizedAmount: number;
  cardToken: string;
  message: string;
  paidOn: string;
  paymentDescription: string;
  paymentReference: string;
  paymentStatus: string;
  status: string;
  transactionReference: string;
}

export default async function paymentLinkMonnify({
  customerEmail,
  customerName,
  amount,
  ownerWalletId,
  runFunc,
  showSuccess,
  showError,
  linkRef,
  title,
}: IMonnifyArgs): Promise<IMonnifyRes | void> {
  if (window?.MonnifySDK) {
    window.MonnifySDK.initialize({
      amount,
      currency: "NGN",
      reference: "" + Math.floor(Math.random() * 1000000000 + 1),
      customerName,
      customerEmail,
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY,
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE,
      paymentDescription: title || "Payment Link",
      isTestMode: true,
      metadata: {
        name: customerName,
      },
      // paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
      paymentMethods: ["CARD"],
      onComplete: async function (response: IMonnifyRes) {
        try {
          if (
            response?.status.toLowerCase() === "success" &&
            response?.paymentStatus.toLowerCase() === "paid"
          ) {
            if (runFunc) {
              await runFunc({
                transactionReference: response.transactionReference,
                amount: `${response.authorizedAmount}`,
                link_ref: linkRef,
                walletId: ownerWalletId,
              });
              showSuccess();
            }
          } else {
            showError();
          }
        } catch (error) {
          showError();
        }
      },
    });
  } else {
    return;
  }
}
