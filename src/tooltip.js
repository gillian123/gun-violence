import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    tooltipContainer: {
        display: 'block',
        padding: '2rem',
        height: 'auto',
        width: 'auto',
        position: 'absolute',
        zIndex: 1,
        pointerEvents: 'none',
        cursor: 'crosshair',
        backgroundColor: 'black !important',
        color: 'white !important'
    },
    tooltipContent: {
        padding: '0 !important'
    },
    orangeText: {
        color: 'rgb(255, 140, 0, 100)'
    },
    redText: {
        color: 'rgb(200, 0, 40, 150)'
    }
});

export default function ToolTip(props) {
    const classes = useStyles();
    const { object, x, y } = props;
    if (object) {
        const { incident_id, date, n_killed, n_injured, notes } = object;
        const cardNote = notes === null ? "No additional info on the shooting" : "Reports on the shooting say: "+notes;

        return (
            <Card
                style={{ left: x, top: y }}
                classes={{ root: classes.tooltipContainer }}
            >
                <Typography>#{incident_id}</Typography>
                <hr />
                <CardContent classes={{ root: classes.tooltipContent }} >
                    <Typography gutterBottom>
                        <span className={classes.redText}>{n_killed}</span> killed{" "}
                        <span role="img" aria-label="skull emoji">☠️</span>
                    </Typography>
                    <Typography gutterBottom>
                        <span className={classes.orangeText}>{n_injured}</span> injured{" "}
                        <span role="img" aria-label="injured emoji">🤕</span>
                    </Typography>
                    <Typography gutterBottom>
                        Incident occurred on {date}
                    </Typography>
                    <Typography>
                        {cardNote}
                    </Typography>
                </CardContent>
            </Card>
        )
    } else {
        return null;
    }
};