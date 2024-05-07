"use client";
import dynamic from "next/dynamic";
const Maps = dynamic(() => import("../components/Maps.organism"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full">
        <Maps
          className="!w-full h-full z-10 !relative"
          lat={0}
          lng={0}
          // onDblClick={(e) => {
          //   setsearchLocation(e?.name);
          //   setpayloadEvent((prev) => ({
          //     ...prev,
          //     latitude: Number(e?.lat),
          //     longitude: Number(e?.lon),
          //     location: e?.name,
          //     locationDetail: e?.display_name
          //   }));
          // }}
        />
      </div>
    </main>
  );
}
