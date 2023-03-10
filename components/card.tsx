import Image from "next/image";

const Card = ({ data, key }: any) => {
  console.log(data);
  return (
    <div className="flex justify-center">
      <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <a href="#!">
          <Image
            className="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
            alt=""
            width={500}
            height={500}
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Card title
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
