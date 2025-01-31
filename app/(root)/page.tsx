import BookOverview from "@/components/BookOverview";
import BookList from "@/components/ui/BookList";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <>
      <BookOverview />

      <BookList />
    </>
  );
};

export default Home;
