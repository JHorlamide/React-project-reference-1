import { Box, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";

const TermsText = () => {
  return (
    <VStack w="full" align="flex-start" spacing={4}>
      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          1. Introduction
        </Text>
        <Text color="textOne">
          This Privacy Policy (Policy) and any other document referred to sets out the basis on
          which any personal data we collect from you, or that you provide to us, will be processed
          by us. Please read the following carefully to understand our views and practices regarding
          your personal data and how we will treat it. By clicking on the “accept” button, you are
          accepting and consenting to the practices described in this Policy. If you have any
          comments on this Policy, please email them to:{" "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="mailto:info@taxaide.com.ng">info@taxaide.com.ng</a>
          </Text>
          {" or "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="mailto:contact@taxtech.com.ng">contact@taxtech.com.ng</a>
          </Text>
        </Text>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          2. Who We Are
        </Text>
        <Text color="textOne">
          Our corporate website addresses are:{" "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="https://www.taxtech.com.ng">www.taxaide.com.ng</a>
          </Text>
          {" and "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="https://www.taxtech.com.ng">www.taxtech.com.ng</a>
          </Text>
        </Text>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          3. What We May Collect
        </Text>
        <Text color="textOne">We will collect and process the following data about you:</Text>
        <UnorderedList spacing={2} mt="2">
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Information and content you provide. We collect the content, communication and other
            information you provide when you use our services, including when you fill forms or
            surveys or sign up for an account, or by corresponding with us via phone, e-mail or
            otherwise. The information you give us may include your name, address, e-mail address,
            phone number, personal description and photograph.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Information we collect about you. With regard to each of your visits to our website or
            the use of our products, we will automatically collect the following information:
            <UnorderedList>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                technical information, including the Internet Protocol (IP) address used to connect
                your computer to the internet, your login information, browser type, time zone
                setting, browser plug-in types and versions, operating system and platform;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                information about your use of our website and mobile application (including date and
                time), details of transactions you carry out, interaction information, record of any
                correspondence between us and any phone number used to call our customer/client
                service number;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                information about your visit(s) from your IP address, including the full Uniform
                Resource Locators (URL) clickstream to, through and from our website (including date
                and time); products or services you viewed or searched for; page response times,
                download errors, length of visits to certain pages, page interaction information
                (such as scrolling, clicks and mouse-overs), and methods used to browse away from
                the page.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Information we receive from other sources. This is information we receive about you if
            you use any of the other websites we operate or the other services we provide. In this
            case we will inform you at the point of data collection, if we intend to share your data
            internally and combine it with data collected on www.taxaide.com.ng, www.taxtech.com.ng
            or any of our products’ websites. We will also tell you for what purpose we will share
            and combine your data. We are working closely with third parties (including, for
            example, business partners, sub-contractors in technical, payment and delivery services,
            advertising networks, analytics providers, search information providers, credit
            reference agencies). We will notify you when we receive information about you from them
            and the purposes for which we intend to use that information.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          4. How We Use Your Personal Information
        </Text>
        <UnorderedList spacing={2}>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            User data collected helps us to personalize our products according to each user’s wish
            and preference.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            We use information held about you in the following ways, that is, to:
            <UnorderedList>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                carry out our obligations arising from any contracts entered into between you and us
                and to provide you with the information, products and services that you request from
                us;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                provide you with information about other goods and services we provide that are
                similar to those that you have already purchased or enquired about;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                tnotify you about changes to our service;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                ensure that content from our product is presented in the most effective manner for
                you and for your computer;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                administer our product and for internal operations, including troubleshooting, data
                analysis, testing, research, statistical and survey purposes;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                improve our product to ensure that content is presented in the most effective manner
                for you and for your device;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                allow you to participate in interactive features of our service, when you choose to
                do so;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                measure or understand the effectiveness of advertising we serve to you and others,
                and to deliver relevant advertising to you;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                make suggestions and recommendations to you and other users of our product about
                goods or services that may interest you or them.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            We will use information provided by you to provide you, or permit selected third parties
            to provide you, with information about goods or services we feel may interest you. If
            you are an existing customer/client, we will only contact you by electronic means
            (e-mail or SMS) with information about goods and services similar to those, which were
            the subject of a previous sale or negotiation of a sale to you. If you are a new
            customer/client, and where we permit selected third parties to use your data, we (or
            they) will contact you by electronic means only if you have consented to this. If you do
            not want us to use your data in this way, or to pass your details on to third parties
            for marketing purposes, you may unsubscribe from promotional emails via a link provided
            in each email.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          5. Security
        </Text>
        <Text color="textOne">
          We adopt robust technologies and policies to ensure the personal information we hold about
          you is suitably protected. We take steps to protect your information from unauthorized
          access and against unlawful processing, accidental loss, destruction and damage. Where you
          have chosen a password that allows you to access certain parts of the website and mobile
          application, you are responsible for keeping this password confidential. We advise you not
          to share your password with anyone.
        </Text>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          6. Disclosure of your Information
        </Text>
        <UnorderedList spacing={2}>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            We will usually not share your personal information with other third parties without
            your consent. You agree that we have the right to share your personal information with:
            <UnorderedList>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                any member of our group, which means our subsidiaries, our ultimate holding company
                and its subsidiaries, as defined under the Nigerian Companies and Allied Matters Act
                Cap C20 LFN 2004;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                our authorized employees only for the purpose of resolving issues associated with
                the use of our services;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                selected third parties including:
                <UnorderedList>
                  <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                    business partners, suppliers or sub-contractors for the performance of any
                    contract we enter into with them;
                  </ListItem>
                  <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                    advertisers and advertising networks that require the data to select and serve
                    relevant adverts to you and others. Please note that:
                    <UnorderedList>
                      <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                        we do not disclose information about identifiable individuals to our
                        advertisers, but we will provide them with aggregate information about our
                        users, for example, we may inform them that 500 men aged under 30 have
                        clicked on their advertisement on any given day;
                      </ListItem>
                      <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                        we may also use such aggregate information to help advertisers reach the
                        kind of audience they want to target;
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                    analytics and search engine providers that assist us in the improvement and
                    optimisation of our corporate and products websites.
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            We may share your data without your consent in any of the following situations:
            <UnorderedList>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                if we are under a duty to disclose or share your personal data in order to comply
                with any legal obligation, or in order to enforce or apply our terms of use and
                other agreements; or to protect our, our clients and others’ rights, property, or
                safety;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                where we are requested to provide information by authorized third parties or
                regulatory/governmental agencies investigating illegal activities;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                in the event that we sell or buy any business or assets, in which case we will
                disclose your personal data to the prospective seller or buyer of such business or
                assets;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                if we or substantially all of our assets are acquired by a third party, in which
                case personal data we hold about our clients will be one of the transferred assets;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                we may hold events including seminars and conferences which are sponsored by third
                parties or have third party speakers. Where you register for one of these events, we
                may share your details with those third parties;
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                we use third party payment processing services when you make payment through our
                website. We do not have access to any credit card or financial information processed
                by the third party.
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          7. Where We Store your Data
        </Text>
        <UnorderedList spacing="2">
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            The data that we collect from you will be transferred to, and stored at, a destination
            outside Nigeria. By submitting your personal data, you agree to this transfer, storing
            or processing. We will take all steps reasonably necessary to ensure that your data is
            treated securely and in accordance with this Policy.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            All information you provide to us is stored on our secure servers. Any payment
            transactions will be encrypted using secure sockets layer (SSL) technology. Where we
            have given you (or where you have chosen) a password, which enables you to access the
            services on our website and mobile applications, you are responsible for keeping this
            password confidential. We ask you not to share a password with anyone.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          8. Retention of Information
        </Text>
        <UnorderedList spacing="2">
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Your personal information will not be retained for longer than is necessary for the
            purposes for which it was processed.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Your information will be stored as long as you have an active client account. If your
            account is closed, information will be deleted after 3 years from the databases, unless
            such data is required to be retained for accounting, dispute resolution or fraud
            prevention purposes.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            Please note that the deletion of any of our apps from your device does not cause the
            deletion of your information.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            If any of our apps has not been used for 2 years, we will notify you and ask you to
            confirm whether your account is still active. If no reply is received, the account will
            be closed and your information will be deleted unless such information is required to be
            stored for accounting, dispute resolution or fraud prevention purposes.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          9. Your Rights
        </Text>
        <UnorderedList spacing={2}>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            The law gives you certain rights in respect of the information we hold about you. Below
            is a highlight of some of those rights. It is not a complete, exhaustive statement of
            your rights in respect of your personal data.
            <UnorderedList>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have a right to consent to this privacy policy and and to withdraw your consent
                at any time.
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have a right to a copy of the personal data we hold about you, as well as the
                information about what we do with it, who we share it with and how long we hold it
                for. We may make a reasonable charge for additional copies of that data in the case
                of unfounded and excessive requests.
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have a right to freely transfer your data received from us to any other person.
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have the right to have the information we hold about you corrected, if it is
                factually inaccurate. You may contact us for this purpose.
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                In some circumstances, you have the right to the deletion of the information that we
                hold about you.
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have a right to lodge a complaint about the handling of your personal
                information with the National Information Technology Development Agency (NITDA).
              </ListItem>
              <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
                You have the right to ask us not to process your personal data for marketing
                purposes. We will usually inform you (before collecting your data) if we intend to
                use your data for such purposes or if we intend to disclose your information to any
                third party for such purposes.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
              <a href="https://nitda.gov.ng/nit/">NITDA’s website</a>
            </Text>{" "}
            has a wealth of useful information in respect of your rights over your personal data.
          </ListItem>
          <ListItem color="textOne" fontFamily="poppins" fontSize="1rem">
            If you wish to exercise your rights, you may contact the office of our data protection
            and compliance officer at{" "}
            <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
              <a href="mailto:info@ao2lawtechnologies.com.ng">info@ao2lawtechnologies.com.ng</a>
            </Text>
            or you may write to us at:{" "}
            <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
              <a href="mailto:info@taxaide.com.ng">info@taxaide.com.ng</a>
            </Text>
            {" or "}
            <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
              <a href="mailto:contact@taxtech.com.ng">contact@taxtech.com.ng</a>
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          10. Changes to this Policy
        </Text>
        <Text color="textOne">
          Any future changes we make to this Policy will be posted on this page and, where
          appropriate, notified to you by e-mail. Please check back frequently to see any updates or
          changes to this Policy.
        </Text>
        <Text color="textOne" mt="2">
          Please note that our products may, from time to time, contain links to and from the
          websites of our partners, advertisers and affiliates. If you follow a link to any of these
          websites, please note that these websites have their own privacy policies and that we do
          not accept any responsibility or liability for these policies. Please check these policies
          before you submit any personal data to such websites.
        </Text>
      </Box>

      <Box>
        <Text color="textOne" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
          11. Contact
        </Text>
        <Text color="textOne">
          Questions, comments and requests regarding this privacy policy are welcomed and should be
          addressed to:{" "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="mailto:info@taxaide.com.ng">info@taxaide.com.ng</a>
          </Text>
          {" or "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="mailto:contact@taxtech.com.ng">contact@taxtech.com.ng</a>
          </Text>
          {" or our offices at "}
          <Text as="span" color="greenOne" _hover={{ textDecoration: "underline" }}>
            <a href="https://goo.gl/maps/77F8nRcqMtxmXVMD8">
              68 Molade Okoya-Thomas Street, Victoria Island, Lagos, Nigeria.
            </a>
          </Text>
        </Text>
      </Box>
    </VStack>
  );
};

export default TermsText;
