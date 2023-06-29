/* eslint react/prop-types: 0 */
import { useState, useContext } from "react";
import { Context } from "../contexts/Context";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext";

import Card from "./Card";
import defaultSongArt from "../assets/defaultCardArt.svg";
import trash from "../assets/trash.svg";
import trashHover from "../assets/trashSelected.svg";

/**
 * Component for displaying songs in a playlist
 * @param {Object} song A song object
 * @param {Number} index The index of a song in the playlist
 * @param {func} cardClickHandler The function to be used as the onClick
 * handler for the SongCard
 * @returns A Card component displaying the details of a
 * given song
 */
function SongCard({ song, index, cardClickHandler }) {
  const [hover, setHover] = useState(false);
  const { deletePlaylistTrack, currentPlaylist } = useContext(Context)
  const { chooseSong, songIndex } = useContext(MusicPlayerStateContext)

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  /**
   * Get the art for a song
   * @param {Object} song Track object from Spotify API
   * @returns {string} The url for a song's album art
   */
  function getSongArt(song) {
    if (typeof song.songImage === "string") {
      return song.songImage;
    }
    if (song.album && song.album.images && song.album.images.length > 0) {
      return song.album.images[0].url;
    }

    return defaultSongArt;
  }

  /**
   * Returns a string of artists for the song
   * @param {Object} song Track object from Spotify API
   * @returns {string} A string of the artists for a track
   */
  function getArtists(song) {
    if (typeof song.artist === "string") {
      return song.artist;
    }
    if (song.artists && song.artists.length > 0) {
      return song.artists.map((artist) => artist.name).join(", ");
    }

    return "Unknown Artist";
  }

  /**
   * Gets a song's album
   * @param {Object} song Track object from Spotify API
   * @returns {string} The album a song is from
   */
  function getAlbum(song) {
    if (song.album) {
      return song.album.name;
    }

    return "Unknown Album";
  }

  /**
   * @param {Number} songIndex Index of the song
   * in the playlist
   * @returns {string} Class names to append to base
   * Card's classes
   */
  function getCardType(songIndex) {
    let cardType = " song-card "

    if (songIndex == index) {
      cardType += " selected-card ";
    }

    return cardType;
  }

  const songData = (
    <>
      <span className="d-flex flex-column">
        <h4>{song.name}</h4>
        <h5>{getArtists(song)}</h5>
      </span>
      <img
        src={hover ? trashHover : trash}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() =>
          deletePlaylistTrack(currentPlaylist, song.uri ? song.uri : song.id)
        }
        alt="trash icon"
        className="trashIcon"
      />
    </>
  );

  return <Card
    coverArt={{ url: getSongArt(song), title: getAlbum(song) }}
    metaData={songData}
    cardClickHandler={cardClickHandler}
    cardType={getCardType(songIndex)}
  />
  );
}

export default SongCard;
