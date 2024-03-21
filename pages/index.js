import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = (props) => {
  return (
    <div>
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
