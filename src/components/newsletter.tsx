"use client";

import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((res) => {
        // if server handles our request successfully
        if (res.status === 200) {
          return setSuccess(true);
        }
        // if there is error
        res.json().then((data) => {
          setError(data.error);
          console.log(data);
        });
      });
    } catch (error) {
      setError("Failed to subscribe. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="form-ctn w-full mx-auto" style={{ maxWidth: 400 }}>
      <form className="newsletter-form relative" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="mr-2 rounded-lg h-12 pl-2 w-full focus:outline-none"
          style={{ color: "#313740" }}
        />
        <button
          type="submit"
          className="absolute right-2 top-0 bottom-0 hover:opacity-80 flex items-center"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            fontWeight={100}
            style={{ color: "#313740" }}
          />
        </button>
      </form>
      {error && <p className="text-rose-400 mt-2">{error}</p>}
      {success && (
        <p className="text-emerald-300 mt-2">Thank you for subscribing!</p>
      )}
    </div>
  );
};

export default Newsletter;
