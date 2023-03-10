import { useRouter } from "next/router";
import localForage from "localforage";
import axios from "axios";

export async function getServerSideProps({ params }: any) {
  const recordId: string = params.id;
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
        .get(`http://127.0.0.1:5000/api/v1/records/${recordId}`, config)
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

  return {
    props: {
      records,
      errorMsg,
    },
  };
}

const SingleRecord = ({ records, errorMsg }: any) => {
  const router = useRouter();
  console.log(records);
  return (
    <div className="h-fit my-3 p-2 mx-20">
      {errorMsg && <p className="text-red-500 text-xs italic">{errorMsg}</p>}
      <p
        className="cursor-pointer text-blue-500 hover:text-gray-500"
        onClick={() => router.push("/dashboard")}
      >
        Goto Dashboard
      </p>
      {records.Sections?.section.map((record: any, recordIndex: number) => (
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
      ))}
    </div>
  );
};

export default SingleRecord;
