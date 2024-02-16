"use client";
import PlottingComponent from "@/components/PlottingComponent";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Plotting</title>
        <meta name="description" content="Dendro Web Plotting dashboard page" />
      </Head>
      <section>
        <PlottingComponent />
      </section>
    </>
  );
}
