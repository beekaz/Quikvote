import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/index";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "../../styles/poll.css";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const pollsCollection = query(
        collection(db, "polls"),
        orderBy("createdAt", "desc")
      );
      const pollSnapshot = await getDocs(pollsCollection);
      const pollList = pollSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(pollList);
    };
    fetchPolls();
  }, []);

  return (
    <div className='poll-list-container'>
      {polls.length > 0 ? (
        polls.map((poll) => (
          <div key={poll.id} className='poll-item'>
            <h3>{poll.question}</h3>
            {poll.options.map((opt, index) => (
              <p key={index} className='poll-option'>
                {opt.option} -{" "}
                <span className='vote-count'>{opt.votes} votes</span>
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No polls available.</p>
      )}
    </div>
  );
};

export default PollList;
