import React, { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  createEventsFavorites,
  deleteEventsFavorites,
} from "../../../lib/api/gotoreAPI";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EventsFavoritesButton = ({ event, currentUser }) => {
  const [favorite, setFavorite] = useState(false);

  const handleEventsFavorites = useCallback(
    async (e) => {
      e.preventDefault();
      if (favorite) {
        await deleteEventsFavorites(event.id);
        setFavorite(false);
      } else {
        const data = { event_id: event.id, user_id: currentUser.id };
        await createEventsFavorites(event.id, data);
        setFavorite(true);
      }
    },
    [currentUser, event, favorite]
  );

  useEffect(() => {
    setFavorite(currentUser?.myFavoriteEventIds?.includes(event.id));
  }, [currentUser, event]);

  return (
    <IconButton
      disableRipple
      disableFocusRipple
      disabled={currentUser == null}
      sx={{ mt: -5, justifyContent: "flex-end" }}
      onClick={(e) => handleEventsFavorites(e)}
    >
      {favorite ? (
        <FavoriteIcon sx={{ color: "#f06292" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "white" }} />
      )}
      <Typography variant='body1' color='white'>
        {event?.eventsFavorites?.length}
      </Typography>
    </IconButton>
  );
};

export default EventsFavoritesButton;
