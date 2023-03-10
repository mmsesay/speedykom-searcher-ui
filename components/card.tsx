import Image from "next/image";
import { useRouter } from "next/router";

const Card = ({ data, key }: any) => {
  const router = useRouter();

  console.log(data);
  return (
    <div
      className="flex justify-center w-64 cursor-pointer hover:shadow-lg hover:border-2 hover:rounded-lg hover:border-blue-400"
      key={key}
      onClick={() => router.push(`records/${data.Id}`)}
    >
      <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <a href="#!">
          <Image
            className="rounded-t-lg"
            src={data.ImageUrl}
            alt={data.ImageAlt}
            width={500}
            height={500}
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {data.Title}
          </h5>
          {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
