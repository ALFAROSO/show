import { API_URL, GOOGLE_ID } from "../../constants.js";
import {
  getUserSession,
  setUserSession,
} from "../../assets/helpers/storage.js";

/**
 * Google Auth Setup
 */
window.onload = function () {
  const user = getUserSession();

  if (!!user?.id) {
    window.location.replace("/");
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_ID,
    callback: async (googleResponse) => {
      try {
        const response = await fetch(`${API_URL}/auth?provider=google`, {
          method: "POST",
          body: JSON.stringify(googleResponse),
        });

        const { data } = await response.json();

        if (data?.id) {
          setUserSession(data);
          window.location.replace("/");
        }
      } catch (error) {
        console.debug(error);
      }
    },
    use_fedcm_for_prompt: true,
  });
  google.accounts.id.renderButton(document.getElementById("google-button"), {
    theme: "outline",
    size: "large",
  });
  google.accounts.id.prompt();
};

/**
 * Login Submit
 */
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;

      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { data } = await response.json();
      if (data?.id) {
        setUserSession(data);
        window.location.replace("/");
      }
    } catch (error) {
      console.debug(error);
    }
  });
