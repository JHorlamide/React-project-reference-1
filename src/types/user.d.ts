import { IUserNotification } from "./notifications";
import { IUserWallet } from "./wallet";

export type UserRolesType = "initiator" | "approver" | "finance";

type StringOrNull = string | null;

type StringOrNull = string | null;

export interface IUser {
  _id: string;
  id: string;
  account_type?: string;
  is_verified: boolean;
  is_locked: boolean;
  is_active: boolean;
  occupation?: StringOrNull;
  nationality?: StringOrNull;
  address: StringOrNull;
  city: StringOrNull;
  state: StringOrNull;
  postal_code: StringOrNull;
  country: StringOrNull;
  identification: StringOrNull;
  identification_number: StringOrNull;
  identification_url: StringOrNull;
  proof_of_address: StringOrNull;
  proof_of_address_url: StringOrNull;
  token: string;
  email: string;
  first_name?: StringOrNull;
  last_name?: StringOrNull;
  middle_name?: StringOrNull;
  name?: StringOrNull;
  entity_name?: StringOrNull;
  phone?: StringOrNull;
  rc_number?: StringOrNull;
  country_of_incorporation?: StringOrNull;
  business_nature?: StringOrNull;
  company?: StringOrNull;
  company_id?: StringOrNull;
  roles?: string[];
  is_sub_account?: boolean;

  notifications?: IUserNotification[];
  wallet: IUserWallet;
}
