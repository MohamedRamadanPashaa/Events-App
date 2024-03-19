import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
