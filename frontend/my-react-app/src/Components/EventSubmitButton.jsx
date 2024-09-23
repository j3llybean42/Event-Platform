import { Tooltip, Button } from "@mui/material";

export default function EventSubmitButton({handleSubmit}){
    return(
        <>
            <Tooltip title="Required fields are still empty!">
                <span>
                <Button variant="contained" onClick={handleSubmit}>
                Submit Event
              </Button>
                </span>
            </Tooltip>
        </>
    )
}