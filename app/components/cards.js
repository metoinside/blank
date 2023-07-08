import Image from "next/image";
//import shoe from "../public/photo-1606107557195-0e29a4b5b4aa.jpg"

export default function Cards() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
      <figure>
        <Image src="/shoe.jpeg" width={500} height={500} />
      </figure>
    </div>
  );
}
