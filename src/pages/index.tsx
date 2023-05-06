import { Timer } from "@/components/Timer";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [titleDuration, setTitleDuration] = useState("");
  const title = (titleDuration ? `${titleDuration} - ` : "") + "Microtimeboxer";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex alignItems="center" justifyContent="center" h='100vh'>
        <Timer updateTitleDuration={setTitleDuration} useWorker />
      </Flex>
    </>
  );
}
