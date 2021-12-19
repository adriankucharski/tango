
import React from 'react';
import { BoardType } from '..';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const BoardsListElement = ({ id, name }: BoardType) => {
    const navigate = useNavigate();
    const buttonElementHandler = (e: React.SyntheticEvent) => {
        navigate(`/tango/board?id=${id}&name=${name}`);
    };
    return (
        <Button onClick={buttonElementHandler} className="h-[80px]">
            {name}
        </Button>
    );
}

export default BoardsListElement;