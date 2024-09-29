import {
  FormControl,
  TextField,
  Typography,
  Card,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Switch,
  Slider,
  CardActions,
  Button,
  listItemSecondaryActionClasses,
} from "@mui/material";
import { useState } from "react";
import { postEvent } from "../utils";
import { LoadingButton } from "@mui/lab";
import EventSubmitButton from "./EventSubmitButton";
import { useNavigate } from "react-router-dom";

export default function EventAdder({ setEventsList }) {
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [typeInput, setTypeInput] = useState("general");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isFreeInput, setIsFreeInput] = useState(false);
  const [maxAttendeeInput, setMaxAttendeeInput] = useState(20);
  const [checked, setChecked] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false)
  const marks = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
    { value: 30, label: "30" },
    { value: 35, label: "35" },
  ];

  function handleNameInput(input) {
    setNameInput(input);
  }

  function handleDateInput(input) {
    setDateInput(input);
  }

  function handleTimeInput(input) {
    setTimeInput(input);
  }

  function handleTypeInput(input) {
    setTypeInput(input);
  }

  function handleDescriptionInput(input) {
    setDescriptionInput(input);
  }

  function handleFreeSwitch(input) {
    setIsFreeInput(input);
    setChecked(true)
  }

  function handleAttendeeInput(event, value) {
    setMaxAttendeeInput(value);
  }

  function handleBackClick(){
    navigate("/events")
  }

  function handleSubmit() {
    if (
      !nameInput.length ||
      !dateInput.length ||
      !timeInput.length ||
      !descriptionInput
    ) {
      setInputError(true);
      setIsSubmitted(false);
    }
    setIsSubmitted(true);
    setError(null);
    const newEventObj = {
      event_name: nameInput,
      event_date_time: `${dateInput} ${timeInput}:00`,
      event_type: typeInput,
      event_description: descriptionInput,
      isFree: isFreeInput,
      max_attendees: maxAttendeeInput,
    };
    console.log(newEventObj)
    setEventsList((currentEventsList) => {
      return [newEventObj, ...currentEventsList];
    });
    postEvent(newEventObj)
      .then((result) => {
        const event = result.data;
        setSuccess(true)
        setIsSubmitted(false);
        setNameInput("");
        setDateInput("");
        setTimeInput("");
        setTypeInput("general");
        setDescriptionInput("");
        setIsFreeInput(true);
        setChecked(false);
        setMaxAttendeeInput(20);
        setEventsList((currentEventsList) => {
          const updatedEvents = [...currentEventsList];
          updatedEvents[0].event_id = event.event_id;
          return [...updatedEvents];
        });
      })
      .catch((err) => {
        setIsSubmitted(false);
        setEventsList((currentEventsList) => {
          currentEventsList.shift();
          return [...currentEventsList];
        });
        setError("Something went wrong! Please try again.");
      });
  }

  return (
    <>
      <Typography variant="h5">Add a new event</Typography>
      <Card sx={{bgcolor: 'secondary.light', color:'black'}}>
        <Box sx={{ width: 800 }} component="form">
          <Typography
            sx={{ margin: 2,  color: 'black' }}
            id="event-details"
            variant="h6"
            gutterBottom
          >
            Event Details:
          </Typography>
          <TextField
            placeholder="Event Name"
            sx={{ width: 400, color: 'black', marginBottom: 2 }}
            id="event_name"
            label="Event Name"
            variant="outlined"
            required
            onChange={(event) => {
              handleNameInput(event.target.value);
            }}
            value={nameInput}
            InputLabelProps={{ shrink: true }}
          />
          <br />
          <TextField
            sx={{ marginBottom: 2, marginRight: 2, color: 'black' }}
            type="date"
            id="event_date"
            label="Event Date"
            variant="outlined"
            required
            onChange={(event) => {
              handleDateInput(event.target.value);
            }}
            value={dateInput}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            sx={{ marginBottom: 2, color: 'black' }}
            type="time"
            id="event_time"
            label="Event Time"
            variant="outlined"
            required
            onChange={(event) => {
              handleTimeInput(event.target.value);
            }}
            value={timeInput}
            InputLabelProps={{ shrink: true }}
          />
          <br />
          <FormControl variant="standard">
            <FormLabel id="event_type_radio_label" sx={{color: "black"}}>Event Type:</FormLabel>
            <RadioGroup
              sx={{ marginBottom: 2, color: 'black' }}
              row
              aria-labelledby="event_type_radio"
              defaultValue="general"
              name="radio-buttons-group"
              onChange={(event) => {
                handleTypeInput(event.target.value);
              }}
            >
              <FormControlLabel
              sx={{color: 'black'}}
                value="general"
                control={<Radio sx={{color: 'black'}}/>}
                label="General"
              />
              <FormControlLabel
              sx={{color: 'black'}}
                value="children's"
                control={<Radio sx={{color: 'black'}}/>}
                label="Children's"
              />
              <FormControlLabel
              sx={{color: 'black'}}
                value="games"
                control={<Radio sx={{color: 'black'}}/>}
                label="Games"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            multiline
            sx={{ width: 600, marginBottom: 2, color: 'black' }}
            rows={3}
            id="event_description"
            label="Event Description"
            variant="outlined"
            required
            onChange={(event) => {
              handleDescriptionInput(event.target.value);
            }}
            value={descriptionInput}
            placeholder="Please type a short description of the event"
            InputLabelProps={{ shrink: true }}
          />
          <br />
          <FormControl variant="standard">
            <FormGroup sx={{ marginBottom: 2, color: 'black' }}>
              <FormControlLabel
                control={
                  <Switch
                  sx={{color: 'black'}}
                    checked={checked}
                    onChange={(event) => {
                      handleFreeSwitch(event.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Paid Event"
              />
            </FormGroup>
          </FormControl>
          <br />
          <Typography id="attendees-input-slider" sx={{color: 'black'}} gutterBottom>
            Number of spaces available:
          </Typography>
          <Slider
            sx={{ width: 300, marginBottom: 2, color: 'black' }}
            marks={marks}
            defaultValue={20}
            step={5}
            min={5}
            max={35}
            onChange={handleAttendeeInput}
          />
          <CardActions>
            {isSubmitted ? (
              <LoadingButton
                loading
                variant="outlined"
                loadingIndicator="Submitting..."
              ></LoadingButton>
            ) : (
              <EventSubmitButton handleSubmit={handleSubmit}/>
            )}
          </CardActions>
          {error ? (
            <Typography sx={{ fontSize: 12, lineHeight: 1 }}>
              {error}
            </Typography>
          ) : null}
          {success ? (<Typography sx={{ fontSize: 14, lineHeight: 1 }}>
              Event Added!
            </Typography>) : null}
            <br/>
            {success ? (<Button variant="contained" size="small" onClick={handleBackClick}>Back to Events</Button>) : null}
        </Box>
      </Card>
    </>
  );
}
