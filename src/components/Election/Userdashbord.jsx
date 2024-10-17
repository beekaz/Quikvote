import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./dashboard.css"; 

const Userdashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className='dashboard text-center'>
      <h1>Welcome to QuikVote!</h1>
      <p>Get started by creating your first election.</p>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className='btn btn-success'>
          <i className='fas fa-plus-circle'></i> New Election
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select an Election Type</DropdownItem>
          <DropdownItem href='/create-poll'>Poll</DropdownItem>
          <DropdownItem href='/create-election'>Election</DropdownItem>
          <DropdownItem href='/create-survey'>Survey</DropdownItem>
          <DropdownItem href='/create-quiz'>Quiz</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Userdashboard;
