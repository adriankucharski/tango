import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Badge, Modal, Dropdown } from "react-bootstrap";
import { ChatLeftText } from "react-bootstrap-icons";
import { Tags, Plus } from "react-bootstrap-icons";

type Props = {
  show: boolean;
  onCloseModal?: () => void
};

const TagsDropdown = ({ show, onCloseModal }: Props) => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default TagsDropdown;