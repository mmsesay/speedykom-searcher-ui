import { useState, useMemo } from "react";
import withAuth from "@/utils/withAuth";
import localForage from "localforage";
import axios from "axios";

import { Card, SearchPanel, Spinner } from "@/components";
import data from "@/data/records.json";

// This function gets called at build time
export async function getStaticProps() {
  let records: Array<any> = [];
  let errorMsg: string = "";

  localForage
    .getItem("tk")
    .then((token: any) => {
      // header configs
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // make post request
      axios
        .get(`http://127.0.0.1:5000/api/v1/records`, config)
        .then((res: any) => {
          if (res?.data?.status === 200) {
            records = res?.data?.data?.records;
          }
        })
        .catch((err: any) => {
          if (err?.response?.data?.msg) {
            errorMsg = err?.response?.data?.msg;
          }
        });
    })
    .catch((err) => {
      console.log("e: ", err);
    });

  // will receive `posts` as a prop at build time
  return {
    props: {
      records,
      errorMsg,
    },
  };
}

const Dashboard = ({ records, errorMsg }: any) => {
  const [recordsArray, setRecordsArray] = useState<any>([]);

  const childResponse = (response: any) => {
    console.log(response);
    setRecordsArray(response);
  };

  useMemo(() => {
    setRecordsArray(records);
  }, [records]);

  return (
    <div className="overflow-hidden">
      {errorMsg && (
        <p className="text-red-500 text-xs italic pt-1 text-center">
          {errorMsg}
        </p>
      )}
      {/* search field section */}
      <div className="h-10 flex justify-center my-10 space-x-48">
        <SearchPanel parentCallback={childResponse} />
      </div>
      {/* content section */}
      {recordsArray.length > 0 ? (
        <div className="h-fit my-3 grid grid-cols-5 gap-5 p-2">
          {recordsArray.map((record: any, index: number) => (
            <Card data={record} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      )}
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
