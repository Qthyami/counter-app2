import React from 'react';
import Button from "@mui/material/Button";

type ButtonPropsType = {
    text: string;
    onClickHandler: () => void;
    disabledBut: boolean;
};

const SuperButton = (props: ButtonPropsType) => {
    return (
        <div>
            <Button
                onClick={props.onClickHandler}
                variant="contained"
                disabled={props.disabledBut}
                style={{ color: "#100f0f" }}

            >
                {props.text}
            </Button>
        </div>
    );
};

export default SuperButton;