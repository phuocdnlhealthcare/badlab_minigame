import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
      className="mb-8"
    />
  );
}
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Logo />
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Welcome to the Badlab Minigame
        </p>
      </main>
    </div>
  );
}
