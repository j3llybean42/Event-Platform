import { Card, CardActions, CardContent, Typography, Button } from "@mui/material"

export default function EventCard({event}){
    const eventDate = new Date(event.event_date_time)
    const date = eventDate.toUTCString()

    return(
        <>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5">{event.event_name}</Typography>
                    <Typography variant="body1" color="text-secondary">{event.event_description}</Typography>
                    <br/>
                    <Typography variant="body2">{date}</Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth={true} size="small" variant="contained">Sign Up</Button>
                </CardActions>
            </Card>
            <br/>
        </>
    )
}