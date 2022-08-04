import { Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React from "react";
import FeatureBox from "../FeatureBox";
import FeatureImgOne from "@/public/images/payment_one.svg";
import FeatureImgTwo from "@/public/images/payment_two.svg";
import FeatureImgThree from "@/public/images/payment_three.svg";

type Props = {
  isBusiness: boolean;
};

const Features = ({ isBusiness }: Props) => {
  return (
    <Container as="section" maxW="container.xl" mt={isBusiness ? [32, null, 80] : [20, null, 40]}>
      <Heading
        as="h2"
        color="textThree"
        textAlign="center"
        fontWeight="600"
        fontSize={["2rem", null, "2.25rem"]}
      >
        Payments tools designed for you
      </Heading>
      <Text textAlign="center" mt="2" color="textThree" fontSize={["1rem", "1.125rem"]}>
        Providing you with the best online payment experience
      </Text>

      <Grid templateColumns={["1fr", null, "1fr 1fr", "1fr 1fr 1fr"]} gap="6" mt="10" w="full">
        <GridItem>
          <FeatureBox
            title="User Friendly"
            sub="Highly responsive and easy to navigate."
            imgSrc={FeatureImgOne}
          />
        </GridItem>
        <GridItem>
          <FeatureBox
            title="Secure"
            sub="Your data is secure. It is continuously monitored, audited, and stored in an encrypted form."
            imgSrc={FeatureImgTwo}
          />
        </GridItem>
        <GridItem colSpan={[1, null, 2, 1]}>
          <FeatureBox
            title="Fast"
            sub="Transacting takes only a few seconds - it's convenient and safe."
            imgSrc={FeatureImgThree}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Features;
