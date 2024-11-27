import Image from "next/image";
import Header from "./components/Header/Header";
import Users from "./components/Users/Users";

export default function Home() {
  return (
    <div>
      <Header/>
      <Users/>
    </div>
  );
}
