import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "./reduxHooks";

const useNewUserCheck = () => {
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const [test, setTest] = useState<boolean>(false);

  useEffect(() => {
    if (user?.account_type === "individual" && user?.company_id && !user?.phone) {
      router.push("/complete-profile/business-individual");
      setTest(true);
    }

    if (user?.account_type === "individual" && !user?.company_id && !user?.phone) {
      router.push("/complete-profile/individual");
      setTest(true);
    }

    if (user && user?.account_type !== "individual" && !user?.rc_number) {
      router.push("/complete-profile/business");
      setTest(true);
    }

    // if (
    //   user?.account_type === "individual" &&
    //   user?.company_id &&
    //   user?.company &&
    //   !user?.first_name &&
    //   !user?.last_name &&
    //   !user?.middle_name
    // ) {
    //   router.push("/complete-profile");
    //   setTest(true);
    // }
  }, [user]);

  return test;
};

export default useNewUserCheck;
