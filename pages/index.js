import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great event that allow you to evolve..."
        />
      </Head>

      <EventList items={props.featuredEvent} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvent = await getFeaturedEvents();

  return {
    props: { featuredEvent },
    revalidate: 1800,
  };
}

export default HomePage;
