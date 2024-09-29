import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import moment from "moment";

export default function EventCard({ event }) {
  const eventDate = new Date(event.event_date_time);
  const date = eventDate.toUTCString();

  function formatEventDate(eventDate) {
    const eventDateObj = { start_date: "", start_time: "", end_time: "" };
    const eventISODate = eventDate.toISOString();
    let dateISOArr = eventISODate.split(/[/:\-T]/);
    let newDateStr = `${dateISOArr[0]}-${dateISOArr[1]}-${dateISOArr[2]} ${dateISOArr[3]}:${dateISOArr[4]}`;
    let endTime = "";

    if (event.event_type === "general") {
      endTime = moment(newDateStr, "YYYY-MM-DD HH:mm")
        .add(2, "hours")
        .format("YYYY-MM-DD HH:mm");
    }

    if (event.event_type === "children's") {
      endTime = moment(newDateStr, "YYYY-MM-DD HH:mm")
        .add(1, "hours")
        .format("YYYY-MM-DD HH:mm");
    }

    if (event.event_type === "games") {
      endTime = moment(newDateStr, "YYYY-MM-DD HH:mm")
        .add({ hours: 1, minutes: 30 })
        .format("YYYY-MM-DD HH:mm");
    }

    eventDateObj.start_date = `${dateISOArr[0]}-${dateISOArr[1]}-${dateISOArr[2]}`;
    eventDateObj.start_time = `${dateISOArr[3]}:${dateISOArr[4]}`;
    eventDateObj.end_time = endTime.split(" ")[1];

    return eventDateObj;
  }

  console.log(formatEventDate(eventDate), "<-formatEventDate");
  const eventDateObj = formatEventDate(eventDate);
  console.log(eventDateObj);

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {event.event_name}
          </Typography>
          <Typography variant="body1" color="text-secondary">
            {event.event_description}
          </Typography>
          <br />
          <Typography variant="body2">{date}</Typography>
        </CardContent>
        <CardActions>
          <AddToCalendarButton
            name={event.event_name}
            startDate={eventDateObj.start_date}
            startTime={eventDateObj.start_time}
            endTime={eventDateObj.end_time}
            location="Bookstore"
            options={["Google"]}
            label="Add to Google Calendar"
            lightMode="dark"
            hideCheckmark={true}
          ></AddToCalendarButton>
        </CardActions>
      </Card>
      <br />
    </>
  );
}
