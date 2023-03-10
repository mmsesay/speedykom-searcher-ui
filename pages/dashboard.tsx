import { useState, useMemo } from "react";
import withAuth from "@/utils/withAuth";
// import Image from "next/image";

import { Card, SearchPanel } from "@/components";

const Dashboard = () => {
  const [recordsArray, setRecordsArray] = useState<any>([]);

  const childResponse = (response: any) => {
    console.log(response);
    setRecordsArray(response);
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  useMemo(() => {
    console.log(recordsArray);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* search field section */}
      <div className="h-10 flex justify-center my-10 space-x-48">
        <SearchPanel parentCallback={childResponse} />
      </div>
      {/* content section */}
      <div className="bg-blue-600 h-fit my-3 grid grid-cols-5 gap-5 p-2">
        {recordsArray.map((record: any, index: number) => (
          <Card data={record} key={index} />
        ))}
      </div>
      {/* footer */}
      {/* <div>
        <p className="text-center text-gray-500 text-xs absolute inset-x-0 bottom-0 mb-10">
          &copy;2023 Health Searcher App. All rights reserved.
        </p>
      </div> */}
    </div>
  );
};

export default withAuth(Dashboard);
