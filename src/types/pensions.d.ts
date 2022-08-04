import { IBaseResponse } from "./login";

export interface IPensionSchedule {
  _id: string;
  pension_ref: string;
  pension_pfc_beneficiary_ref: string;
  title: string;
  firstname: string;
  lastname: string;
  rsa_pin: string;
  pfa: string;
  employee_statutory_contribution: string;
  employer_statutory_contribution: string;
  employee_voluntory_contribution: string;
  employer_voluntory_contribution: string;
  total_contribution: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRemitPensionResponse extends IBaseResponse {
  data: {
    pension_ref: string;
    schedule: IPensionSchedule[];
    issues: any[];
  };
}

export interface IConfirmPensionRemitRequest {
  pension_ref: string;
}

export interface IConfirmPensionRemitResponse extends IBaseResponse {
  data: {
    _id: string;
    initiator: {
      _id: string;
      first_name: string | null;
      last_name: string | null;
    };
    transaction_fee: string;
    status: string;
    pension_ref: string;
    amount: string;
    total_amount: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPensionItem {
  _id: string;
  initiator: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  transaction_fee: string;
  status: string;
  pension_ref: string;
  amount: string;
  total_amount: string;
  createdAt: string;
  updatedAt: string;
  payment_method?: string;
  two_fa_code?: string | null;
  approvedDate?: string;
  approver?: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  employer?: string;
  description: string;
}

export interface IGetPensionsResponse extends IBaseResponse {
  data: {
    pensions: IPensionItem[];
  };
}

export interface IPensionBeneficiary {
  _id: string;
  pension_ref: string;
  pfa_account_name: string;
  pfa_account_number: string;
  pfc_name: string;
  pfc_code: string;
  tranasaction_fee: string;
  pension_pfc_beneficiary_ref: string;
  amount: string;
  total_amount: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetPensionItemResponse extends IBaseResponse {
  data: {
    pension: {
      _id: string;
      initiator: {
        _id: string;
        first_name: string;
        last_name: string;
      };
      transaction_fee: string;
      status: string;
      pension_ref: string;
      amount: string;
      total_amount: string;
      createdAt: string;
      updatedAt: string;
    };
    beneficiaries: IPensionBeneficiary[];
  };
}

export interface ISendPensionOtpRequest {
  pension_ref: string;
  payment_method: string;
}

export interface IVerifyPensionOtpRequest {
  pension_ref: string;
  otp: string;
}

export interface IDeclinePensionRequest {
  pension_ref: string;
}
