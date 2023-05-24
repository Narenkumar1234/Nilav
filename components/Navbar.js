import Image from "next/image";
import Link from "next/link";

export default function Navbar({ page, setIsLoading }) {
  function handleClick() {
    setIsLoading(true);
  }
  return (
    <div
      className={
        " sticky bg-theme shadow-xl  border-bg border-green-600 text-white px-2 flex justify-between items-center "
      }
    >
      <div className="font-bold flex items-center">
        <div className="flex items-center  justify-center">
          <Image
            src="https://i.postimg.cc/SQLP4PF6/logo-removebg-preview.png"
            alt="Watermark"
            className="border-white w-10 m-3 rounded-md"
            width={"50%"}
          />
        </div>
        <h1>Narumugai</h1>
      </div>
      {page == "1" ? (
        <Link href="/myCart" onClick={handleClick}>
          <div className="flex items-center justify-center w-12">
            <Image src="https://i.postimg.cc/y6vpbZzB/image.png" alt="" />
          </div>
        </Link>
      ) : (
        <Link href="/" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </Link>
      )}
    </div>
  );
}
