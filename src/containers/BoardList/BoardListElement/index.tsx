
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { BoardType } from '..';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const BoardsListElement = ({ id, name }: BoardType) => {
    const navigate = useNavigate();
    const buttonElementHandler = (e: React.SyntheticEvent) => {
        navigate(`/tango/board?id=${id}&name=${name}`);
    };
    return (
        <Button onClick={buttonElementHandler} className="h-[80px] bg-[#97a0af]">
            {name}
        </Button>
    );
}

export default BoardsListElement;