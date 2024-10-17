import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../styles/create_election.css";

const CreateElectionDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        caret
        className=' btn btn-primary create-election-btn
'
      >
        Create Election And Polls
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu'>
        <DropdownItem header>Select an Option</DropdownItem>
        <DropdownItem href='/poll'>Polls</DropdownItem>
        <DropdownItem href='/create-election'>Elections</DropdownItem>
        <DropdownItem href='/create-survey'>Survey</DropdownItem>
        <DropdownItem href='/create-quiz'>Quiz</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CreateElectionDropdown;
