import { IBaseResponse } from "./login";

export interface IUserWallet {
  available_balance: string;
  ledger_balance: string;
  locked_func: string;
  currency: string;
  two_fa_code: string | null;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  wallet_id: string;
  is_locked: boolean;
}

export interface IWalletTransaction {
  trans_ref: string;
  pay_ref: string;
  amount_paid: string;
  settlement_amount: string;
  fee: string;
  paid_date: string;
  status: string;
  description: string;
  currency: string;
  payment_method: string;
  reciever: string | null;
  bank_name: string | null;
  bank_code: string | null;
  account_name: string | null;
  account_number: string | null;
  // "card_details": "{\"cardType\":\"Sandbox Card Scheme\",\"last4\":\"1111\",\"expMonth\":\"09\",\"expYear\":\"22\",\"bin\":\"411111\",\"bankCode\":null,\"bankName\":null,\"reusable\":true,\"countryCode\":null,\"cardToken\":\"MNFY_C850BF5BE6DA4038A56425A801581C0C\",\"supportsTokenization\":true,\"maskedPan\":\"411111******1111\"}",
  account_details: string | null;
  customer: {
    email: string;
    name: string;
  };
  payment_type: string | null;
  _id: string;
  wallet_id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IFundWalletRequest {
  wallet_id: string;
  amount: string;
  transactionReference: string;
}

export interface IFundWalletResponse extends IBaseResponse {
  data: null;
}

export interface IWalletTransferRequest {
  receiver_email: string;
  fee: string;
  amount: string;
  total_amount: string;
  description: string;
  wallet_id: string;
}

export interface IWalletTransferResponse extends IBaseResponse {
  data: {
    reciever: {
      email: string;
      name: string;
    };
    transaction: {
      amount: number;
      fee: string;
      total_amount: string;
      trans_ref: string;
    };
  };
}

export interface IBankTransferRequest {
  fee: string;
  amount: string;
  total_amount: string;
  description: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  bank_code: string;
  wallet_id: string;
}

export interface IBankTransferResponse extends IBaseResponse {
  data: {
    reciever: {
      account_number: string;
      account_name: string;
      bank_name: string;
    };
    transaction: {
      amount: number;
      fee: string;
      total_amount: string;
      trans_ref: string;
    };
  };
}

export interface ITransferResponse extends IBaseResponse {
  data: {
    reciever: {
      account_number?: string;
      account_name?: string;
      bank_name?: string;
      email?: string;
      name?: string;
    };
    transaction: {
      amount: number;
      fee: string;
      total_amount: string;
      trans_ref: string;
    };
  };
}

export interface IVerifyTransferRequest {
  trans_ref: string;
  otp: string;
  receiverType: string;
}

export interface IBank {
  name: string;
  code: string;
  ussdTemplate: string | null;
  baseUssdCode: string | null;
  transferUssdTemplate: string | null;
}

export interface IGetAllBanksResponse extends IBaseResponse {
  data: {
    banks: IBank[];
  };
}

export interface IValidateAccountNumberRequest {
  accountNumber: string;
  bankCode: string;
}

export interface IValidateAccountNumberResponse extends IBaseResponse {
  data: {
    accountNumber: string;
    accountName: string;
    bankCode: string;
  };
}

export interface IResendOtpRequest {
  trans_ref: string;
}

export interface IGetAllTransactionsRequest {
  wallet_id: string;
}

export interface IGetAllTransactionsResponse extends IBaseResponse {
  data: {
    count: number;
    transactions: IWalletTransaction[];
  };
}
