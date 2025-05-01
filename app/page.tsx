import Image from "next/image";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import clientPromise from "@/lib/mongodb";
import Navbar from "@/app/components/navbar"
import Layout from "./components/layout";
import MobileNavBar from "./components/mobilenavbar";

export  default async function Home() {
  const client = await clientPromise;

  const db = client.db("Alfaiate");

  const fits = await db

      .collection("Fits")

      .find({})

      .toArray();
  return (

    <>
    <Navbar title="Home"/>

    <Layout>
    
        <button>
          <HomeOutlinedIcon />
        </button>
        <p>{JSON.stringify(fits)}</p>
    
    </Layout>

    <MobileNavBar/>

    </>
  );
}
