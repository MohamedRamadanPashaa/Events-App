import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const filterData = router.query.slug;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `https://nextjs-course-22e22-default-rtdb.firebaseio.com/events.json`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content="Find a lot of great event that allow you to evolve..."
      />
    </Head>
  );

  if (!data) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const year = +filterData[0];
  const month = +filterData[1];

  pageHeadData = (
    <Head>
      <title>
        {new Date(new Date(year, month - 1)).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}{" "}
        Events
      </title>
      <meta name="description" content={`All events for ${month}/${year}.`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const year = +filterData[0];
//   const month = +filterData[1];

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const events = await getFilteredEvents({
//     year,
//     month,
//   });

//   return {
//     props: { events, date: { year, month } },
//   };
// }

export default FilteredEventsPage;
