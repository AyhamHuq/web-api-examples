import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Login from "./login";
import { redirectToAuthCodeFlow } from "../authCodeWithPkce";

export const Home = () => {
  const [code, setCode] = useState();

  return (
    <>
      <Header />
      <TextInput />
      <Button
        onClick={() => {
          const clientId = "8f9515b2738142f2b3472bcb86836042";
          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          if (!code) {
            redirectToAuthCodeFlow(clientId).then(
              () => {
                setCode(code);
              },
              () => {
                console.log("rejected");
              }
            );
          }
          // setCode(code);
        }}
        text="x"
      />
      <Button
        onClick={() => {
          loadPlaylist("37i9dQZF1DX0XUsuxWHRQd", code).then((json) => {
            console.log(json);
          });
        }}
        text="Submit"
      />
      <Link to="/login">login</Link>
    </>
  );
};

const loadPlaylist = async (playlistID, code) => {
  console.log(code);
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${code}` },
    }
  );
  return await result.json();
};

const Header = () => {
  return <h1>Welcome to Song Guesser!</h1>;
};

const TextInput = () => {
  return (
    <>
      <h2>Paste a Spotify playlist link here:</h2>
      <input type="url"></input>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Home;
