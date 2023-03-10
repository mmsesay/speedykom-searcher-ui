import { useRouter } from "next/router";
import localForage from "localforage";
import axios from "axios";
import { Spinner } from "@/components";
import { useMemo, useState } from "react";

const SingleRecord = () => {
  const [recordsArray, setRecordsArray] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  useMemo(() => {
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
          .get(`http://127.0.0.1:5000/api/v1/records/${id}`, config)
          .then((res: any) => {
            if (res?.data?.status === 200) {
              setRecordsArray(res?.data?.data?.records);
            }
          })
          .catch((err: any) => {
            if (err?.response?.data?.msg) {
              setErrorMsg(err?.response?.data?.msg);
            }
          });
      })
      .catch((err) => {
        console.log("e: ", err);
      });
  }, [id]);

  return (
    <div className="h-fit my-3 p-2 mx-20">
      {errorMsg && <p className="text-red-500 text-xs italic">{errorMsg}</p>}
      <p
        className="cursor-pointer text-blue-500 hover:text-gray-500 my-3"
        onClick={() => router.push("/dashboard")}
      >
        Goto Dashboard
      </p>
      {recordsArray.length > 0 ? (
        recordsArray.map((record: any, recordIndex: number) => (
          <div key={recordIndex}>
            <h5 className="mb-2 text-xl font-medium leading-tight text-blue-400">
              {record.Title ? record.Title : "Title"}
            </h5>
            <p
              className="mb-4 text-base text-justify"
              dangerouslySetInnerHTML={{
                __html: record.Content,
              }}
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default SingleRecord;
