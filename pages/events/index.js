import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";

const AllEventsPage = (props) => {
  const router = useRouter();

  function findEventHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great event that allow you to evolve..."
        />
      </Head>

      <EventSearch onSearch={findEventHandler} />
      <EventList items={props.events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}

export default AllEventsPage;
