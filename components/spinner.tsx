import Image from "next/image";

const Spinner = () => {
  return <Image src="/loader.svg" height={100} width={100} alt={"loader"} />;
};

export default Spinner;
