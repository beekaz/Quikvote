import React, { useState, useEffect } from "react";

const ElectionList = ({ elections = [] }) => {
  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Manage Elections</h2>
      {elections.length === 0 ? (
        <p>No elections created yet.</p>
      ) : (
        <div className='row'>
          {elections.map((election) => (
            <div className='col-md-4 mb-4' key={election.id}>
              <div className='card'>
                <img
                  src={election.photo}
                  alt={election.fullName}
                  className='card-img-top'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{election.fullName}</h5>
                  <p className='card-text'>
                    <strong>Position:</strong> {election.position} <br />
                    <strong>Party:</strong> {election.partyAffiliation} <br />
                    <strong>Location:</strong> {election.location}
                  </p>
                  <button className='btn btn-primary me-2'>Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionList;
